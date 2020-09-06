import React, {Component} from "react";
import "react-table/react-table.css";
import {Card, CardBody, CardTitle, Table} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";

import data from "../../data/products";
import {reactLocalStorage} from "reactjs-localstorage";

class BestSellers extends Component {
    constructor() {
        super();
        this.state = {
            selectAll: false,
            data: [],
            checked: [],
            detailBorrow: '',
            detailUser: '',
            dataTable: [],
            isLoading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSingleCheckboxChange = this.handleSingleCheckboxChange.bind(this);
        reactLocalStorage.set('module-action', 'peminjaman')
    }

    handleChange = () => {
        let selectAll = !this.state.selectAll;
        this.setState({selectAll: selectAll});
        let checkedCopy = [];
        this.state.data.forEach(function (e, index) {
            checkedCopy.push(selectAll);
        });
        this.setState({
            checked: checkedCopy
        }, () => {
            console.log(this.state.checked);
        });
    };

    handleSingleCheckboxChange = index => {
        var checkedCopy = this.state.checked;
        checkedCopy[index] = !this.state.checked[index];
        if (checkedCopy[index] === false) {
            this.setState({selectAll: false});
        }
        this.setState({
            checked: checkedCopy
        }, () => {
            console.log(this.state.checked);
        });
    };

    componentDidMount() {
        let module = reactLocalStorage.get('module')
        let recentDatas = reactLocalStorage.getObject(`recent-${module}`).hasOwnProperty('length') ? reactLocalStorage.getObject(`recent-${module}`) : window.location.reload()

        const dataEdited = data.slice(0, 12);
        let checkedCopy = [];
        let selectAll = this.state.selectAll;
        dataEdited.forEach(function (e, index) {
            checkedCopy.push(selectAll);
        });

        setTimeout(() => {
            this.setState({

                data: dataEdited,
                dataTable: recentDatas,
                checked: checkedCopy,
                selectAll: selectAll,
                isLoading: true
            })
        }, 350)
    }

    render(controls = true) {
        return !this.state.isLoading ? (
            <div className="loading"/>
        ) : (
            <Card className="h-100">
                <CardBody>
                    <CardTitle>
                        <IntlMessages id={"Riwayat Terbaru"}/>
                    </CardTitle>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>Kode</th>
                            <th>Nama Barang</th>
                            <th>Tanggal</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.dataTable && this.state.dataTable.map((listValue, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{listValue.asset_code}</td>
                                    <td>{listValue.asset_name}</td>
                                    <td>{listValue.created_at}</td>
                                    <td>{listValue.status}</td>
                                </tr>
                            );
                        })
                        }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }
}

export default BestSellers;
