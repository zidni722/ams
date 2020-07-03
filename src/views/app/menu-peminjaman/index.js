import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Peminjaman = React.lazy(() =>
  import(/* webpackChunkName: "barang" */ './peminjaman')
);
const MenuPeminjaman = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/peminjaman`} />
      <Route
        path={`${match.url}/peminjaman`}
        render={props => <Peminjaman {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuPeminjaman;
