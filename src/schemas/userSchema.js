import { string, object } from 'yup';

const baseSchema = {
  email: string()
    .email()
    .required(),
  password: string()
    .trim()
    .min(6)
    .required(),
};
const schemaCollection = {
  LOGIN: baseSchema,
  'SIGN UP': {
    name: string()
      .trim()
      .min(2)
      .max(30)
      .required(),
    ...baseSchema,
  },
};
export default (context) => {
  const schema = schemaCollection[context];
  return object().shape(schema);
};
