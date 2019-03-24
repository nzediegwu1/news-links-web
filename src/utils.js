import toastr from 'toastr';

export const linkFormInputs = (title, url, ref) => [
  {
    name: 'title',
    type: 'text',
    placeholder: 'Enter the title of link',
    icon: 'fa-text-width',
    value: title,
    key: 'randomtitle',
  },
  {
    name: 'url',
    type: 'text',
    placeholder: 'Enter the url of link',
    icon: 'fa-link',
    value: url,
    key: 'randomUrl',
  },
  {
    text: 'Display pic',
    name: 'imageUrl',
    type: 'file',
    ref,
    placeholder: 'Enter the url of link',
    icon: 'fa-camera',
    id: 'linkImageInput',
    key: 'randomImageUrl',
  },
];
export const userFormInputs = (email, password, extra) => [
  ...extra,
  {
    value: email,
    placeholder: 'Email',
    type: 'email',
    icon: 'fa fa-envelope',
    name: 'email',
  },
  {
    value: password,
    type: 'password',
    placeholder: 'Password',
    icon: 'fa-lock',
    name: 'password',
  },
];

export const userFormType = {
  login: {
    action: 'LOGIN',
    linkText: 'SIGN UP',
    text: "Don't have an account? ",
    url: '/signup',
  },
  signup: {
    action: 'SIGN UP',
    linkText: 'LOGIN',
    text: 'Already have an account? ',
    url: '/',
  },
};

export const linkImageData = (file, publicId) => ({
  file,
  tags: 'news-links',
  upload_preset: process.env.REACT_APP_UPLOAD_PRESET,
  api_key: process.env.REACT_APP_API_KEY,
  folder: 'news-link/dev/news',
  public_id: publicId,
});

const unauthoried = 'Unauthorized, please login!';
const errorMessages = {
  'invalid signature': unauthoried,
  'GraphQL error: invalid signature': unauthoried,
};

export const errorObject = ({ errors, graphQLErrors, message: errMessage }) => ({
  errors: () => errors.forEach((errorMessage) => {
    toastr.error(errorMessage);
  }),
  response: () => toastr.error(errMessage),
  graphQLErrors: () => {
    const { data, message } = graphQLErrors[0];
    if (data) return Object.values(data).forEach(instance => toastr.error(instance.message));
    return toastr.error(errorMessages[message] || message);
  },
});

export function handleErrors(error) {
  const errors = errorObject(error);
  for (const item in errors) {
    if (item in error) errors[item]();
  }
}

export const navItems = ['Users', 'Links', 'Picks']; // add icons for each item

export const navOptions = [
  { class: 'nav-item nav-link active', text: 'Popular' },
  { class: 'nav-item nav-link', text: 'Latest' },
  { class: 'nav-item nav-link', text: 'Oldest' },
];
