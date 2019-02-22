import React from 'react';
import { Mutation } from 'react-apollo';
import $ from 'jquery';
import toastr from 'toastr';
import axios from 'axios';
import { string, object } from 'yup';
import FormGroup from '../components/formGroup';
import { CREATE_LINK, FEED_QUERY } from '../graphql';
import { imageIcon } from '../images';

const formData = (title, url, id) => [
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
    id,
    key: 'randomImageUrl',
  },
];
const folder = 'news-link/dev/news';
const imageFormData = (file, publicId) => ({
  file,
  tags: 'news-links',
  upload_preset: process.env.REACT_APP_UPLOAD_PRESET,
  api_key: process.env.REACT_APP_API_KEY,
  folder,
  public_id: publicId,
});

const uploadErrors = {
  400: 'Invalid image file format',
  401: 'Unauthorized transaction',
};

export default class LinkForm extends React.Component {
  state = {
    title: '',
    description: '',
    url: '',
    file: '',
    image: '',
    hide: 'd-none',
    imageUrl: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateInput = async () => {
    const { title, description, url } = this.state;
    const schema = object().shape({
      title: string()
        .min(4)
        .max(100),
      description: string()
        .min(10)
        .max(250)
        .required(),
      url: string().url(),
    });
    await schema.validate({ title, description, url }, { abortEarly: false }).catch((error) => {
      error.errors.forEach((errorMessage) => {
        toastr.error(errorMessage);
      });
      throw new Error(error.message);
    });
  };

  submitForm = async (e, postLink) => {
    e.preventDefault();
    try {
      await this.validateInput();
      await this.uploadToCloudinary();
      await postLink();
      $('#createLink').modal('hide');
      toastr.success('Successfully created');
    } catch (error) {
      // console.log('error>>>>>>>>>', error.graphQLErrors[0].data);
      toastr.error(error.code);
    }
  };

  updateState = (store, { data: { postLink } }) => {
    const data = store.readQuery({ query: FEED_QUERY });
    data.feed.links.unshift(postLink);
    store.writeQuery({ query: FEED_QUERY, data });
  };

  uploadToCloudinary = async () => {
    const { file } = this.state;
    if (!file) {
      toastr.error('No image selected', 'An error occured');
    } else {
      const imageData = new FormData();
      const publicId = `${Date.now()}-${file.name}`;
      const imageFields = imageFormData(file, publicId);
      for (const item in imageFields) {
        imageData.append(item, imageFields[item]);
      }
      this.setState({ hide: null });
      try {
        const { data } = await axios.post(process.env.REACT_APP_UPLOAD_URL, imageData);
        this.setState({ imageUrl: data.secure_url, hide: 'd-none' });
        toastr.success('Successfully uploaded image');
      } catch (error) {
        const status = error.response && error.response.status;
        toastr.error(uploadErrors[status] || error.message, 'An error occured');
        this.setState({ hide: 'd-none' });
      }
    }
  };

  handleImageSelect = (event) => {
    const { image } = this.state;
    URL.revokeObjectURL(image);
    this.setState({
      image: event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : '',
      file: event.target.files[0],
    });
  };

  render() {
    const { title, description, url, imageUrl, image, hide } = this.state;
    const data = { title, description, url, imageUrl };
    return (
      <Mutation mutation={CREATE_LINK} errorPolicy="all" variables={data} update={this.updateState}>
        {postLink => (
          <form onSubmit={e => this.submitForm(e, postLink)} id="addLink">
            <div className="row">
              <div className="col-sm-4 text-center">
                <img className="link-dp" src={image.length ? image : imageIcon} alt="link-icon" />
              </div>
              <div className="col-sm-8">
                {formData(title, url, 'linkImageInput').map(input => (
                  <React.Fragment key={input.key}>
                    {input.text}
                    <FormGroup
                      name={input.name}
                      required={input.required}
                      value={input.value}
                      onChange={input.type === 'file' ? this.handleImageSelect : this.handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      icon={input.icon}
                      id={input.id}
                    />
                  </React.Fragment>
                ))}
                <p className="description">Provide brief description</p>
                <div className="input-group">
                  <textarea
                    name="description"
                    onChange={this.handleChange}
                    value={description}
                    className="form-control"
                    aria-label="With textarea"
                  />
                </div>
                <button type="submit" className="btn btn-primary createLink">
                  <i className={`fa fa-spinner fa-pulse ${hide}`} />
                  &nbsp; Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </Mutation>
    );
  }
}
