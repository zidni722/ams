import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Pengembalian = React.lazy(() =>
  import(/* webpackChunkName: "pengembalian" */ './pengembalian')
);
const MenuPengembalian = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/pengembalian`} />
      <Route
        path={`${match.url}/pengembalian`}
        render={props => <Pengembalian {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuPengembalian;
