import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import Pagination from "../../../containers/pages/Pagination";
import ListPageHeadingUser from "../../../containers/pages/ListPageHeadingUser";
import AddNewModalUser from "../../../containers/pages/AddNewModalUser";
import TitleKaryawan from "../../../containers/pages/TitleKaryawan";
import DataListViewKaryawan from "../../../containers/pages/DataListViewKaryawan";
import { apiClient } from "../../../helpers/ApiService";
import { reactLocalStorage } from 'reactjs-localstorage';
import { NotificationManager } from "../../../components/common/react-notifications";

function collect(props) {
  return { data: props.data };
}

const apiUrl = "/users";

class Karyawan extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "npk", label: "NPK" },
        { column: "nama", label: "Nama Pegawai" },
        { column: "divisi", label: "Divisi" }
      ],
      pageSizes: [10, 20, 30, 50, 100],

      selectedOrderOption: { column: "code", label: "NPK" },
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      isLoading: false
    };
  }

  componentDidMount() {
    this.dataListRender();

    if (reactLocalStorage.get('isSuccesSubmit') === "true") {
      NotificationManager.success(
        "Anda berhasil menambahkan karyawan baru",
        "Penambahan Karyawan Berhasil",
        1000000000,
        () => {
          reactLocalStorage.set('isSuccesSubmit', false)
          this.setState({ visible: false });
        },
        null
      );
    }
  }

  onDismiss =()=> {
    this.setState({ visible: false });
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  changeOrderBy = column => {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.column === column
        )
      },
      () => this.dataListRender()
    );
  };

  changePageSize = size => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender()
    );
  };

  changeDisplayMode = mode => {
    this.setState({
      displayMode: mode
    });
    return false;
  };

  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  };

  onSearchKey = e => {
    if (e.key === "Enter") {
      this.setState(
        {
          search: e.target.value.toLowerCase()
        },
        () => this.dataListRender()
      );
    }
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search
    } = this.state;

    apiClient
      .get(
        `${apiUrl}?per_page=${selectedPageSize}&page=${currentPage}&orderBy=${
        selectedOrderOption.column
        }&search=${search}`,
      )
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({
          totalPage: data.meta.total,
          employee: data.data,
          selectedItems: [],
          totalItemCount: data.meta.count,
          isLoading: true
        });
        console.log(this.state.items);
      })
      .catch((e) => {
        console.log(e.message)
        NotificationManager.error(
          "Silahkan coba kembali beberapa saat lagi!",
          "Terjadi Kesalahan",
          1000000000,
          () => {
            this.setState({ visible: false });
          },
          null
        );
      });
  }

  onContextMenuClick = (e, data, target) => {
    console.log(
      "onContextMenuClick - selected items",
      this.state.selectedItems
    );
    console.log("onContextMenuClick - action : ", data.action);
  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems: [clickedProductId]
      });
    }

    return true;
  };

  render() {
    const {
      currentPage,
      employee,
      displayMode,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      selectedItems,
      orderOptions,
      pageSizes,
      modalOpen,
      categories
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <div className="disable-text-selection">
            <ListPageHeadingUser
              heading="Karyawan"
              displayMode={displayMode}
              changeDisplayMode={this.changeDisplayMode}
              handleChangeSelectAll={this.handleChangeSelectAll}
              changeOrderBy={this.changeOrderBy}
              changePageSize={this.changePageSize}
              selectedPageSize={selectedPageSize}
              totalItemCount={totalItemCount}
              selectedOrderOption={selectedOrderOption}
              match={match}
              startIndex={startIndex}
              endIndex={endIndex}
              selectedItemsLength={selectedItems ? selectedItems.length : 0}
              itemsLength={employee ? employee.length : 0}
              onSearchKey={this.onSearchKey}
              orderOptions={orderOptions}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
            />
            <AddNewModalUser
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              categories={categories}
            />
            <TitleKaryawan />
            <Row>
              {this.state.employee.map(karyawan => {
                return (
                  <DataListViewKaryawan
                    key={karyawan.id}
                    karyawan={karyawan}
                    collect={collect}
                    isSelect={this.state.selectedItems.includes(karyawan.id)}
                  />
                );
              })}{" "}
              <Pagination
                currentPage={this.state.currentPage}
                totalPage={this.state.totalPage}
                onChangePage={i => this.onChangePage(i)}
              />
            </Row>
          </div>
        </Fragment>
      );
  }
}
export default Karyawan;