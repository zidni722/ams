import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import axios from "axios";

import { servicePath } from "../../../constants/defaultValues";

import Pagination from "../../../containers/pages/Pagination";
import ContextMenuContainer from "../../../containers/pages/ContextMenuContainer";
import ListPageHeading from "../../../containers/pages/ListPageHeadingPengadaan";
import AddNewModal from "../../../containers/pages/AddNewModal";
import { Colxx } from "../../../components/common/CustomBootstrap";
import ListItemBarang from "../../../containers/pages/ListBarang";

const apiUrl = servicePath + "/cakes/paging";

class Barang extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {

      selectedPageSize: 10, 
      orderOptions: [
        { products: "code", label: "Kode Barang" },
        { products: "category", label: "Jenis Barang" },
        { products: "status", label: "Status" }
      ],
      pageSizes: [10, 20, 30, 50, 100],

      categories: [
        { label: "Laptop", value: "Laptop", key: 0 },
        { label: "Aksesoris", value: "Aksesoris", key: 1 },
        { label: "Lainnya", value: "Lainnya", key: 2 }
      ],

      selectedOrderOption: { products: "code", label: "Kode Barang" },
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
    this.mouseTrap.bind(["ctrl+a", "command+a"], () =>
      this.handleChangeSelectAll(false)
    );
    this.mouseTrap.bind(["ctrl+d", "command+d"], () => {
      this.setState({
        selectedItems: []
      });
      return false;
    });
  }

  componentWillUnmount() {
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  changeOrderBy = products => {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.products === products
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

  // onCheckItem = (event, id) => {
  //   if (
  //     event.target.tagName === "A" ||
  //     (event.target.parentElement && event.target.parentElement.tagName === "A")
  //   ) {
  //     return true;
  //   }
  //   if (this.state.lastChecked === null) {
  //     this.setState({
  //       lastChecked: id
  //     });
  //   }

  //   let selectedItems = this.state.selectedItems;
  //   if (selectedItems.includes(id)) {
  //     selectedItems = selectedItems.filter(x => x !== id);
  //   } else {
  //     selectedItems.push(id);
  //   }
  //   this.setState({
  //     selectedItems
  //   });

  //   if (event.shiftKey) {
  //     var items = this.state.items;
  //     var start = this.getIndex(id, items, "id");
  //     var end = this.getIndex(this.state.lastChecked, items, "id");
  //     items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
  //     selectedItems.push(
  //       ...items.map(item => {
  //         return item.id;
  //       })
  //     );
  //     selectedItems = Array.from(new Set(selectedItems));
  //     this.setState({
  //       selectedItems
  //     });
  //   }
  //   document.activeElement.blur();
  // };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  // handleChangeSelectAll = isToggle => {
  //   if (this.state.selectedItems.length >= this.state.items.length) {
  //     if (isToggle) {
  //       this.setState({
  //         selectedItems: []
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       selectedItems: this.state.items.map(x => x.id)
  //     });
  //   }
  //   document.activeElement.blur();
  //   return false;
  // };

  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search
    } = this.state;
    axios
      .get(
        `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${
          selectedOrderOption.products
        }&search=${search}`
      )
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({
          totalPage: data.totalPage,
          items: data.data,
          selectedItems: [],
          totalItemCount: data.totalItem,
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
      items,
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
          <ListPageHeading
            heading="Barang"
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
          <AddNewModal
            modalOpen={modalOpen}
            toggleModal={this.toggleModal}
            categories={categories}
          />
          <Row>
            <Colxx xxs="12" className="mb-4">
                <ListItemBarang/>              
            </Colxx>
            <Pagination
              currentPage={this.state.currentPage}
              totalPage={this.state.totalPage}
              onChangePage={i => this.onChangePage(i)}
            />
            <ContextMenuContainer
              onContextMenuClick={this.onContextMenuClick}
              onContextMenu={this.onContextMenu}
            />
          </Row>
        </div>
      </Fragment>
    );
  }
}
export default Barang;