import React from 'react';
import { Mutation } from 'react-apollo';
import { FormGroup, Button } from '../components';
import { CREATE_LINK, FEED_QUERY, UPDATE_LINK } from '../graphql';
import { imageIcon } from '../images';
import { linkFormInputs } from '../utils';

const type = {
  true: UPDATE_LINK,
  false: CREATE_LINK,
};

export default class LinkForm extends React.Component {
  updateState = (store, { data: { postLink, updateLink } }) => {
    const { state } = this.props;
    const data = store.readQuery({ query: FEED_QUERY });
    if (postLink) data.feed.links.unshift(postLink);
    if (updateLink) {
      const linkIndex = data.feed.links.findIndex(link => link.id === state.id);
      data.feed.links.splice(linkIndex, 1, updateLink);
    }
    store.writeQuery({ query: FEED_QUERY, data });
  };

  render() {
    const { state, filePath, handleImageSelect, handleChange, submitForm } = this.props;
    const { id, image, spinner, edit, disable, file, imageUrl, imagePublicId, ...linkData } = state;
    let data = edit ? { id, ...linkData } : { imageUrl, imagePublicId, ...linkData };
    if (edit) data = file === '' ? data : { imageUrl, imagePublicId, ...data };
    return (
      <Mutation mutation={type[edit]} errorPolicy="all" variables={data} update={this.updateState}>
        {mutationAction => (
          <form onSubmit={e => submitForm(e, mutationAction)}>
            <div className="row">
              <div className="col-sm-4 text-center">
                <img className="link-dp" src={image.length ? image : imageIcon} alt="link-icon" />
              </div>
              <div className="col-sm-8">
                {linkFormInputs(linkData.title, linkData.url, filePath).map(input => (
                  <React.Fragment key={input.key}>
                    {input.text}
                    <FormGroup
                      name={input.name}
                      required={edit && input.type === 'file' ? null : 'required'}
                      value={input.value}
                      file={input.ref}
                      onChange={input.type === 'file' ? handleImageSelect : handleChange}
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
                    onChange={handleChange}
                    className="form-control"
                    aria-label="With textarea"
                    value={linkData.description}
                  />
                </div>
                <Button
                  text="Submit"
                  type="submit"
                  css="btn-primary createLink"
                  spinner={spinner}
                  disable={disable}
                />
              </div>
            </div>
          </form>
        )}
      </Mutation>
    );
  }
}
