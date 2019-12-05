import React, { Component } from "react";
import { connect } from "react-redux";
import { getData, assignArticleState,loginUserAPI } from "../../../config/redux/actions/index";
import './Posts.css'

export class Post extends Component {

  state = { 
    dataList: [],
  }
  
  componentDidMount() {
    this.props.getData();
    setTimeout(() => {
      if (this.props.articles && this.props.articles.length > 0) {
      console.log("lihat data",this.props.articles);
      this.setState({
        dataList: this.props.articles[0].data
      })
    }
    console.log(this.state.articles)
    }, 100)
  }

  handleOnClick = (data,name)=>{
    this.props.assignArticleState(data,name);
  } 
  render() {
    
    return (
      <ul>
        {this.state.dataList && this.state.dataList.map((el,i) => (
          <li className="list-content"  key={i} onClick={this.handleOnClick(this.state.dataList,el.name)}>{el.name}</li>
        ))}
      </ul>
    );
  }
}
function mapStateToProps(state) {
  return {
    articles: state.remoteArticles
  };
}

export default connect(
  mapStateToProps,
  { getData,assignArticleState ,loginUserAPI}
)(Post);