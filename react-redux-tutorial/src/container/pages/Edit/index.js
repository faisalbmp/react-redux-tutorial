import React from 'react';
// import withAuth from './withAuth';
import { Link } from 'react-router-dom';
import AuthService from '../../../config/redux/services/AuthService';
import { connect } from 'react-redux';
import { editDataAPI, deleteDataAPI } from '../../../config/redux/actions';

const Auth = new AuthService();

class Edit extends React.Component {

        state = {
            name: '',
            Tanggal_Aktivitas: ''
        }

    handleChange = (e)=> {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ board: state });
    }

    handleDelete = (id) => {
        const {deleteAPI}=this.props
        deleteAPI(id)
        this.props.history.push('/');

    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        const {article,updateAPI} = this.props;
        const data = this.state;
        updateAPI(data)
        // console.log("data=" + JSON.stringify({ "namaaktivitas": this.state.name }))
        // const { id } = this.props.match.params
        /* fetch(`http://localhost:11003/v1/mylist/${id}`,{
              method: "PUT",
              headers: {
                  // 'Content-Type': 'application/json',
                  // 'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'x-api-key': Auth.getToken()
              },
              body: "data={\"tanggal_aktivitas\":\""+this.state.tanggal_aktivitas+"\"}"     
              // body:JSON.stringify({"namaaktivitas":this.state.name})
          }) */
        // this.props.history.push('/');

    }
    componentDidMount() {
        const {name,Tanggal_Aktivitas} = this.props.article
        this.setState({
            name:name,
            Tanggal_Aktivitas:Tanggal_Aktivitas
        })
        // const myVar = this.props.match.params.id;
        /* if (this.props.match) {
            const { id } = this.props.match.params
            fetch(`http://localhost:11003/v1/mylist/${id}`, {
                method: "GET",
                headers: {
                    // 'Content-Type': 'application/json',
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-api-key': Auth.getToken()
                }
            })
                .then(response => response.json())
                .then(lists => {
                    this.setState({
                        name: lists.data.name,
                        tanggal_aktivitas: lists.data.tanggal_aktivitas
                    })
                    console.log(this.state.data)
                })
        } */

    }

    render() {
        const{name,Tanggal_Aktivitas} = this.state;
        return (
            <div className='container'>
                <form onSubmit={this.handleFormSubmit}>
                    {/* <div className="form-group">
                        <label for="name">NAMA : </label>
                        <input type="text" className="form-control" name="name" onChange={this.handleChange} value={this.state.name}></input>
                    </div> */}
                    <div className="form-group">
                        <label for="tanggal">Tanggal</label>
                        <input type="date" className="form-control" name="tanggal" onChange={this.handleChange} value={this.state.tanggal_aktivitas}></input>
                    </div>
                    <button type="submit" class="btn btn-success">Submit</button>

                </form>
                <button onClick={()=>this.handleDelete(name)} class="btn btn-danger">Delete</button>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    article: state.showArticles
})

const mapDispatchToProps = (dispatch) => ({
    updateAPI: (data) => dispatch(editDataAPI(data)),
    deleteAPI: (data) =>dispatch(deleteDataAPI(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit);