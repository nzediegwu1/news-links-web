import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import FormGroup from '../components/formGroup';
import Button from '../components/button';

const MUTATION = gql`
  mutation PostMutation($title: String!, $description: String!, $url: String!, $imageUrl: String!) {
    postLink(title: $title, description: $description, url: $url, imageUrl: $imageUrl) {
      id
      title
      description
      url
      imageUrl
      createdAt
    }
  }
`;

export default class LinkForm extends React.Component {
  state = {
    title: '',
    description: '',
    url: '',
    imageUrl: '',
  };

  handleChange = async (e) => {
    await this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = async (e, postLink) => {
    e.preventDefault();
    const response = await postLink();
    console.log('response>>>>>>>>>>>>>>>>>', response);
  };

  render() {
    const { title, description, url, imageUrl } = this.state;
    return (
      <Mutation mutation={MUTATION} variables={this.state}>
        {postLink => (
          <form onSubmit={e => this.submitForm(e, postLink)} id="addLink">
            <FormGroup
              name="title"
              value={title}
              onChange={this.handleChange}
              type="text"
              placeholder="Enter the title of link"
              icon=""
            />
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Desc</span>
              </div>
              <textarea
                name="description"
                onChange={this.handleChange}
                value={description}
                className="form-control"
                aria-label="With textarea"
              />
            </div>
            <FormGroup
              name="url"
              onChange={this.handleChange}
              type="text"
              placeholder="Enter the url of link"
              icon=""
              value={url}
            />
            <FormGroup
              name="imageUrl"
              onChange={this.handleChange}
              value={imageUrl}
              type="text"
              placeholder="Upload display image"
              icon=""
            />
            <Button type="submit" text="Submit" css="btn-primary createLink" />
          </form>
        )}
      </Mutation>
    );
  }
}
