import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import Pagination from "../../../containers/pages/Pagination";
import ListItemPerbaikan from "../../../containers/pages/ListPerbaikan";
import { apiClient } from "../../../helpers/ApiService";
import TitlePerbaikan from "../../../containers/pages/TitlePerbaikan";
import ListPageHeadingPerbaikan from "../../../containers/pages/ListPageHeadingPerbaikan";
import { reactLocalStorage } from "reactjs-localstorage";
import { NotificationManager } from "../../../components/common/react-notifications";

function collect(props) {
  return { data: props.data };
}

const apiUrl = "/services";

class Perbaikan extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "code", label: "Kode Barang" },
        { column: "category", label: "Jenis Barang" },
        { column: "status", label: "Status" }
      ],
      pageSizes: [10, 20, 30, 50, 100],

      categories: [
        { label: "Laptop", value: "Laptop", key: 0 },
        { label: "Aksesoris", value: "Aksesoris", key: 1 },
        { label: "Lainnya", value: "Lainnya", key: 2 }
      ],

      selectedOrderOption: { column: "code", label: "Kode Barang" },
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
        "Anda berhasil mengajukan perbaikan barang",
        "Perbaikan Barang Berhasil",
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
        }&search=${search}`
      )
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({
          totalPage: data.meta.total,
          services: data.data,
          selectedItems: [],
          totalItemCount: data.meta.count,
          isLoading: true
        });
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
      services,
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
            <ListPageHeadingPerbaikan
              heading="Perbaikan"
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
              itemsLength={services ? services.length : 0}
              onSearchKey={this.onSearchKey}
              orderOptions={orderOptions}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
            />
            <TitlePerbaikan />
            <Row>
              {services.map(service => {
                return (
                  <ListItemPerbaikan
                    key={service.id}
                    service={service}
                    collect={collect}
                    isSelect={this.state.selectedItems.includes(service.id)}
                  />
                );
              })}
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
export default Perbaikan;