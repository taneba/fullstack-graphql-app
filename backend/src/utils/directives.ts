import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { GraphQLSchema } from 'graphql'
import { SchemaDirectiveVisitor } from 'graphql-tools'

MapperKind.SCALAR_TYPE

export function isOwnerDirectiveTransformer(schema, directiveName) {
  return mapSchema(schema, {
    // Executes once for each object field definition in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const ownerDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0]
      if (ownerDirective) {
        fieldConfig.deprecationReason = ownerDirective['reason']
        return fieldConfig
      }
    },

    // Executes once for each enum value definition in the schema
    // [MapperKind.ENUM_VALUE]: (enumValueConfig) => {
    //   const ownerDirective = getDirective(schema, enumValueConfig, directiveName)?.[0];
    //   if (ownerDirective) {
    //     enumValueConfig.deprecationReason = ownerDirective['reason'];
    //     return enumValueConfig;
    //   }
    // }
  })
}
