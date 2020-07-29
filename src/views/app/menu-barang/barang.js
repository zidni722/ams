import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import axios from "axios";

import { servicePath } from "../../../constants/defaultValues";

import DataListView from "../../../containers/pages/DataListView";
import Pagination from "../../../containers/pages/Pagination";
import ContextMenuContainer from "../../../containers/pages/ContextMenuContainer";
import ListPageHeading from "../../../containers/pages/ListPageHeadingPengadaan";

function collect(props) {
  return { data: props.data };
}
const apiUrl = servicePath;

class DataListPages extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "code", label: "Kode Barang" },
        { column: "title", label: "Nama Barang" },
        { column: "category", label: "Category" }
      ],
      pageSizes: [10, 20, 30, 50, 100],

      categories: [],

      selectedOrderOption: { column: "title", label: "Nama Barang" },
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
    this.categoryList();
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

  onCheckItem = (event, id) => {
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (this.state.lastChecked === null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

    if (event.shiftKey) {
      var items = this.state.items;
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.setState({
        selectedItems
      });
    }
    document.activeElement.blur();
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  handleChangeSelectAll = isToggle => {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: []
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map(x => x.id)
      });
    }
    document.activeElement.blur();
    return false;
  };
  // {{baseURL}}/categories
  categoryList() {
    axios
      .get(
        `${apiUrl}/categories`,
        {
          headers : {
            Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiWmlkbmkgSWxtYW4gTmFmaSIsImVtYWlsIjoiemlkbmlAcGF3b29uLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGpFTVVBVk9TVTJyNzg1TTVaWk1LR3VtM1J6NHlVUjAyaHY4cXBrQ21pazVXbWN3aDlXZGU2IiwicGhvbmUiOiIwODc4Mjk5MDg5ODgiLCJhZGRyZXNzIjoiSmFrYXJ0YSIsImNvZGUiOiJJVC0xIiwicGhvdG8iOiJ6aWRuaS5qcGciLCJyZW1lbWJlcl90b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp1WVcxbElqb2lXbWxrYm1rZ1NXeHRZVzRnVG1GbWFTSXNJbVZ0WVdsc0lqb2llbWxrYm1sQWNHRjNiMjl1TG1OdmJTSXNJbkJoYzNOM2IzSmtJam9pSkRKaEpERXdKR3BGVFZWQlZrOVRWVEp5TnpnMVRUVmFXazFMUjNWdE0xSjZOSGxWVWpBeWFIWTRjWEJyUTIxcGF6VlhiV04zYURsWFpHVTJJaXdpY0dodmJtVWlPaUl3T0RjNE1qazVNRGc1T0RnaUxDSmhaR1J5WlhOeklqb2lTbUZyWVhKMFlTSXNJbU52WkdVaU9pSkpWQzB4SWl3aWNHaHZkRzhpT2lKNmFXUnVhUzVxY0djaUxDSnlaVzFsYldKbGNsOTBiMnRsYmlJNkltVjVTbWhpUjJOcFQybEtTVlY2U1RGT2FVbHpTVzVTTldORFNUWkphM0JZVmtOS09TNWxlVXAxV1ZjeGJFbHFiMmxYYld4clltMXJaMU5YZUhSWlZ6Um5WRzFHYldGVFNYTkpiVlowV1Zkc2MwbHFiMmxsYld4clltMXNRV05IUmpOaU1qbDFURzFPZG1KVFNYTkpia0pvWXpOT00ySXpTbXRKYW05cFNrUkthRXBFUlhkS1IzQkdWRlpXUWxack9WUldWRXA1VG5wbk1WUlVWbUZYYXpGTVVqTldkRTB4U2paT1NHeFdWV3BCZVdGSVdUUmpXRUp5VVRJeGNHRjZWbGhpVjA0ellVUnNXRnBIVlRKSmFYZHBZMGRvZG1KdFZXbFBhVWwzVDBSak5FMXFhelZOUkdjMVQwUm5hVXhEU21oYVIxSjVXbGhPZWtscWIybFRiVVp5V1ZoS01GbFRTWE5KYlU1MldrZFZhVTlwU2twV1F6QjRTV2wzYVdOSGFIWmtSemhwVDJsS05tRlhVblZoVXpWeFkwZGphVXhEU25sYVZ6RnNZbGRLYkdOc09UQmlNblJzWW1sSk5rbHRWalZUYldocFVqSk9jRlF5YkV0VFZsWTJVMVJHVDJGVmJIcFRWelZUVGxkT1JGTlVXa3BoTTBKWlZtdE9TMDlUTld4bFZYQXhWMVpqZUdKRmJIRmlNbXhZWWxkNGNsbHRNWEphTVU1WVpVaFNXbFo2VW01V1J6RkhZbGRHVkZOWVRrcGlWbG93VjFaa2MyTXdiSEZpTW14c1lsZDRjbGx0TVhOUlYwNUlVbXBPYVUxcWJERlVSekZQWkcxS1ZGTllUa3BpYTBwdldYcE9UMDB5U1hwVGJYUktZVzA1Y0ZOclVrdGhSWEJGVWxoa1MxSXpRa2RXUmxwWFVXeGFjazlXVWxkV1JYQTFWRzV3YmsxV1VsVldiVVpZWVhwR1RWVnFUbGRrUlRCNFUycGFUMU5IZUZkV1YzQkNaVmRHU1ZkVVVtcFhSVXA1VlZSSmVHTkhSalpXYkdocFZqQTBlbGxWVW5OWFJuQklWbFJLU21GWVpIQlpNR1J2WkcxS2RGWlhiRkJoVld3elZEQlNhazVGTVhGaGVsWk9Va2RqTVZRd1VtNWhWWGhFVTIxb1lWSXhTalZYYkdoUFpXdHNjV0l5YkZSaVZWcDVWMVpvUzAxR2JGUlRXRTVLWWxVMU1sZHJaRlpoVlRsd1UydHdWMUY2UWpSVFYyd3pZVmRPU0dGSVdtdFNlbWh3VkRKc1MwNXRSbGhWYmxab1ZYcFdlRmt3WkdwaFZYaEVVMjVzWVZaNlJuTlpiR1JMWWtkT2MwOVVRbWxOYmxKeldXMXNTazVyYkhSV2FsWlVZbGRvY0ZWcVNrOWpSbEY1WWtWMFZGWnNXVEpWTVZKSFZESkdWbUpJY0ZSV2VsWlVWR3hrVDFKR1RsVlhhM0JvVFRCS1dsWnRkRTlUTURsVVRsZDRiRlpZUVhoV01WcHFaVWRLUm1KSVJtbE5iWGhaV1d4a05HTnNiSFJOV0VwaFRWVTFXVnBWYUZOWGJGbzJWVzAxVjFKNlJraFpiR1JIVmtaT1dWUnJjR2xXYkc5M1ZqRmFhMk15VFhkaVNFWnBUVzE0YzFsc1pEUmpiR3gwVFZoT1VsWXdOVWxWYlhCUFlWVXhjV0pFUmxWU2VrWlFXa2N4UzFaR1RsbFVhM0JwWVRCd2RsZFljRTlVTURCNVUxaHdWR0pZVWt0WlZ6QTFZMFpPY2xWcmRHaFNXRUpHVld4b2ExTXhTWHBSYTJSWFVteHdXRlZYZUdGamF6bFhWV3hrVjFKWVFURldSelYzWW1zeFYxVnNWbGRpVlZwWldWaHdSMVJXVm5GVWJHUnJVbFJDTkZVeWNHRlVNVTVJWlVaa1YxWXpRa05hVm1SSFUxWmtWVlZ0Y0ZoU1ZYQTFWbFpTU21WSFRraFNhbHBYWWtkb2NGWnFRVEJsYkd4V1ZXNU9XRkp1UWtsV2JGSkxVMjFHV1ZwSVFscE5SMUoyV2tjeFMyUkdXbGhpUmtKb1ZsZDNlbFpFUWxOaGF6VkdUVmhHYUdWc1drOVZhMlJxVFZaUmQxVnROV2hXV0doRlZUSXhiMWxXU1hoVGFsWllZa2RvVUZwWGRITmpWMGw1WWtaU2FWWldjRFZXTVZwdlV6QXhSMkpHVWxSWFJUVkxXV3hWTVUxc1pISmFSbHBvVmxSc2QxVXlkSGRXTVVZMlVXcFNWRll5ZDNwWlZtUlBVMGRHU1ZkdGRGTmxiV2gzVmtSS2MxTXdOWFJTYkdoV1lteGFiMVpZY0ZkbFJtdDNXa2R3YUZaWWFFVlZNalZ6V1ZaYU5sSnVUbHBpUjFKTVdXdGtUMk13T1ZWUmJXeE9ZbXhLZWxkWE1YTlRhelZ5WWtoU1YyRnNXbFZaYkdSdlkwWldjVk5yT1dwU2JFWTFXV3RXTUZaR1duTlhWRXBXVFZaS1NGWkVTa2RXYlVwSlkwWlNWMlZzV2xWV1IzaHJWREZLUjFSc1ZsaGhNMEp2VkZSQ1MxZHNXblJrUlRsVVRVUnNWVlJzWkRSaVJscFpVVmhvVjAxV2NIRmFWV1JMVW0xS1NWSnRiRTVpV0doYVYxZDRhMDVIVG5OaVNGSk9WMFZ3YUZSV1ZURlhWbkJXWVVaT1dHSkdiekpXVnpBeFZqRktObEpyYUZwaVIxSklWbXRhVDFkV1VuSmpSMnhYWWtjNU0xWnFSbUZoTWsxNVZGaGthVk5GV25CVVZ6RTBZekZzYzFwRVVtcGlSM2d3VkZab1QxVnNXWGRPVld4V1lsaENVRmxXVlhoalYwcEZVbXhXVTJWcldsRlhhMk40VXpGYVIxUnNiRlZoTTBKd1dWUkNkMlJzWkZsalJUbFZUVVJDTlZVeGFIZFdSMHBaVld0MFdsWjZRVEZaTUZwUFkyeFdjbVJIYUZOWFJVcEhWbGQ0YjJFeFRYaFRXSEJTWVRKU1dGVnRlSGRYUmxaWVpVZEdhbUY2YkZoV1YzaHJWakZLV1ZGVVJsZFNlbFl6V1cxemVGWXhWbk5XYkdScFZsWndXbGRXYUhkU01WSlhWbTVHVldKSFVuSlZiRkpEVGtaVmVXTkhSbFZOVlRWSldsVmFhMVl4V1hwUmEwNWhWbTFTU0ZVeFdtdFdWbFowWTBab1UxWllRVEZXYkZwVFUyMVdTRlJyYUZOaGJIQllXV3RrYjJOR1duRlJWRUpzWWtkNFYxWlhOVTlYUmtwMVVXdHNWMkpHU2t4Vk1qRkhWMVp3U1ZGc2NFNVNNVW95VjJ0amVGTXlVa2RYYkdocFVtdEtiMVpzWkRObGJGcEZVV3hPYUdGNlZrZFVWbWhIWVVkV2MxZHJPVlpoTWxKeFZGWmFVbVF4Vm5ST1YyaFhWMGRvUmxaVVNYaGlNV3hYVTFob1ZHRnNXbGxaYTJSdlZVWndXR1JJVG1wV01HdzFXV3RhVTJGV1dsZGpSRlpYVFZad2RsVjZRWGhTTWtwSFZXeFNXRkpVVmt4WFYzaFdUVlV4YzFwSVNtRlNiSEJ2Vm14U2MyUXhWWGxrU0dSWFRWVlpNbFZYY0ZOV1JsbDVaRE53V2xadFVsQlZNR1JIVTFaa2RHUkdUbXhpVjJnelZtdFNTMk14VFhkT1dGSlRZa2RvVjFsdGVHRmlNVnBaWTBaa2JGSnRkRE5YYTJSM1lVWmFXV0ZGVmxaTmFsWjZWMVphWVU1c1NuVlViSEJwVWpGS1RWZFhkR3RVTWsxM1QxWldVbUpYZUU5WmJYaExaV3hrV0UxWVRsUmhlbFl3VlRJMVYxWXlTbkpPV0VKV1ZrVTFjbGt3V25OT2JGSnpWRzFvVTAxVmNFdFdiVEF4WkRGT2RGSnVVbEJXUlRWV1ZXeFZNVlJHY0ZkYVJYQnNWakZhU1ZwVlduTlViVXBaWVVoc1ZrMVhVak5hUnpGWFVtMVdSbFZzVW1sWFJrcDJWbXBDWVdReVVYaGlSRnBVWW1zMWNsbHNWbmRsYkZGNFlVVk9XbFpyVmpOWldIQkxWbGRGZDA1SWNGcFdiSEI1V2xaa1MxSldSblJsUm1Sb1lsaG5lbFpxU2pCVU1VNXlUbGhTVkdKc1dsaFpiWE14WTBaV1ZWUnRkR3BTYlhoWVYydGFTMkZHV2xWaVNHaFhZa2RvVUZVeU1VdGpNV1JaWVVad1YySldTbFJYVmxwV1RsZE9SMVJ1VW1sU2JrSlBXVlJHVjA1c1dYaGFTR1JVWVhwR1IxUldhRU5VYkZsNlVXeENWMkZyV2xkVVZWcFRVakZXYzFSdGFGZGlhMHBhVm0xNGIxVXhWa2RYYTFwWFYwZDRWbGxVUVhoT1JteFhWbGhvVTFZd1drbFpWV1JIWVVkS1dHRkljRmRTUlZwVVZqSXhWMUpyTlZsU2JFcFhUVzVvVDFaV1VrTmtNazVYWVROc1RsWnRVbTlWYWtaTFUxWmFkRTFVUWxoV1ZFWjVWakZvYTFaR1dYcFJha3BhVm14V05Ga3hXa2RYVjBwR1RsWktiR0V3YkRaV2EyTXhZMjFSZVZacldrNVdSbHBUVmpCa2IxUXhWbkpaZWxaUFZteEdORlpYTldGVWJGcFZZa1pXVmsxWGFGQlZNakZMWXpGa2NWUnNhR2hOYkVwSlZrWldZV1F4WkVkV2JsSllZa2hDV1ZWdGRHRmtNVnBGVTI1T1ZHSldXbGRVVmxaWFZrWmtTRlZyTlZkaE1WcEhXbGQ0VTFJeFZuSlhiWGhvVFc1b1IxWlhlRzloTVZaSVVtNUthR1ZyV2xaVVZ6VkRWakZTYzFadVRtcFNNVVkxV1d0a1IxVXdNVmRqUkZwWFRXNW9kbFpVU2t0U01rNUdXa1pDVjAxdGFIbFdWbEpEWTJzeGMySklVazlXYlZKeFZGZDBkMUpXY0VWVGJrNW9VbXhzTTFZeGFHdFdSbGw2VVdwS1lWWldWWGhXYkdSSFRteEdjazlYYUdoTlZtdDNWbXRqZUdReFZuUldiR2hZWWtWd1RsbFljRkpOUmxGNFZtMUdXR0pGTlRCV1J6VmhWREpLUmxOdVNscGhhMncwVjIweFVtVnNjRFpTYlhCWFZsUldVRll3YUhkWlYwcFdUVWhzVkdFeFNsRlZibkJ6Vm14c2MyRkhjRTlTTVVwSFdXdGtjMWxXWkVaTlZFSlZUVVp3TWxSWE1VZGpiRXBZWWtVeFVrMUlRVEpYYTFaclVqQXhTRlZzYkZWV01uaFJXVmQwUjJWc1RsaE9WWFJyWWxWd1NWWnRNV0ZoUmxsNFVtNUNWVTF1UWtkWmVrSnpaRVpXZFZGdGRHbFdNMmN5VjFaYWFrNVhVbGRhTTJ4cFVqTlNTMWxYTURSa01WSkdWR3QwYUdKVldscFdWM0JYVjFVeGRHVklTbFJXTTBJeldrWmtVMWRIVmtsVWF6RlNUVWhDTTFZeWRFOVRhelZ5VGxaU2EwMXRlSEpXTUZwaFpERmtjbFJyY0U5aE1uZ3dWVEl4ZDFkc1draFZia0pWVmpOQ1UxcFdWalJYUmxKVlVtMUdWMUl5VVhkV1IzUnJVekpLUjJOR1VrNVNSbHBQVm10YWNtUXhVa2RhUlhCclRVUnNTVlZ0TUhoVlJrbDRWbFJHVldKWVFrZFVWM040VWtaT1dWUnJjR2xXVkZVeFZqSjRhMUl3TVVkalJtaFdZbFp3WVZZd1drZGpSbEY1WWtWd2JGWlVSa1pWTVdoclZGWmFSbEpZY0ZWU2JFcEhXbGQwYzFKV1NsbGFSa0pvWVRKemVGWkVTbmRXYXpWV1lraENhMDF0ZUhKV01GWkxZMnhrVjJGR1RtbFNia0pJVkRGa2IyRXhSWGRoZWtwVVZqTkNTMXBFUVhoalZrWlpWV3MxVTFJd05IZFdSbHBUVkd4dmQwMVdWbEpXUm5CUVZXdFdSazFzVW5KVmF6Vm9WbGhvUlZVeU1UQlpWbGw2WVVoT1lWSlhVbGhaVkVadVpWWktjVkZyY0doaWEwbDRWMnRhYTA1SFRYZGxSVkpVWW10S1lWWXdXa2RqUmxGNVkwVmFUbFpVYkZaV1ZsSkxWR3hhUmxaWWNGVlhTRUpNVkRGTk1FMXRUbFZVYlhSUVVrVnZNVmw2U2xOaGJGWlpZVVJDVmxJeVVsbFdSV2hDVGxVeFdGcElSbFZXUjFKTFdYcEdVMk5XUmpaVVdHUlVVMGhDUjFReFZrcGxiRVpZWkVaU1QxWllhSFZUVjJ3ellWZE5lbFZ0YUd0VFJsbzJVMWR3ZG1Rd2VFUlRibXhwVFc1b2MxZEVTbk5oTUd4eFlqTm9UVkV3Y0hKWlZtaGhZMGROZVdKSVdtbGlSR3gzVjJ0T1NrNXJOVVJrTW14YVRXMTNkMXBXV1RWalJuQkVVMVJhYVdKc1ducFphMDR6WVZkR1dGVlhiRkJoYkZaNlUxYzFWMDFYUmxoVlYyeFFZVlZ3Y0ZkVVNrWk5NV3h4VTFSQ1RtRlVSbkZVYkdSV1RrVjRWVlZ0YkdGV01WWXdWREZTUmsxck5VUk5WMnhPVWtkb2IxZHRjRzlpUlRsVlYxaG9UMkZyUm5CVVJVNUxZVzFPZEZadGFHdFNNVnB5VjBSS1IwMUZiSEZpTW14T1lXdEdOVlJWVFhka01EVTFUVWhvVG1WVlJqUlVWVkoyWlZVNVZXSjZSbEJWTUd4NlUxYzFWMlF4Y0VoU2FrSmhWakZLYlZkV2FGSmhWVGx3VTFoc1RsSkZiRE5VUmxKQ1RUQjRWVkpZY0VwU1JWWXpWREp3VW1WVk9YRlNXSEJLWVZoa2NGZHJaRmRqTVhCWlZXMTRZVkpxYkc5YVJVNUtUbTFLZFZadVRtbFJNMlJ3V1Zaa1IwMUZiSEZpTTJoUFZrZHpkMVJ0Y0VabFZURTJVbFJPYlZWVE5VWmxWbkJvV2toQ00xWnNaekpSYm1Rd1pXcHNNV0l5Y0d4aWJFSlFUV3RrV21SVVVsSk9NMUp0VlZkb1YxUkVWbEJrV0ZvelZWWmpNRWxwZDJsak0xSm9aRWhXZWtscWIzZE1RMHA1WWpKNGJGZ3liR3RKYW05NFRFTkthMkZZV25Cak1teDJZbXc1Y0ZwRFNUWk9RM2RwV1RKc01HVldPWEJhUTBrMlltNVdjMkpEZDJsaFYxRnBUMnBWYzBsdVZqRmhWMUZwVDJsS2FWa3lSVE5aYWtrd1RXa3hhazVYVlRSTVZGSnBXbGRWZEU5VVJUSk9RekZwVFVSb2FGcHFhR3hQVkZsNFRtcEJhVXhEU21wamJWWm9aRWRXYTFneVJqQkphbTlwVFdwQmVVMURNSGRPZVRCNFRYbEJlRTFFYjNsUFZHOHhUMU5KYzBsdVZuZGFSMFl3V2xkU1psbFlVV2xQYVVsNVRVUkpkMHhVUVROTVZFVjZTVVJGZDA5cVZYaFBhbFV6U1dsM2FWcEhWbk5hV0ZKc1drWTVhR1JEU1RaaWJsWnpZa04zYVdGWFJqQkphbTk0VGxSck1FNXFSWGxOZW1Nd1psRXVaMHBmU1hrNU5GZHZPWEpYVTFwYWNqVk9la2huTm5BeFlUWkVaRXRuWTFSd1FsazVkR0Z2VlhoelFTSXNJbk4wWVhSMWN5STZNQ3dpY205c1pWOXBaQ0k2TVN3aVpHbDJhWE5wYjI1ZmFXUWlPalFzSW1OcGRIbGZhV1FpT201MWJHd3NJbWxrSWpvMUxDSjFkV2xrSWpvaVltTmhOMkl5TkRJdFl6VmxPQzAwWW1WbExUa3hOalF0WWpBNFlXWTRaVGsyTVRZd0lpd2lZM0psWVhSbFpGOWhkQ0k2SWpJd01qQXRNRGN0TVRNZ01UQTZNams2TlRraUxDSjFjR1JoZEdWa1gyRjBJam9pTWpBeU1DMHdOeTB4TXlBeE1EbzFNam8xTkNJc0ltUmxiR1YwWldSZllYUWlPbTUxYkd3c0ltbGhkQ0k2TVRVNU5UWTROamt5TW4wLmRzMVBfSmt6Zy1VVmNCbTJ2aEZVWUQ4VU55RGNScHNGMHptOXhSd19INE0iLCJzdGF0dXMiOjAsInJvbGVfaWQiOjEsImRpdmlzaW9uX2lkIjo0LCJjaXR5X2lkIjpudWxsLCJpZCI6NSwidXVpZCI6ImJjYTdiMjQyLWM1ZTgtNGJlZS05MTY0LWIwOGFmOGU5NjE2MCIsImNyZWF0ZWRfYXQiOiIyMDIwLTA3LTEzIDEwOjI5OjU5IiwidXBkYXRlZF9hdCI6IjIwMjAtMDctMjUgMjE6MjI6MDMiLCJkZWxldGVkX2F0IjpudWxsLCJpYXQiOjE1OTU2OTA1NTZ9.qZ_xX_vkPBDFqenjxdKfXeqlxS5ujZYUS9AvDyt48ew'
          }
        }
      )
      .then(response => {
        let res = response.data
        console.log(res);
        // return {
        //         data: res.data,
        //         meta: res.meta
        //       };
      });
      // .then(res => {
      //   this.setState({
      //     items: res.data,
      //     selectedItems: [],
      //     totalPage: res.meta.page,
      //     totalItemCount: res.meta.per_page,
      //     isLoading: true
      //   });
      // });
  };

  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search
    } = this.state;
    axios
      .get(
        `${apiUrl}/assets?per_page=${selectedPageSize}&page=${currentPage}&orderBy=${
          selectedOrderOption.column
        }&search=${search}`, {
          headers : {
            Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiWmlkbmkgSWxtYW4gTmFmaSIsImVtYWlsIjoiemlkbmlAcGF3b29uLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGpFTVVBVk9TVTJyNzg1TTVaWk1LR3VtM1J6NHlVUjAyaHY4cXBrQ21pazVXbWN3aDlXZGU2IiwicGhvbmUiOiIwODc4Mjk5MDg5ODgiLCJhZGRyZXNzIjoiSmFrYXJ0YSIsImNvZGUiOiJJVC0xIiwicGhvdG8iOiJ6aWRuaS5qcGciLCJyZW1lbWJlcl90b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp1WVcxbElqb2lXbWxrYm1rZ1NXeHRZVzRnVG1GbWFTSXNJbVZ0WVdsc0lqb2llbWxrYm1sQWNHRjNiMjl1TG1OdmJTSXNJbkJoYzNOM2IzSmtJam9pSkRKaEpERXdKR3BGVFZWQlZrOVRWVEp5TnpnMVRUVmFXazFMUjNWdE0xSjZOSGxWVWpBeWFIWTRjWEJyUTIxcGF6VlhiV04zYURsWFpHVTJJaXdpY0dodmJtVWlPaUl3T0RjNE1qazVNRGc1T0RnaUxDSmhaR1J5WlhOeklqb2lTbUZyWVhKMFlTSXNJbU52WkdVaU9pSkpWQzB4SWl3aWNHaHZkRzhpT2lKNmFXUnVhUzVxY0djaUxDSnlaVzFsYldKbGNsOTBiMnRsYmlJNkltVjVTbWhpUjJOcFQybEtTVlY2U1RGT2FVbHpTVzVTTldORFNUWkphM0JZVmtOS09TNWxlVXAxV1ZjeGJFbHFiMmxYYld4clltMXJaMU5YZUhSWlZ6Um5WRzFHYldGVFNYTkpiVlowV1Zkc2MwbHFiMmxsYld4clltMXNRV05IUmpOaU1qbDFURzFPZG1KVFNYTkpia0pvWXpOT00ySXpTbXRKYW05cFNrUkthRXBFUlhkS1IzQkdWRlpXUWxack9WUldWRXA1VG5wbk1WUlVWbUZYYXpGTVVqTldkRTB4U2paT1NHeFdWV3BCZVdGSVdUUmpXRUp5VVRJeGNHRjZWbGhpVjA0ellVUnNXRnBIVlRKSmFYZHBZMGRvZG1KdFZXbFBhVWwzVDBSak5FMXFhelZOUkdjMVQwUm5hVXhEU21oYVIxSjVXbGhPZWtscWIybFRiVVp5V1ZoS01GbFRTWE5KYlU1MldrZFZhVTlwU2twV1F6QjRTV2wzYVdOSGFIWmtSemhwVDJsS05tRlhVblZoVXpWeFkwZGphVXhEU25sYVZ6RnNZbGRLYkdOc09UQmlNblJzWW1sSk5rbHRWalZUYldocFVqSk9jRlF5YkV0VFZsWTJVMVJHVDJGVmJIcFRWelZUVGxkT1JGTlVXa3BoTTBKWlZtdE9TMDlUTld4bFZYQXhWMVpqZUdKRmJIRmlNbXhZWWxkNGNsbHRNWEphTVU1WVpVaFNXbFo2VW01V1J6RkhZbGRHVkZOWVRrcGlWbG93VjFaa2MyTXdiSEZpTW14c1lsZDRjbGx0TVhOUlYwNUlVbXBPYVUxcWJERlVSekZQWkcxS1ZGTllUa3BpYTBwdldYcE9UMDB5U1hwVGJYUktZVzA1Y0ZOclVrdGhSWEJGVWxoa1MxSXpRa2RXUmxwWFVXeGFjazlXVWxkV1JYQTFWRzV3YmsxV1VsVldiVVpZWVhwR1RWVnFUbGRrUlRCNFUycGFUMU5IZUZkV1YzQkNaVmRHU1ZkVVVtcFhSVXA1VlZSSmVHTkhSalpXYkdocFZqQTBlbGxWVW5OWFJuQklWbFJLU21GWVpIQlpNR1J2WkcxS2RGWlhiRkJoVld3elZEQlNhazVGTVhGaGVsWk9Va2RqTVZRd1VtNWhWWGhFVTIxb1lWSXhTalZYYkdoUFpXdHNjV0l5YkZSaVZWcDVWMVpvUzAxR2JGUlRXRTVLWWxVMU1sZHJaRlpoVlRsd1UydHdWMUY2UWpSVFYyd3pZVmRPU0dGSVdtdFNlbWh3VkRKc1MwNXRSbGhWYmxab1ZYcFdlRmt3WkdwaFZYaEVVMjVzWVZaNlJuTlpiR1JMWWtkT2MwOVVRbWxOYmxKeldXMXNTazVyYkhSV2FsWlVZbGRvY0ZWcVNrOWpSbEY1WWtWMFZGWnNXVEpWTVZKSFZESkdWbUpJY0ZSV2VsWlVWR3hrVDFKR1RsVlhhM0JvVFRCS1dsWnRkRTlUTURsVVRsZDRiRlpZUVhoV01WcHFaVWRLUm1KSVJtbE5iWGhaV1d4a05HTnNiSFJOV0VwaFRWVTFXVnBWYUZOWGJGbzJWVzAxVjFKNlJraFpiR1JIVmtaT1dWUnJjR2xXYkc5M1ZqRmFhMk15VFhkaVNFWnBUVzE0YzFsc1pEUmpiR3gwVFZoT1VsWXdOVWxWYlhCUFlWVXhjV0pFUmxWU2VrWlFXa2N4UzFaR1RsbFVhM0JwWVRCd2RsZFljRTlVTURCNVUxaHdWR0pZVWt0WlZ6QTFZMFpPY2xWcmRHaFNXRUpHVld4b2ExTXhTWHBSYTJSWFVteHdXRlZYZUdGamF6bFhWV3hrVjFKWVFURldSelYzWW1zeFYxVnNWbGRpVlZwWldWaHdSMVJXVm5GVWJHUnJVbFJDTkZVeWNHRlVNVTVJWlVaa1YxWXpRa05hVm1SSFUxWmtWVlZ0Y0ZoU1ZYQTFWbFpTU21WSFRraFNhbHBYWWtkb2NGWnFRVEJsYkd4V1ZXNU9XRkp1UWtsV2JGSkxVMjFHV1ZwSVFscE5SMUoyV2tjeFMyUkdXbGhpUmtKb1ZsZDNlbFpFUWxOaGF6VkdUVmhHYUdWc1drOVZhMlJxVFZaUmQxVnROV2hXV0doRlZUSXhiMWxXU1hoVGFsWllZa2RvVUZwWGRITmpWMGw1WWtaU2FWWldjRFZXTVZwdlV6QXhSMkpHVWxSWFJUVkxXV3hWTVUxc1pISmFSbHBvVmxSc2QxVXlkSGRXTVVZMlVXcFNWRll5ZDNwWlZtUlBVMGRHU1ZkdGRGTmxiV2gzVmtSS2MxTXdOWFJTYkdoV1lteGFiMVpZY0ZkbFJtdDNXa2R3YUZaWWFFVlZNalZ6V1ZaYU5sSnVUbHBpUjFKTVdXdGtUMk13T1ZWUmJXeE9ZbXhLZWxkWE1YTlRhelYwVTI1V1YySnJOWEJWVkU1clkwWnNObFJzVG1oU01VcEtWbTAxZDFOdFJuUlBWRTVWVWxVMVRGcFdaRXBsVjFaSVpVWnNUbUpZYUhsVk1XUjNaRzFXUm1WRlVsUmlXRkp2VmpCYWQyUXhiRFpUYms1cllsVndlbFF4YUVOWlZrVjNZWHBLVldFd05IcFpWbHB5WlZkS1JWRnRlRmRoYlhnelZqSjBUMU5yTlhSVGJsWlhZbXMxY0ZWVVRtdGpSbXhYV2taS2FGWlViSGhXYkdoUFUyMUtjMWRZYUZwV2JWSlRXVlpWTldOR1RuUmlSbkJPWVRGV05sWXhaSGRUYXpGR1RWaENUbFl6UWxCV2FrWldUVVpTUjFWc1RtaFdia0paVm14b1UxVkdXa1pXV0d4VllUQXhORmxXVlhoU1YwWklZVWRHYUdKWGFIcFdSRVpUVjIxV1JrNVlSbEpXTW5oT1ZWUkNkMk5XYTNsTlZtUm9VakZLU1ZadE1UQlhWVEZ5VjFoa1ZGWXpRakpaVmxWNFkxWkdXV0pGTlZKbGEwbDZWa2MxY21ReVZrWk5WRlpTVjBkb1QxVnJZelZPVmxGNFZXNWFUbFpVYkZWVk1XaFBVMjFLYzFkcVRsaGhNbEpJVkZWYWQxZEdWblJYYkhCWVVtdGFkMVpFU25OVGJWWldUVlZXVkZkSFVrNVdhMVpHWld4U1IxVnJXbXhoTW5oR1ZXeG9hMVZIUm5KaGVrWlZUVzVDVjFSc1ZuTmpSMUY1WWtkR1UwMVdjRFpXTW5odlZUSktSMk5GWkZCV01taHlWVlJDY2sxc2JIUk9WbVJxVFd0d1JWcEVTbk5oUmxsM1YxaGtWRll6UWpKYVZWVXhWbGRHTmxGck9XaGhNVmt3VmtjeGQxVnRWbGhYYkVwTllYcFJNRlF4Vm1GWGJFNTBWRzVhVDJKRlNuSlpha2w0V20xUmVscDZSbXBXVlRWUFYwaHdZV0pWTUhsVGExSlFVbnBzVmxsc2FHcE9SMUpHWWtkc1lWZEZNVEJVTUZwMlRXMUdjbEpYYkUxUk1IQTJXa1ZrUjAxSFVsbFVWMnhRWVd0R2VsTlhOVXRrYlVwSVZtMWFhRll4Um5CVU1uQkdZekJzZEZWdVFtdGlWM2cyV1Zaak5XUldaM2xpUjNSS1lXMDRkMVJGVGt0aGJVWlpWV3BXV1UxdGVISlRWM0IzWkZkU1dHVklUazFSTUhCM1YydE9TazVyTlZSa01teHJWMFphZDFkclRrcE9hMngwVTIxd1dsWkhVbkJVVjNCU1pWVjRXRlJVUm1GV1IyUXdWR3RrUzJKR2NGUk5SRlpPVmtacmQxUkdaRXBrTURsSVVtMHhVRkl4VlRGVWJYQkdUV3N4UkZOWVRrcGlWVFUxVjJ4a1IwMUdjRmhWYlZwYVYwWkdjRlF5YkVwbFZURkZVMWhrVFZaRlJYcFVSbEpHWld0c1JWSllaRkJoYTJzeFZESndWazVWYkhCa01teHJWMFZLY2xkV2FGTmlSbkJIVDFkb2ExRXdhekpUVjNCS1pEQXhjVkZZVWs1U1IwNHdWRlpTVGxvd01WVlJWRnBQVWtWRk1sUnJVazVoVlhoRVUyMTBZVll6YUhOYVJXUlhZVEZuZVZKcVFrcGhia0l4V2taa05HTXdlRVJUYmtKYVYwWkdjRlF5Y0VaTlZUbFZWVlJLVGxaRlZYcFVXSEJMVDFNME1tTlVUbXRQUkVvMVl6SlNhbFZZYURCVlIyUllWRWhCTlUxWFpIRlVWR1JLWXpGU2NWRjZUWGRUU0hCR1QxVkplbEZYZEZST1ZYaHVTV2wzYVdNelVtaGtTRlo2U1dwdmQweERTbmxpTW5oc1dESnNhMGxxYjNoTVEwcHJZVmhhY0dNeWJIWmliRGx3V2tOSk5rNURkMmxaTW13d1pWWTVjRnBEU1RaaWJsWnpZa04zYVdGWFVXbFBhbFZ6U1c1V01XRlhVV2xQYVVwcFdUSkZNMWxxU1RCTmFURnFUbGRWTkV4VVVtbGFWMVYwVDFSRk1rNURNV2xOUkdob1dtcG9iRTlVV1hoT2FrRnBURU5LYW1OdFZtaGtSMVpyV0RKR01FbHFiMmxOYWtGNVRVTXdkMDU1TUhoTmVVRjRUVVJ2ZVU5VWJ6RlBVMGx6U1c1V2QxcEhSakJhVjFKbVdWaFJhVTlwU1hsTlJFbDNURlJCTTB4VVJYcEpSRVYzVDJwUmVVOXFSWHBKYVhkcFdrZFdjMXBZVW14YVJqbG9aRU5KTm1KdVZuTmlRM2RwWVZkR01FbHFiM2hPVkdzd1RtcEZlVTE2UlRObVVTNUZlVnBoWkhCM1ZsZzJRbmQwZWpsMWIycGxibEJQTWtkWmRUUlJOM1JtVVdoV1REVlBkWFozVVZjMElpd2ljM1JoZEhWeklqb3dMQ0p5YjJ4bFgybGtJam94TENKa2FYWnBjMmx2Ymw5cFpDSTZOQ3dpWTJsMGVWOXBaQ0k2Ym5Wc2JDd2lhV1FpT2pVc0luVjFhV1FpT2lKaVkyRTNZakkwTWkxak5XVTRMVFJpWldVdE9URTJOQzFpTURoaFpqaGxPVFl4TmpBaUxDSmpjbVZoZEdWa1gyRjBJam9pTWpBeU1DMHdOeTB4TXlBeE1Eb3lPVG8xT1NJc0luVndaR0YwWldSZllYUWlPaUl5TURJd0xUQTNMVEV6SURFd09qVXhPalUzSWl3aVpHVnNaWFJsWkY5aGRDSTZiblZzYkN3aWFXRjBJam94TlRrME5qRXlNemMwZlEuZ0pfSXk5NFdvOXJXU1pacjVOekhnNnAxYTZEZEtnY1RwQlk5dGFvVXhzQSIsInN0YXR1cyI6MCwicm9sZV9pZCI6MSwiZGl2aXNpb25faWQiOjQsImNpdHlfaWQiOm51bGwsImlkIjo1LCJ1dWlkIjoiYmNhN2IyNDItYzVlOC00YmVlLTkxNjQtYjA4YWY4ZTk2MTYwIiwiY3JlYXRlZF9hdCI6IjIwMjAtMDctMTMgMTA6Mjk6NTkiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNy0xMyAxMDo1Mjo1NCIsImRlbGV0ZWRfYXQiOm51bGwsImlhdCI6MTU5NTY4NjkyMn0.ds1P_Jkzg-UVcBm2vhFUYD8UNyDcRpsF0zm9xRw_H4M'
          }
        }
      )
      .then(response => {
        let res = response.data
        return {
                data: res.data,
                meta: res.meta
              };
      })
      .then(res => {
        this.setState({
          items: res.data,
          selectedItems: [],
          totalPage: res.meta.page,
          totalItemCount: res.meta.per_page,
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
            heading="menu.data-list"
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
          <Row>
            {this.state.items.map(product => {
                return (
                  <DataListView
                    key={product.id}
                    product={product}
                    isSelect={this.state.selectedItems.includes(product.id)}
                    onCheckItem={this.onCheckItem}
                    collect={collect}
                  />
                );
            })}{" "}
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
export default DataListPages;
