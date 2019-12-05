import React, { Component } from 'react';
import { connect } from "react-redux";
// import withAuth from './withAuth'
// import axios from 'axios'

import { Link } from 'react-router-dom';
import { storeData } from '../../../config/redux/actions';
import AuthService from '../../../config/redux/services/AuthService';


const Auth = new AuthService();
const mapStateToProps = state => {
    return { dataLists: state.dataLists };
};
const mapDispatchToProps = (dispatch)=> {
    return {
        saveData: (dataLists) => dispatch(storeData(dataLists))
    };
}
class Add extends Component {

    state = {
        name: '',
        tanggal: ''
    }


    handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { name, tanggal } = this.state;
        const data = {
            name: name,
            tanggal: tanggal
        }

        this.props.saveData(data)

        this.props.history.push('/');

    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label for="name">NAMA : </label>
                        <input type="text" className="form-control" name="name" onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label for="tanggal">Tanggal</label>
                        <input type="date" className="form-control" name="tanggal" onChange={this.handleChange}></input>
                    </div>
                    <button type="submit" class="btn btn-success">Submit</button>

                </form>
            </div>
        )
    }
}

// export default withAuth(Add);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Add);
