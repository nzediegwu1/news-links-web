import toastr from 'toastr';

export const linkFormInputs = (title, url) => [
  {
    name: 'title',
    type: 'text',
    placeholder: 'Enter the title of link',
    icon: 'fa-text-width',
    required: 'required',
    value: title,
    key: 'randomtitle',
  },
  {
    name: 'url',
    type: 'text',
    placeholder: 'Enter the url of link',
    icon: 'fa-link',
    required: 'required',
    value: url,
    key: 'randomUrl',
  },
  {
    text: 'Display pic',
    name: 'imageUrl',
    type: 'file',
    placeholder: 'Enter the url of link',
    icon: 'fa-camera',
    required: 'required',
    id: 'linkImageInput',
    key: 'randomImageUrl',
  },
];

export const linkImageData = (file, publicId) => ({
  file,
  tags: 'news-links',
  upload_preset: process.env.REACT_APP_UPLOAD_PRESET,
  api_key: process.env.REACT_APP_API_KEY,
  folder: 'news-link/dev/news',
  public_id: publicId,
});

export const errorObject = ({ errors, graphQLErrors }) => ({
  errors: () => errors.forEach((errorMessage) => {
    toastr.error(errorMessage);
  }),
  response: () => toastr.error('Invalid image file'),
  graphQLErrors: () => Object.values(graphQLErrors[0].data).forEach((instance) => {
    toastr.error(instance.message);
  }),
});
