import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class EditCountry extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            countryCity: "",
            lengthOfStay: 0,
            wouldVisitAgain: "",
            date: new Date(),
            users: []
        }
    }

    //lifecycle method. 
    //called before anything is displayed on the page
    componentDidMount = () => {

        axios.get('http://localhost:3000/countries/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    countryCity: response.data.countryCity,
                    lengthOfStay: response.data.lengthOfStay,
                    wouldVisitAgain: response.data.wouldVisitAgain,
                    date: new Date(response.data.date),
                })
            })
        .catch(function(error) {
            console.log(error.response)
        })

        axios.get('http://localhost:3000/users/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })
    }

    onChangeUsername = (e) => {
        this.setState({
            //e is what we are typing
            //target is the textbox, 
            //value is the value of the txtbox
            username: e.target.value
        })
    }

    onChangeCity = (e) => {
        this.setState({
            countryCity: e.target.value
        })
    }

    onChangeLengthOfStay = (e) => {
        this.setState({
            lengthOfStay: e.target.value
        })
    }

    onChangeVisitAgain = (e) => {
        this.setState({
            wouldVisitAgain: e.target.value
        })
    }

    onChangeDate = (date) => {
        this.setState({
            date: date
        })
    }

    //when submit buton is clicked
    onSubmit = (e) => {
        //prevents default html form from taking place
        e.preventDefault();

        const country = {
            username: this.state.username,
            countryCity: this.state.countryCity,
            lengthOfStay: this.state.lengthOfStay,
            wouldVisitAgain: this.state.wouldVisitAgain,
            date: this.state.date,
        }

        // const options = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // };

        console.log(country);

        axios.post('http://localhost:3000/countries/update/'+this.props.match.params.id, country)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });

        // async function makePostReqest(){
        //     await axios.post('http://localhost:3000/countries/add',country)
        // }

        // makePostReqest().then((res) => console.log(res.data));

        alert("City added!")
        //takes user back to homepage
        //window.location = '/';
        this.setState({
            username: "",
            countryCity: "",
            lengthOfStay: "",
            wouldVisitAgain: "",
            date: ""
        })
    }

    render(){
        return (
            <div>
                <h3>Edit Country Log~</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User Name </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map((user) => {
                                        return <option
                                        key={user}
                                        value={user}>{user}</option>
                                    })
                                }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Country City </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.countryCity}
                        onChange={this.onChangeCity} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Length of your Stay? </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.lengthOfStay}
                        onChange={this.onChangeLengthOfStay} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Would you visit again? </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.wouldVisitAgain}
                        onChange={this.onChangeVisitAgain} 
                        />
                    </div>

                    <div className="form-group">
                        <label>First Day of Stay </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" 
                        value="Edit Country Log"
                        className=" btn btn-secondary" />
                    </div>
                </form>
            </div>
        )
    }
}