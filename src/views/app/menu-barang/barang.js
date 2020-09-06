import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import DataListView from "../../../containers/pages/DataListView";
import Pagination from "../../../containers/pages/Pagination";
import ListPageHeadingBarang from "../../../containers/pages/ListPageHeadingBarang";
import { apiClient } from "../../../helpers/ApiService";
import TitleBarang from "../../../containers/pages/TitleBarang";
import { NotificationManager } from "../../../components/common/react-notifications";
import { reactLocalStorage } from "reactjs-localstorage";

function collect(props) {
  return { data: props.data };
}
const apiUrl = "/assets";

class DataListPages extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "code", label: "Kode Barang" },
        { column: "name", label: "Nama Barang" },
        { column: "qty", label: "Stok" }
      ],

      pageSizes: [10, 20, 30, 50, 100],

      selectedOrderOption: { column: "name", label: "Nama Barang" },
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      isLoading: false
    };
  }
  componentDidMount() {
    this.dataListRender();

    if (reactLocalStorage.get('isSuccesSubmit') === "true") {
      NotificationManager.success(
        "Anda Berhasil Menambahkan Barang Baru",
        "Penambahan Barang Berhasil",
        1000000000,
        () => {
          reactLocalStorage.set('isSuccesSubmit', false)
          this.setState({ visible: false });
        },
        null
      );
    }
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
    console.log(column);
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
        }&search=${search}`
      )
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({
          totalPage: data.meta.total,
          items: data.data,
          selectedItems: [],
          totalItemCount: data.meta.count,
          isLoading: true
        });
      }).catch((e) => {
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
      items,
      displayMode,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      selectedItems,
      orderOptions,
      pageSizes,
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <div className="disable-text-selection">
            <ListPageHeadingBarang
              heading="menu.barang"
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
              itemsLength={items ? items.length : 0}
              onSearchKey={this.onSearchKey}
              orderOptions={orderOptions}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
            />
            <TitleBarang />
            <Row>
              {this.state.items.map(product => {
                return (
                  <DataListView
                    key={product.id}
                    product={product}
                    collect={collect}
                    isSelect={this.state.selectedItems.includes(product.id)}
                  />
                );
              })}{" "}
              <Pagination
                currentPage={this.state.currentPage}
                totalPage={Math.ceil(this.state.totalPage/this.state.totalItemCount)}
                onChangePage={i => this.onChangePage(i)}
              />
            </Row>
          </div>
        </Fragment>
      );
  }
}
export default DataListPages;