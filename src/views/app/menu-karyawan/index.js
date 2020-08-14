import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Karyawan = React.lazy(() =>
  import(/* webpackChunkName: "pegawai" */ './karyawan')
);
const DetailsPages = React.lazy(() =>
  import(/* webpackChunkName: "detail-pegawai" */ './detail-karyawan')
);
const PenambahanKaryawan = React.lazy(() =>
  import(/* webpackChunkName: "detail-pegawai" */ './tambah-karyawan')
);
const EditKaryawan = React.lazy(() =>
  import(/* webpackChunkName: "edit-pegawai" */ './edit-karyawan')
);
const MenuPegawai = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/karyawan`} />
      <Route
        path={`${match.url}/karyawan`}
        render={props => <Karyawan {...props} />}
      />
      <Route
        path={`${match.url}/detail-karyawan`}
        render={props => <DetailsPages {...props} />}
      />
      <Route
        path={`${match.url}/tambah-karyawan`}
        render={props => <PenambahanKaryawan {...props} />}
      />
      <Route
        path={`${match.url}/edit-karyawan`}
        render={props => <EditKaryawan {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuPegawai;
