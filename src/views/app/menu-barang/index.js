import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Barang = React.lazy(() =>
  import(/* webpackChunkName: "barang" */ './barang')
);
const MenuBarang = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/barang`} />
      <Route
        path={`${match.url}/barang`}
        render={props => <Barang {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuBarang;
