/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import toastr from 'toastr';
import Button from '../components/button';
import CreateLinkModal from '../components/modal';
import LinkForm from './linkForm';
import { FEED_QUERY } from '../graphql';

const navItems = ['Users', 'Links', 'Picks']; // add icons for each item
const navOptions = [
  { class: 'nav-item nav-link active', text: 'Popular' },
  { class: 'nav-item nav-link', text: 'Latest' },
  { class: 'nav-item nav-link', text: 'Oldest' },
];
export default class LinksPage extends Component {
  card = link => (
    <div key={link.id} className="card masonry-brick">
      <div className="card-body">
        <div className="card-content">
          <img className="card-img-top" src={link.imageUrl} alt="news_link" />
          <h5 className="card-title">{link.title}</h5>
          <p className="card-text">{link.description}</p>
        </div>
      </div>
      <div className="card-footer">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
          role="button"
        >
          Learn More
        </a>
      </div>
    </div>
  );

  navItem = text => (
    <li key={Math.random() / 3.67} className="nav-item">
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
    <nav className="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
      {this.link('NewsLink', 'navbar-brand')}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-expanded="false"
      >
        <span className="navbar-toggler-icon" />
      </button>
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
    <nav className="nav nav-tabs justify-content-center">
      {navOptions.map(option => this.link(option.text, option.class))}
    </nav>
  );

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
                <a data-toggle="modal" data-target="#createLink" className="float">
                  <i className="fa fa-plus my-float" />
                </a>
                <CreateLinkModal id="createLink" title="Create News Link" render={<LinkForm />} />
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
// Add a black-background footer
