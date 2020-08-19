import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const DashboardsMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboards`} />
      <Route
        path={`${match.url}/dashboards`}
        render={props => <Dashboards {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default DashboardsMenu;
