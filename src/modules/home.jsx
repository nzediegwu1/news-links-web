import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Button from '../components/button';
import FormGroup from '../components/formGroup';
import SocialAuths from '../components/socialAuths';
import { siteInfo } from '../messages/info';
import { userFormInputs, userFormType } from '../utils';

export default class Home extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
  };

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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  userForm = (inputs, type) => (
    <form>
      {inputs.map(input => (
        <FormGroup
          key={input.placeholder}
          required="required"
          value={input.value}
          onChange={this.handleChange}
          placeholder={input.placeholder}
          type={input.type}
          icon={input.icon}
          name={input.name}
        />
      ))}
      <div className="form-group">
        <Button type="submit" text={type.buttonText} css="btn-lg btn-light" />
      </div>
      <p className="text-center">OR</p>
      <SocialAuths />
      <p className="text-center signup-link">
        {type.text}
        <Link to={type.url}>{type.linkText}</Link>
      </p>
    </form>
  );

  loginForm = () => {
    const { email, password } = this.state;
    return this.userForm(userFormInputs(email, password, []), userFormType.login);
  };

  signupForm = () => {
    const { email, password, name } = this.state;
    const extraInputs = [
      {
        value: name,
        placeholder: 'Name',
        type: 'text',
        icon: 'fa-user',
        name: 'name',
      },
    ];
    return this.userForm(userFormInputs(email, password, extraInputs), userFormType.signup);
  };

  RightColumn = () => (
    <div className="col-sm-5">
      <div className="login-panel">
        <Switch>
          <Route path="/signup" component={this.signupForm} />
          <Route path="/" component={this.loginForm} />
        </Switch>
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
