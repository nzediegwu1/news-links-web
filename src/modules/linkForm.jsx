import React from 'react';
import { Mutation } from 'react-apollo';
import $ from 'jquery';
import toastr from 'toastr';
import axios from 'axios';
import FormGroup from '../components/formGroup';
import { CREATE_LINK, FEED_QUERY } from '../graphql';
import { imageIcon } from '../images';
import LinkSchema from '../schemas/linkSchema';
import { linkFormInputs, linkImageData, errorObject } from '../utils';

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

  componentWillUnmount() {
    $('#createLink').modal('hide');
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateInput = () => {
    const { title, description, url, file } = this.state;
    const { size, type } = file;
    const schema = LinkSchema;
    return schema.validate(
      { title, description, url, file: type, fileSize: size },
      { abortEarly: false },
    );
  };

  submitForm = async (e, postLink) => {
    e.preventDefault();
    try {
      await this.validateInput();
      await this.uploadToCloudinary();
      await postLink();
      $('#createLink').modal('hide');
      toastr.success('Successfully created');
      this.setState({ hide: 'd-none' });
    } catch (error) {
      const errors = errorObject(error);
      for (const item in errors) {
        if (item in error) errors[item]();
      }
      this.setState({ hide: 'd-none' });
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
      return toastr.error('No image selected', 'An error occured');
    }
    const imageData = new FormData();
    const publicId = `${Date.now()}-${file.name}`;
    const imageFields = linkImageData(file, publicId);
    for (const item in imageFields) {
      imageData.append(item, imageFields[item]);
    }
    this.setState({ hide: null });
    const { data } = await axios.post(process.env.REACT_APP_UPLOAD_URL, imageData);
    this.setState({ imageUrl: data.secure_url });
    return toastr.success('Successfully uploaded image');
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
                {linkFormInputs(title, url).map(input => (
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
