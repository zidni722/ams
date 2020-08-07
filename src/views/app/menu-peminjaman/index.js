import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Peminjaman = React.lazy(() =>
  import(/* webpackChunkName: "peminjaman" */ './peminjaman')
);
const FormPeminjaman = React.lazy(() =>
  import(/* webpackChunkName: "form-peminjaman" */ './form-peminjaman')
);
const MenuPeminjaman = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/peminjaman`} />
      <Route
        path={`${match.url}/peminjaman`}
        render={props => <Peminjaman {...props} />}
      />
      <Route
        path={`${match.url}/form-peminjaman`}
        render={props => <FormPeminjaman {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuPeminjaman;
