import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { reactLocalStorage } from "reactjs-localstorage";
import { apiClient } from "../../helpers/ApiService";
import { NavLink } from "react-router-dom";

const notifications = reactLocalStorage.getObject('notifications')
const notificationData = notifications ? notifications.data : null


const NotificationItem = ({ id, description, title, status }) => {
  let link = ''
  let {text : desc, link_id} = description ? JSON.parse(description) : null
  let titleNotification = ''
  
  switch (title) {
    case 'borrow':
      link = '/app/menu-peminjaman/detail-peminjaman'
      titleNotification = 'Peminjaman'
      break;
    case 'return':
      link = '/app/menu-pengembalian/detail-pengembalian'
      titleNotification = 'Pengembalian'
      break;
    case 'service':
      link = '/app/menu-perbaikan/detail-perbaikan'
      titleNotification = 'Perbaikan'
      break;
    case 'procurement':
      link = '/app/menu-pengadaan/detail-pengadaan'
      titleNotification = 'Pengadaan'
      break;
    default:
      link = '/app/menu-peminjaman/detail-peminjaman'
  }
  return (
    <div className="d-flex flex-row pl-2 mb-3 pb-3 border-bottom">
      <div>
        {
          status === 0 ? <i className="simple-icon-envelope"></i> : <i className="iconsminds-mail-open"></i>
        }
      </div>
      <div className="pl-3 pr-2">
        <div className="btn-notification" onClick={() => {
          apiClient.get(`/notifications/${id}`).then((res) => {
            if (res.status === 200) {
              apiClient.get('/notifications?per_page=1000').then((result) => {
                setTimeout(()=> {
                  reactLocalStorage.setObject('notifications', result.data)
                  window.location.href = `${link}/${link_id}` 
                }, 100)
              }).catch((e) => {
                console.log(e)
              })
            }
          })
        }}>
          <p className="font-weight-medium mb-1">{titleNotification}</p>
          <p className="text-muted mb-0 text-small">{desc}</p>
        </div>
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
          <span className="count">{notifications.hasOwnProperty('meta') ? notifications.meta.total : 0}</span>
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
