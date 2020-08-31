import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Pengadaan = React.lazy(() =>
  import(/* webpackChunkName: "pengadaan" */ './pengadaan')
);
const FormPengadaan = React.lazy(() =>
  import(/* webpackChunkName: "forpm-pengadaan" */ './form-pengadaan')
);
const FormEditPengadaan = React.lazy(() =>
  import(/* webpackChunkName: "form-edit-pengadaan" */ './form-update-pengadaan')
);
const DetailPengadaan = React.lazy(() =>
  import(/* webpackChunkName: "detail-pengadaan" */ './detail-pengadaan')
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
      <Route
        path={`${match.url}/form-update-pengadaan`}
        render={props => <FormEditPengadaan {...props} />}
      />
      <Route
        path={`${match.url}/detail-pengadaan`}
        render={props => <DetailPengadaan {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuPengadaan;
