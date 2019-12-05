import React from 'react';
import AuthService from '../../../config/redux/services/AuthService'
import { loginUserAPI } from '../../../config/redux/actions';
import { connect } from 'react-redux';

class Login extends React.Component{

  state={
    email:'',
    password:'',
  }
    
   Auth = new AuthService();

  handleChange = (e) => {
      this.setState(
          {
              [e.target.name]: e.target.value
          }
      )
  }

  componentDidMount(){
    console.log('is login is:',this.props.isLogin)
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const {loginUser,history} = this.props;
    const {email,password} = this.state;

    loginUser(email,password)
    .then(res=>{
      console.log('you arr now login',this.props.isLogin);
      history.replace('/')
    })
    .catch(err=>{
      console.log(err)
    })

    /* const res = this.Auth.login(this.state.email,this.state.password)
    
    .then(res =>{
      console.log(res)
           this.props.history.replace('/');
        })
        .catch(err =>{
            alert(err);
        }) */
  }

  render(){
    return (
    <div>
      <form onSubmit={this.handleFormSubmit}> 
        <div className="form-group">
          <label for="email">username : </label>
          <input type="text" className="form-control" name="email" onChange={this.handleChange}></input>
        </div>
        <div className="form-group">
          <label for="password">Password : </label>
          <input type="text" className="form-control" name="password" onChange={this.handleChange}></input>
        </div>
        <div className="form-group">
        <button type="submit" class="btn btn-success">Submit</button>

        </div>
      </form>
    </div>
  )}
}
const mapDispatchToProps = (dispatch)=> ({
      loginUser: (email,password) => dispatch(loginUserAPI(email,password))
})

const mapStateToProps = (state)=>({
  isLogin: state.isLoggedIn
})

export default connect(mapStateToProps,mapDispatchToProps)(Login);
