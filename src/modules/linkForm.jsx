import React from 'react';
import { Mutation } from 'react-apollo';
import $ from 'jquery';
import FormGroup from '../components/formGroup';
import Button from '../components/button';
import { CREATE_LINK, FEED_QUERY } from '../graphql';
import { imageIcon } from '../images';

export default class LinkForm extends React.Component {
  state = {
    title: '',
    description: '',
    url: '',
    file: '',
  };

  handleChange = async (e) => {
    await this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = async (e, postLink) => {
    e.preventDefault();
    try {
      await postLink();
      $('#createLink').modal('hide');
    } catch (error) {
      const errorMessage = JSON.parse(`${error.message.slice(14)}`);
      console.log(errorMessage);
    }
  };

  updateState = (store, { data: { postLink } }) => {
    const data = store.readQuery({ query: FEED_QUERY });
    data.feed.links.unshift(postLink);
    store.writeQuery({ query: FEED_QUERY, data });
  };

  uploadFile = () => {
    $('#input-linkImageInput').click();
  };

  handleImageSelect = (event) => {
    const { file } = this.state;
    URL.revokeObjectURL(file);
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  render() {
    const { title, description, url, file } = this.state;
    return (
      <Mutation mutation={CREATE_LINK} variables={this.state} update={this.updateState}>
        {postLink => (
          <form onSubmit={e => this.submitForm(e, postLink)} id="addLink">
            <div className="row">
              <div className="col-sm-4 text-center">
                <img
                  onClick={this.uploadFile}
                  src={file.length ? file : imageIcon}
                  alt="link-icon"
                />
                <br />
                <button type="button" className="btn btn-primary">
                  Upload
                </button>
              </div>
              <div className="col-sm-8">
                <FormGroup
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Enter the title of link"
                  icon="fa-text-width"
                />
                <FormGroup
                  name="url"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Enter the url of link"
                  icon="fa-link"
                  value={url}
                />
                <FormGroup
                  name="imageUrl"
                  onChange={this.handleImageSelect}
                  type="file"
                  placeholder="Upload display image"
                  icon=""
                  id="linkImageInput"
                />
                <p>Provide brief description</p>
                <div className="input-group">
                  <textarea
                    name="description"
                    onChange={this.handleChange}
                    value={description}
                    className="form-control"
                    aria-label="With textarea"
                  />
                </div>
                <Button type="submit" text="Submit" css="btn-primary createLink" />
              </div>
            </div>
          </form>
        )}
      </Mutation>
    );
  }
}
