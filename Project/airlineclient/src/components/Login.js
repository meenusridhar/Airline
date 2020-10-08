
//#region Import statements
import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import UINotify from 'devextreme/ui/notify';
import { LoadPanel } from 'devextreme-react/load-panel';


//#endregion

const API_URL = "http://localhost:3008/";
//#region Login class component
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            SpinnerLoading: false,
            FlightData:[],
            userData:"",
            ShowSignUp:false,
            accessToken:''
        }
    }
    //#region Event Handlings
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ SpinnerLoading: true });
        var inputObj = {
            email: this.state.email,
            password: this.state.password
        }
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: inputObj
        };

        axios.get(API_URL + "auth/login?email="+this.state.email, requestOptions)
            .then(response => {
                if(response.data.MsgType=="error"){
                    this.setState({ SpinnerLoading: true , ShowSignUp:true});
                    UINotify("Please register...",response.data.MsgType,3000);
                }
                else
                {
                    debugger;
                    this.setState({ SpinnerLoading: false, accessToken:response.data.accessToken});
                    localStorage.setItem('accessToken',response.data.accessToken);
                    this.props.history.push("/Flights");
                }
               
            });
    }
    //#endregion

    //#region  React render Method
    render() {
        let UserRole = this.state.userData;
        console.log(UserRole);
        return (
            <div>
                <LoadPanel
                    shadingColor="rgba(0,0,0,0.4)"
                    visible={this.state.SpinnerLoading}
                    showIndicator={true}
                    shading={true}
                    showPane={true}
                    closeOnOutsideClick={false}
                />
                <div className="auth-wrapper mt-10">
                <div className="auth-inner">
                    <form>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" id="email" className="form-control" placeholder="Enter email" autoComplete="off" onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder="Enter password" autoComplete="off" onChange={this.handleChange}/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Sign In</button>
                        <p className="forgot-password text-right">
                            New User ? <Link to="/SignUp">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>

            </div>  
        )
    }
     //#endregion
}
//#endregion
export default Login;