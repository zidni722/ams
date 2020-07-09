import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Perbaikan = React.lazy(() =>
  import(/* webpackChunkName: "perbaikan" */ './perbaikan')
);
const MenuPerbaikan = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/perbaikan`} />
      <Route
        path={`${match.url}/perbaikan`}
        render={props => <Perbaikan {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuPerbaikan;
