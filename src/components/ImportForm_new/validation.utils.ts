import * as yup from 'yup';
import { ImportFormValues } from './type';

const gitUrlRegex =
  /^((((ssh|git|https?:?):\/\/:?)(([^\s@]+@|[^@]:?)[-\w.]+(:\d\d+:?)?(\/[-\w.~/?[\]!$&'()*+,;=:@%]*:?)?:?))|([^\s@]+@[-\w.]+:[-\w.~/?[\]!$&'()*+,;=:@%]*?:?))$/;

const resourceNameRegex = /^[a-z]([-a-z0-9]*[a-z0-9])?$/;
const RESOURCE_NAME_REGEX_MSG =
  'Must start with a letter and end with a letter or number. Valid characters include lowercase letters from a to z, numbers from 0 to 9, and hyphens ( - ).';

const MAX_RESOURCE_NAME_LENGTH = 63;
const RESOURCE_NAME_LENGTH_ERROR_MSG = `Must be no more than ${MAX_RESOURCE_NAME_LENGTH} characters.`;

const componentSchema = yup.object({
  source: yup.object({
    git: yup.object({
      url: yup
        .string()
        .trim()
        .max(2000, 'Please enter a URL that is less than 2000 characters.')
        .matches(gitUrlRegex, "That repository URL isn't quite right. Try again.")
        .required('Required'),
      revision: yup.string(),
      context: yup.string(),
    }),
  }),
  componentName: yup
    .string()
    .matches(resourceNameRegex, RESOURCE_NAME_REGEX_MSG)
    .max(MAX_RESOURCE_NAME_LENGTH, RESOURCE_NAME_LENGTH_ERROR_MSG)
    .required('Required'),
  pipeline: yup.string().required('Required'),
});

export const formValidationSchema = yup.mixed().test(
  (values: ImportFormValues) =>
    yup
      .object({
        application: yup
          .string()
          .matches(resourceNameRegex, RESOURCE_NAME_REGEX_MSG)
          .max(MAX_RESOURCE_NAME_LENGTH, RESOURCE_NAME_LENGTH_ERROR_MSG)
          .required('Required'),
      })
      .concat(values.showComponent ? componentSchema : undefined)
      .validate(values, { abortEarly: false }) as any,
);