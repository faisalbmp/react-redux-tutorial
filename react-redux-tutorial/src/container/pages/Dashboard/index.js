import React from 'react';
import AuthService from '../../../config/redux/services/AuthService'
import { connect } from 'react-redux';
import { getData, assignArticleState } from "../../../config/redux/actions/index";

const Auth = new AuthService();

class Dashboard extends React.Component{

  handleLogout= () => {
      // console.log("dead man",this.props.history)
      Auth.logout()
      this.props.history.replace('/login');
    }

  handleAddList = () => {
    this.props.history.push('/add')
  }

/*   componentDidMount(){
    const {history} = this.props;
    if (!this.props.isLoggedIn) {
      history.replace('/login');
    }
  } */
  
  componentDidMount() {
    this.props.getData()
    .then((res)=>{
     
      console.log("lihat data",this.props.articles);
    })
    
  }

  handleListClick = (/* data, */name)=>{
    const {assignArticleState,history} = this.props;
    history.push(`/show/${name}`)
    // assignArticleState(payload)
  }

  render(){
    const {articles} = this.props;
    const {handleListClick} = this;
    return(
      <div className="App">
        
        <p className="App-intro">
          <button type="button" className="form-submit" onClick={this.handleLogout}>Logout</button> &nbsp;
          <button type="button" className="form-submit" onClick={this.handleAddList}>Add List</button>
        </p>
        <div>
          <h2>API posts</h2>
          {/* <Post /> */}
          <ul>
            {articles && articles.map((el,i) => (
              <li className="list-content" onClick={()=>handleListClick(/* articles, */el.name)}  key={i}>{el.name}</li>
            ))}
          </ul>
        </div>
      </div>
  )};
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  articles: state.remoteArticles
})



export default connect(mapStateToProps,  
  { getData,assignArticleState }
)(Dashboard);
