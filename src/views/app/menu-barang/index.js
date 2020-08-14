import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Barang = React.lazy(() =>
  import(/* webpackChunkName: "barang" */ './barang')
);
const DetailsPages = React.lazy(() =>
  import(/* webpackChunkName: "detail-barang" */ './detail-barang')
);
const FormTambahBarang = React.lazy(() =>
  import(/* webpackChunkName: "form-tambah-barang" */ './form-tambah-barang')
);
const FormEditBarang = React.lazy(() =>
  import(/* webpackChunkName: "form-tambah-barang" */ './edit-barang')
);
const MenuBarang = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/barang`} />
      <Route
        path={`${match.url}/barang`}
        render={props => <Barang {...props} />}
      />
      <Route
        path={`${match.url}/detail-barang`}
        render={props => <DetailsPages {...props} />}
      />
      <Route
        path={`${match.url}/form-tambah-barang`}
        render={props => <FormTambahBarang {...props} />}
      />
      <Route
        path={`${match.url}/edit-barang`}
        render={props => <FormEditBarang {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuBarang;
