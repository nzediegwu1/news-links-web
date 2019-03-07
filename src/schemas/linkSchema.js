import { string, object, mixed, boolean, number } from 'yup';

export default object().shape({
  edit: boolean().required(),
  title: string()
    .trim()
    .min(4)
    .max(100)
    .required(),
  description: string()
    .trim()
    .min(10)
    .max(250)
    .required(),
  url: string()
    .url()
    .required(),
  file: mixed().oneOf(
    ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'],
    'File must be an image file',
  ),
  fileSize: number().max(600000, 'File size should be less than 600kb'),
});
