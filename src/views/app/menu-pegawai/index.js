import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Pegawai = React.lazy(() =>
  import(/* webpackChunkName: "pegawai" */ './pegawai')
);
const DetailsPages = React.lazy(() =>
  import(/* webpackChunkName: "detail-pegawai" */ './detail-pegawai')
);
const MenuPegawai = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/pegawai`} />
      <Route
        path={`${match.url}/pegawai`}
        render={props => <Pegawai {...props} />}
      />
      <Route
        path={`${match.url}/detail-pegawai`}
        render={props => <DetailsPages {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuPegawai;
