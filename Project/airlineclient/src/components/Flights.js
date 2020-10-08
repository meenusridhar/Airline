import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import DataGrid, { Column, Editing, Paging, HeaderFilter, FilterRow } from 'devextreme-react/data-grid';
import axios from 'axios';
import UINotify from 'devextreme/ui/notify';
import { LoadPanel } from 'devextreme-react/load-panel';
const API_URL = "http://localhost:3008/";

class Flights extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            Source: [],
            SpinnerLoading: false,
            accessToken: '',
            userrole:''
        }
        this.onContentReady = this.onContentReady.bind(this);
        this.onRowInserted = this.onRowInserted.bind(this);
        this.onRowRemoving = this.onRowRemoving.bind(this);
    }

    componentDidMount() {
        //Life Cycle method to get the list of flights after verifying the user
        let accessToken = localStorage.getItem('accessToken');
        const accheaders = {
            'accesstoken': accessToken
        }
        axios.get(API_URL + "airline/list", { headers: accheaders })
            .then(response => {
                console.log(response);
                debugger;
                this.setState({ Source: response.data.FlightDet , userrole:response.data.role.role});

            });

    }
    //Insert function call- Insert the flight records 
    onRowInserted(e) {
        this.setState({ SpinnerLoading: true });
        var d = e.data;
        axios.post(API_URL + 'airline/insert', { d, headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                this.setState({ FlightData: response.data.FlightDet });
                this.setState({ SpinnerLoading: false });
                UINotify(response.data.Message, response.data.MsgType, response.data.MsgTime);
            });
    }
//Delete function - delete the flight records 
    onRowRemoving(e) {
        this.setState({ SpinnerLoading: true });
        var d = e.data;
        axios.delete(API_URL + "airline/delete?id=" + e.data._id, { d, headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                this.setState({ FlightData: response.data.FlightDet });
                this.setState({ SpinnerLoading: false });
                UINotify(response.data.Message, response.data.MsgType, response.data.MsgTime);
            });
    }
    onContentReady(e) {
        var currentColumns = e.component.getVisibleColumns();
        for (var i = 0; i < currentColumns.length; i++) {
            if (typeof currentColumns[i].dataField != "undefined") {
                if (currentColumns[i].dataField === "_id") {
                    //Code to hide the ID column in the grid 
                    e.component.columnOption(currentColumns[i].dataField, "visible", false);
                }
            }
        }

    }

    onEditorPreparing = (e) => {
        if (e.parentType == "dataRow" && e.dataField === "_id") {
            e.editorOptions.visible = false;
            e.editorOptions.disabled = true;

        }
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/Login"}>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container-fluid" style={{ marginTop: "5%" }}>
                    <h2>Flights</h2>
                    <div className="row" >
                        <div className="col-12 ">
                            <DataGrid dataSource={this.state.Source} onRowInserted={this.onRowInserted} onRowRemoving={this.onRowRemoving} onContentReady={this.onContentReady} onEditorPreparing={this.onEditorPreparing}>
                                <Editing allowAdding={true} allowDeleting={((this.state.userrole=="admin") ? true:false)} mode={"form"} useIcons={true} />
                                <HeaderFilter visible={true} />
                                <FilterRow visible={true} />
                                <Paging enabled={true} />
                            </DataGrid>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Flights;