import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { reactLocalStorage } from "reactjs-localstorage";
import { apiClient } from "../../helpers/ApiService";
import { NavLink } from "react-router-dom";

const notifications = reactLocalStorage.getObject('notifications')
const notificationData = notifications ? notifications.data : null


const NotificationItem = ({ id, description, title, status }) => {
  let link = ''
  switch (title) {
    case 'procurement':
      link = '/app/menu-peminjaman/detail-peminjaman/fcb75f9d-3698-4567-ba37-1e9613c22167'
      break;
      default:
        link = '/app/menu-peminjaman/detail-peminjaman/fcb75f9d-3698-4567-ba37-1e9613c22167'
  }
  return (
    <div className="d-flex flex-row mb-3 pb-3 border-bottom">
      <a href={`${link}`}>
        {
          status === 0 ? <i className="simple-icon-envelope"></i> : <i className="iconsminds-mail-open"></i>
        }
      </a>
      <div className="pl-3 pr-2">
        <a href={`${link}`}>
          <p className="font-weight-medium mb-1">{title}</p>
          <p className="text-muted mb-0 text-small">{description}</p>
        </a>
      </div>
    </div>
  );
};

const TopnavNotifications = () => {
  return (
    <div className="position-relative d-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle
          className="header-icon notificationButton"
          color="empty"
        >
          <i className="simple-icon-bell" />
          <span className="count">{notifications !== 'undefined' ? notifications.meta.total : window.location.reload()}</span>
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3 scroll"
          right
          id="notificationDropdown"
        >
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {notificationData && notificationData.map((notification, index) => {
              return <NotificationItem key={index} {...notification} />;
            })}
          </PerfectScrollbar>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavNotifications;
