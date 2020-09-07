import { lambda, Format } from '@node-lambdas/core';
import Ajv from 'ajv';

const configutation = {
  version: 2,
  actions: {
    schemaAndData: {
      default: true,
      input: Format.Json,
      output: Format.Json,
      handler: (input, output) => {
        const validator = new Ajv({ allErrors: true, schemaId: 'auto' });
        const { schema, data } = input.body;

        validator.validate(schema, data);
        output.send(validator.errors);
      },
    },
  },
};

lambda(configutation);
