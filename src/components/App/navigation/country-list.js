import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Country = props => {
    return(
        <tr>
            <td>{props.country.countryCity}</td>
            <td>{props.country.lengthOfStay}</td>
            <td>{props.country.wouldVisitAgain}</td>
            <td>{props.country.date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+props.country._id}>edit</Link> || <button onClick={() => { props.deleteCountry(props.exercise._id) }}>delete</button>
            </td>
        </tr>
    )
}

export default class CountryList extends Component {
    constructor(props){
        super(props)

        this.state = {
            countries: [],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3000/countries/')
            .then(response => {
                this.setState({ countries: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
            
    }

    deleteCountry(id){
        axios.delete('http:localhost:3000/countries/'+id)
            .then(res => console.log(res.data));

        this.setState({
            countries: this.state.countries.filter(element => element._id !== id)
        })
    }

    countryListing(){
        return this.state.countries.map(currCountry => {
            return <Country country={currCountry} deleteCountry={this.deleteCountry} key={currCountry._id}/>;
        })
    }

    render(){
        return (
            <div>
               <h3>Logged Cities</h3>
               <table className="thead-dark">
                   <tr>
                       <th>City</th>
                       <th>Length of Stay</th>
                       <th>Would You Visit Again</th>
                       <th>Day of Arrival</th>
                   </tr>
                   <tbody>
                       { this.countryListing() }
                   </tbody>
               </table>
            </div>
        )
    }
}