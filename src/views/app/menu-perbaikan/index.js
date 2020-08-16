import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Perbaikan = React.lazy(() =>
  import(/* webpackChunkName: "perbaikan" */ './perbaikan')
);
const DetailPerbaikan = React.lazy(() =>
  import(/* webpackChunkName: "detail-perbaikan" */ './detail-perbaikan')
);
const FormPerbaikan = React.lazy(() =>
  import(/* webpackChunkName: "form-perbaikan" */ './form-perbaikan')
);
const MenuPerbaikan = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/perbaikan`} />
      <Route
        path={`${match.url}/perbaikan`}
        render={props => <Perbaikan {...props} />}
      />
      <Route
        path={`${match.url}/detail-perbaikan`}
        render={props => <DetailPerbaikan {...props} />}
      />
      <Route
        path={`${match.url}/form-perbaikan`}
        render={props => <FormPerbaikan {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuPerbaikan;
