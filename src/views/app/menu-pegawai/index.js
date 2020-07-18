import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Pegawai = React.lazy(() =>
  import(/* webpackChunkName: "pegawai" */ './pegawai')
);
const MenuPegawai = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/pegawai`} />
      <Route
        path={`${match.url}/pegawai`}
        render={props => <Pegawai {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuPegawai;
