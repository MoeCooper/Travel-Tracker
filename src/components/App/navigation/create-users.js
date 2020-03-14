import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: "",
        }
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        console.log(user);

        //our data gets posted to backend endpoint, 
        //refers to users.js in routes folder
        axios.post('http://localhost:3000/users/add', user)
            .then(res => console.log(res.data));
        this.setState({
            username: ""
        })
        alert("User was added")
    }

    render(){
        return (
            <div>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>User Name to store:</label>
                       <input type="text"
                       required
                       className="form-control"
                       value={this.state.username}
                       onChange={this.onChangeUsername}
                       />
                   </div>

                   <div className="form-group">
                        <input type="submit" value="new stored country" className="btn btn-primary" />
                   </div>
               </form>
            </div>
        )
    }
}