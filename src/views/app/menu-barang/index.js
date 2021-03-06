import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {isAuthorize} from "../../../helpers/AccessAllowed";

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
      {
        isAuthorize() &&
        <Route
          path={`${match.url}/barang`}
          render={props => <Barang {...props} />}
        />
      }
      {
        isAuthorize() &&
        <Route
            path={`${match.url}/detail-barang/:id`}
            render={props => <DetailsPages {...props} />}
        />
      }
      {
        isAuthorize() &&
        <Route
            path={`${match.url}/form-tambah-barang`}
            render={props => <FormTambahBarang {...props} />}
        />
      }
      {
        isAuthorize() &&
        <Route
          path={`${match.url}/edit-barang/:id`}
          render={props => <FormEditBarang {...props} />}
        />
      }
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuBarang;
