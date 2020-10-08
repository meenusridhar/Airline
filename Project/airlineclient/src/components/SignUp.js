import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import UINotify from 'devextreme/ui/notify';
const API_URL = "http://localhost:3008/";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state={
        selectedInputs:[],
        SpinnerLoading:false
        }
    
    }

    onValueChanged = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        // 1. Make a shallow copy of the items
        let items = [...this.state.selectedInputs];
        // 2. Make a shallow copy of the item you want to mutate
        if (items.find(x => x.name == name) != undefined) {
            let item = items.find(x => x.name == name);
            item.val = value;
            this.setState({ selectedInputs: items });
        }
        else {
            //let arry = []
            items.push({ "name": name, "val": value })
            this.setState({ selectedInputs: items });
        }
        this.setState(prevState => (
            { selectedInputs: items }));
    };
    
    showValue = (name) => {
        if (this.state.selectedInputs.find(x => x.name == name) != null) {
            return this.state.selectedInputs.find(x => x.name == name).val;
        }
        else
            return "";
    };

    handleSubmit =(e) =>{
        this.setState({ SpinnerLoading: true });
        let email ='';
         if (this.state.selectedInputs.find(x => x.name == 'email') != null) {
            email= this.state.selectedInputs.find(x => x.name == 'email').val;
        }
        var d=this.state.selectedInputs;
        axios.post(API_URL + "user",{ d, headers: { 'Content-Type': 'application/json' }})
            .then(response => {
                this.setState({ SpinnerLoading: false });
                UINotify(response.data.Message, response.data.MsgType, response.data.MsgTime);
                this.form.reset();
            });
    };
    render() {
        return (
<>
            <div className="auth-wrapper mt-10">
                <div className="auth-inner">
                    <form ref={form => this.form = form}>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" id="FirstName" name="FirstName" className="form-control" placeholder="first name" autoComplete="off"  onChange={this.onValueChanged} />
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" id="LastName" name="LastName"  className="form-control" placeholder="last name" autoComplete="off"  onChange={this.onValueChanged}/>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" id="email" name="email"  className="form-control" placeholder="email" autoComplete="off" onChange={this.onValueChanged} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" id="password" name="password"  className="form-control" placeholder="password" autoComplete="off" onChange={this.onValueChanged}/>
                        </div>

                        <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered ?<Link to="/Login">Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>

          </>  
        );
    }
}
export default SignUp;