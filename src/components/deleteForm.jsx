import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { DELETE_LINK, FEED_QUERY } from '../graphql';
import { Button } from '.';

export default class DeleteForm extends Component {
  updateState = (store, { data: { deleteLink } }) => {
    const { feed } = store.readQuery({ query: FEED_QUERY });
    store.writeQuery({
      query: FEED_QUERY,
      data: {
        feed: {
          ...feed,
          links: feed.links.filter(item => item.id !== deleteLink.id),
        },
      },
    });
  };

  render() {
    const { id, deleteAction } = this.props;
    return (
      <div className="delete-form">
        <i className="fa fa-exclamation-circle" />
        <h3>Are you sure?</h3>
        <p>You won't be able to revert this!</p>
        <Mutation
          mutation={DELETE_LINK}
          errorPolicy="all"
          variables={{ id }}
          update={this.updateState}
        >
          {deleteLink => (
            <Button
              action={() => deleteAction(deleteLink)}
              text="Delete"
              css="btn-primary fa fa-trash createLink"
            />
          )}
        </Mutation>
      </div>
    );
  }
}
