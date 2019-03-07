/* eslint-disable jsx-a11y/anchor-is-valid */
import $ from 'jquery';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import toastr from 'toastr';
import axios from 'axios';
import { Button, Modal, ModalButton } from '../components';
import { LinkSchema } from '../schemas';
import LinkForm from './linkForm';
import { FEED_QUERY } from '../graphql';
import { handleErrors, linkImageData, navItems, navOptions } from '../utils';

const defaultState = {
  id: '',
  title: '',
  spinner: 'd-none',
  description: '',
  url: '',
  image: '',
  imageUrl: '',
  edit: false,
  file: '',
  disable: false,
};
export default class LinksPage extends Component {
  state = defaultState;

  mutationType = {
    true: 'updated',
    false: 'created',
  };

  componentWillUnmount() {
    $('#createLink').modal('hide');
  }

  filePath = input => (this.imageUrl = input);

  handleImageSelect = (event) => {
    const { image } = this.state;
    URL.revokeObjectURL(image);
    this.setState({
      image: event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : '',
      file: event.target.files[0],
    });
  };

  submitForm = async (e, postLink) => {
    e.preventDefault();
    const { edit } = this.state;
    try {
      await this.validateInput();
      await this.uploadToCloudinary();
      await postLink();
      $('#createLink').modal('hide');
      toastr.success(`News-link successfully ${this.mutationType[edit]}`);
      this.setState({ spinner: 'd-none', disable: false });
    } catch (error) {
      handleErrors(error);
      this.setState({ spinner: 'd-none', disable: false });
    }
  };

  validateInput = () => {
    const { title, description, url, file, edit } = this.state;
    const { size, type } = file;
    const schema = LinkSchema;
    return schema.validate(
      { edit, title, description, url, file: type, fileSize: size },
      { abortEarly: false },
    );
  };

  uploadToCloudinary = async () => {
    const { file } = this.state;
    if (file) {
      const imageData = new FormData();
      const publicId = `${Date.now()}-${file.name}`;
      const imageFields = linkImageData(file, publicId);
      for (const item in imageFields) {
        imageData.append(item, imageFields[item]);
      }
      this.setState({ spinner: null, disable: true });
      const { data } = await axios.post(process.env.REACT_APP_UPLOAD_URL, imageData);
      this.setState({ imageUrl: data.secure_url });
      return toastr.success('Successfully uploaded image');
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  ManageLink = props => (
    <React.Fragment>
      <ModalButton
        css="btn link-url"
        icon="fa fa-edit"
        target="#createLink"
        click={() => this.editLink(props)}
      />
      <button type="button" className="btn delete-link">
        <i className="fa fa-trash" />
      </button>
    </React.Fragment>
  );

  card = ({ id, imageUrl, title, description, url }) => (
    <div key={id} className="card masonry-brick">
      <div className="card-body">
        <div className="card-content">
          <img className="card-img-top" src={imageUrl} alt="news_link" />
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
      <div className="card-footer">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn link-url btn-sm"
          role="button"
        >
          Learn More
        </a>
        {this.ManageLink({ id, imageUrl, title, description, url, image: imageUrl })}
      </div>
    </div>
  );

  editLink = (state) => {
    this.setState({ edit: true, file: '', ...state });
    this.imageUrl.value = '';
  };

  navItem = text => (
    <li key={`${Math.random()}`} className="nav-item">
      <Button text={text} css="btn-outline-secondary btn-secondary" />
    </li>
  );

  link = (text, css) => (
    <a key={Math.random() / 4.67} className={css} href="#">
      {text}
    </a>
  );

  logout = () => {
    this.props.history.push('/');
    toastr.success('Thanks for using News-Link');
  };

  navBar = () => (
    <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
      {this.link('NewsLink', 'navbar-brand')}
      <ModalButton
        toggle="collapse"
        css="navbar-toggler"
        icon="navbar-toggler-icon"
        target="#navbarToggler"
      />
      <div className="collapse navbar-collapse" id="navbarToggler">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          {navItems.map(item => this.navItem(item))}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" />
          <Button text="Search" css="btn-outline-secondary my-2 my-sm-0" />
        </form>
        <Button text=" Logout" action={this.logout} css="btn-outline-secondary fa fa-power-off" />
      </div>
    </nav>
  );

  nav = () => (
    <nav className="nav nav-tabs fixed-top justify-content-center">
      {navOptions.map(option => this.link(option.text, option.class))}
    </nav>
  );

  addLink = () => {
    this.setState(defaultState);
    this.imageUrl.value = '';
  };

  render() {
    return (
      <React.Fragment>
        {this.navBar()}
        {this.nav()}
        <Query query={FEED_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div className="error">loading...</div>;
            if (error) {
              return (
                <div className="error">
                  <i className="fa fa-warning" />
                  <br />
                  <p>{error.message}</p>
                </div>
              );
            }
            const linksToRender = data.feed.links;
            return (
              <React.Fragment>
                <div className="masonry">{linksToRender.map(link => this.card(link))}</div>
                <ModalButton
                  css="float"
                  icon="fa fa-plus"
                  target="#createLink"
                  click={this.addLink}
                />
                <Modal
                  id="createLink"
                  title="Create News Link"
                  render={(
                    <LinkForm
                      state={this.state}
                      handleChange={this.handleChange}
                      handleImageSelect={this.handleImageSelect}
                      submitForm={this.submitForm}
                      filePath={this.filePath}
                    />
)}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
// Add a black-background footer
