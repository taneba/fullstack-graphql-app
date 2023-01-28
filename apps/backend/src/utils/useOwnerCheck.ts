import { Plugin } from '@envelop/core'
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { User } from '@prisma/client'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'

import { GqlError } from '~/common/error'
import { GraphqlServerContext } from '~/context'

const schemaCache = new WeakMap<GraphQLSchema, GraphQLSchema>()

export function useOwnerCheck(
  options?:
    | {
        userContextField?: 'currentUser' | string
      }
    | undefined
): Plugin {
  const userContextField = options?.userContextField || 'currentUser'
  return {
    onSchemaChange(ctx) {
      let schema = schemaCache.get(ctx.schema)
      if (!schema) {
        schema = applyOwnerCheckDirective(ctx.schema, userContextField)
        schemaCache.set(ctx.schema, schema)
      }
      ctx.replaceSchema(schema!)
    },
  }
}

const typeDirectiveArgumentMaps: Record<string, any> = {}

function applyOwnerCheckDirective(
  schema: GraphQLSchema,
  userContextField: string
): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      const ownerDirective = getDirective(schema, type, 'isOwner')?.[0]
      if (ownerDirective) {
        typeDirectiveArgumentMaps[type.name] = ownerDirective
      }
      return undefined
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, fieldName, typeName) => {
      const ownerDirective =
        getDirective(schema, fieldConfig, 'isOwner')?.[0] ??
        typeDirectiveArgumentMaps[typeName]
      if (ownerDirective && fieldConfig) {
        return {
          ...fieldConfig,
          async resolve(source, args, context, info) {
            const { resolve = defaultFieldResolver } = fieldConfig
            const result = await resolve(source, args, context, info)

            const currentUser = (context as GraphqlServerContext)[
              userContextField
            ] as User
            const ownerField: string | undefined = ownerDirective.ownerField
            if (!ownerField) {
              console.log('ownerField is not placed')
              throw new GqlError('something went wrong')
            }
            const isOwner =
              String(source[ownerField]) === String(currentUser.id)
            if (!isOwner) {
              throw new GqlError(
                'request not authorized' + `, operation: ${info.fieldName}`,
                {
                  code: 'NOT_AUTHORIZED',
                }
              )
            }

            return result
          },
        }
      }

      return fieldConfig
    },
  })
}
