import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const DashboardMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard-menu" */ './dashboards-menu')
);
const MenuBarang = React.lazy(() =>
  import(/* webpackChunkName: "viwes-menu-barang" */ './menu-barang')
);
const MenuPeminjaman = React.lazy(() =>
  import(/* webpackChunkName: "viwes-menu-peminjaman" */ './menu-peminjaman')
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboards-menu`} />
              <Route
                path={`${match.url}/dashboards-menu`}
                render={props => <DashboardMenu {...props} />}
              />
              <Route
                path={`${match.url}/menu-barang`}
                render={props => <MenuBarang {...props} />}
              />
              <Route
                path={`${match.url}/menu-peminjaman`}
                render={props => <MenuPeminjaman {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
