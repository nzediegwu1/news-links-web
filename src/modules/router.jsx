import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';

export default function Index() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}
