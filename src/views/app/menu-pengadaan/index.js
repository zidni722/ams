import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Pengadaan = React.lazy(() =>
  import(/* webpackChunkName: "pengadaan" */ './pengadaan')
);
const FormPengadaan = React.lazy(() =>
  import(/* webpackChunkName: "forpm-pengadaan" */ './form-pengadaan')
);
const MenuPengadaan = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/pengadaan`} />
      <Route
        path={`${match.url}/pengadaan`}
        render={props => <Pengadaan {...props} />}
      />
      <Route
        path={`${match.url}/form-pengadaan`}
        render={props => <FormPengadaan {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuPengadaan;
