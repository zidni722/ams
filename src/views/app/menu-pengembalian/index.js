import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Pengembalian = React.lazy(() =>
  import(/* webpackChunkName: "pengembalian" */ './pengembalian')
);
const DetailPengembalian = React.lazy(() => 
  import(/* webpackChunkName: "detail-pengembalian" */ './detail-pengembalian')
);
const FormPengembalian = React.lazy(() => 
  import(/* webpackChunkName: "form-pengembalian" */ './form-pengembalian')
);
const MenuPengembalian = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/pengembalian`} />
      <Route
        path={`${match.url}/pengembalian`}
        render={props => <Pengembalian {...props} />}
      />
      <Route
        path={`${match.url}/detail-pengembalian`}
        render={props => <DetailPengembalian {...props} />}
      />
      <Route
        path={`${match.url}/form-pengembalian`}
        render={props => <FormPengembalian {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuPengembalian;
