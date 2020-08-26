import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Peminjaman = React.lazy(() =>
  import(/* webpackChunkName: "peminjaman" */ './peminjaman')
);
const FormPeminjaman = React.lazy(() =>
  import(/* webpackChunkName: "form-peminjaman" */ './form-peminjaman')
);
const DetailPeminjaman = React.lazy(() => 
  import(/* webpackChunkName: "detail-peminjaman" */ './detail-peminjaman')
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
      <Route
        path={`${match.url}/detail-peminjaman/:id`}
        render={props => <DetailPeminjaman {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuPeminjaman;
