import { DefaultContext, Plugin } from '@envelop/core'
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import {
  defaultFieldResolver,
  GraphQLResolveInfo,
  GraphQLSchema,
} from 'graphql'

import { GqlError } from '~/common/error'

const schemaCache = new WeakMap<GraphQLSchema, GraphQLSchema>()

function defaultErrorHandler(info: GraphQLResolveInfo) {
  throw new GqlError(
    'request not authorized' + `, operation: ${info.fieldName}`,
    {
      code: 'NOT_AUTHORIZED',
    }
  )
}

export function useAuthHelper(
  options?:
    | {
        userContextField?: 'currentUser' | string
        userIdField?: 'id' | string
        onError?: () => void
      }
    | undefined
): Plugin {
  const userContextField = options?.userContextField || 'currentUser'
  const userIdField = options?.userIdField || 'id'
  const onError = options?.onError || defaultErrorHandler
  return {
    onSchemaChange(ctx) {
      let schema = schemaCache.get(ctx.schema)
      if (!schema) {
        schema = applyOwnerCheckDirective(
          ctx.schema,
          userContextField,
          userIdField,
          onError
        )
        schemaCache.set(ctx.schema, schema)
      }
      ctx.replaceSchema(schema!)
    },
  }
}

const typeDirectiveArgumentMaps: Record<string, any> = {}

function applyOwnerCheckDirective(
  schema: GraphQLSchema,
  userContextField: string,
  userIdField: string,
  onError: (info: GraphQLResolveInfo) => void
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

            const currentUser = (context as DefaultContext)[
              userContextField
            ] as Record<string, unknown>
            const ownerField: string | undefined = ownerDirective.ownerField
            if (!ownerField) {
              console.log('ownerField is not placed')
              throw new GqlError('something went wrong')
            }
            const isOwner =
              String(source[ownerField]) === String(currentUser[userIdField])
            if (!isOwner) {
              onError(info)
            }

            return result
          },
        }
      }

      return fieldConfig
    },
  })
}
