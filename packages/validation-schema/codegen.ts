import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../../apps/backend/src/api/graphql/typeDefs.ts',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-validation-schema'],
      config: {
        strictScalars: true,
        schema: 'zod',
      },
    },
  },
}

export default config
