import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
import LinkPage from './linksPage';

export default function Index() {
  return (
    <Switch>
      <Route path="/links" component={LinkPage} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
