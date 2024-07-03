import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8001/graphql",
  documents: "src/lib/graphql_temp/**/*.graphql",
  generates: {
    "src/lib/graphql/typescript_gen/generated.tsx": {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
    
    }
  }
};

export default config;