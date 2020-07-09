import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Pengadaan = React.lazy(() =>
  import(/* webpackChunkName: "pengadaan" */ './pengadaan')
);
const MenuPengadaan = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/pengadaan`} />
      <Route
        path={`${match.url}/pengadaan`}
        render={props => <Pengadaan {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuPengadaan;
