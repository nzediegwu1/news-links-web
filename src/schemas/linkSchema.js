import { string, object, mixed, number } from 'yup';

export default object().shape({
  title: string()
    .min(4)
    .max(100),
  description: string()
    .min(10)
    .max(250)
    .required(),
  url: string().url(),
  file: mixed().oneOf(
    ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'],
    'File must be an image file',
  ),
  fileSize: number().max(600000, 'File size should be less than 600kb'),
});
