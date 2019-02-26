import React from 'react';
import Button from '../components/button';
import FormGroup from '../components/formGroup';
import SocialAuths from '../components/socialAuths';
import { siteInfo } from '../messages/info';

export default class Home extends React.Component {
  LeftColumn = () => {
    const { history } = this.props;
    return (
      <div className="col-sm-7 home-text">
        <h1 className="header">News Link</h1>
        <p className="site-info">{siteInfo}</p>
        <div className="onboard">
          <Button text="Discover More" action={() => history.push('/links')} />
        </div>
      </div>
    );
  };

  RightColumn = () => (
    <div className="col-sm-5">
      <div className="login-panel">
        <form>
          <FormGroup placeholder="Email" icon="fa-user-circle-o" />
          <FormGroup type="password" placeholder="Password" icon="fa-lock" />
          <div className="form-group">
            <Button text="SIGN IN" css="btn-lg btn-light" />
          </div>
          <p className="text-center">OR</p>
          <SocialAuths />
        </form>
      </div>
    </div>
  );

  render() {
    return (
      <div className="background container">
        <div className="row">
          {this.LeftColumn()}
          {this.RightColumn()}
        </div>
      </div>
    );
  }
}
