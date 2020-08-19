import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const UserProfil = React.lazy(() =>
  import(/* webpackChunkName: "profil" */ './profil')
);
const EditProfil = React.lazy(() =>
  import(/* webpackChunkName: "edit-profil" */ './edit-profil')
);
const MenuProfil = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/profil`} />
      <Route
        path={`${match.url}/profil`}
        render={props => <UserProfil {...props} />}
      />
      <Route
        path={`${match.url}/edit-profil`}
        render={props => <EditProfil {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuProfil;
