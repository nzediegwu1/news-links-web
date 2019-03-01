import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import toastr from 'toastr';
import { SIGNUP, LOGIN } from '../graphql';
import Button from '../components/button';
import FormGroup from '../components/formGroup';
import SocialAuths from '../components/socialAuths';
import { siteInfo } from '../messages/info';
import { UserSchema } from '../schemas';
import { userFormInputs, userFormType, errorObject } from '../utils';

export default class Home extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    context: 'LOGIN',
    hide: 'd-none',
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

  validateInput = (context) => {
    const { name, email, password } = this.state;
    const schema = UserSchema(context);
    return schema.validate({ name, email, password }, { abortEarly: false });
  };

  handleSubmit = async (e, signup, context) => {
    e.preventDefault();
    try {
      await this.setState({ hide: null });
      await this.validateInput(context);
      const response = await signup();
      toastr.success(`${context} Successful`);
      const { data } = response;
      const actionType = this.handleContext()[context].mutator;
      localStorage.token = data[actionType].token;
      this.setState({ hide: 'd-none' });
      this.props.history.push('/links');
    } catch (error) {
      const errors = errorObject(error);
      for (const item in errors) {
        if (item in error) errors[item]();
      }
      this.setState({ hide: 'd-none' });
    }
  };

  handleContext = () => {
    const { name, email, password } = this.state;
    return {
      LOGIN: {
        mutator: 'signin',
        data: { email, password },
        mutation: LOGIN,
      },
      'SIGN UP': {
        mutator: 'signup',
        data: { name, email, password },
        mutation: SIGNUP,
      },
    };
  };

  userForm = (inputs, type) => {
    const { hide } = this.state;
    const context = this.handleContext()[type.action];
    return (
      <Mutation errorPolicy="all" variables={context.data} mutation={context.mutation}>
        {signup => (
          <form onSubmit={e => this.handleSubmit(e, signup, type.action)}>
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
              <button type="submit" className="btn-lg btn-light">
                <i className={`fa fa-spinner fa-pulse ${hide}`} />
                &nbsp;
                {type.action}
              </button>
            </div>
            <p className="text-center">OR</p>
            <SocialAuths />
            <p className="text-center signup-link">
              {type.text}
              <Link to={type.url}>{type.linkText}</Link>
            </p>
          </form>
        )}
      </Mutation>
    );
  };

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
