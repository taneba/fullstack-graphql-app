// I don't use this module but keep this for reference

import { EnvelopError } from '@envelop/core'
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema, Kind } from 'graphql'

import { GraphqlServerContext } from '~/context'

export function isOwnerDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const ownerDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0]

      if (ownerDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (
          source: any,
          args: any,
          context: GraphqlServerContext,
          info: any
        ) {
          const result = await resolve(source, args, context, info)
          const parentType = info.path.typename // ex. User
          const isQuery = parentType === 'Query'
          const targetResourceId: string | null = isQuery ? args.id : source.id

          const res = await context.prisma.todo.findFirst({
            where: {
              id: Number(targetResourceId),
              authorId: context.currentUser!.id,
            },
          })

          if (res) {
            return result
          } else {
            throw new EnvelopError('who the f are you eh')
          }
        }
        return fieldConfig
      } else {
        return fieldConfig
      }
    },
  })
}
