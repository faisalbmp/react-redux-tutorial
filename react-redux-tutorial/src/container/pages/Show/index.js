import React , {Component} from 'react';
import { assignArticleState } from '../../../config/redux/actions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

class Show extends Component{
    componentDidMount(){
        const {assignData,match} = this.props;
        assignData(this.props.match.params.name);
    }
    render(){
        const {article,history} = this.props;
        console.log(article)
        return(
            <div className="layout-container">
                <div className="header">
                    <h2 className="title">Lihat Data</h2>
                    <hr />
                </div>
                    {
                        article?
                    <div className="content">
                        <p className="name">Aktivitas : {article.name}</p>
                        <p className="name">Tanggal :  {article.Tanggal_Aktivitas}</p>
                        <button className='btn-edit' onClick={()=>history.push('/edit')}>EDIT</button>
                    </div>
                        :null
                    }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>({
    assignData: (data)=>dispatch(assignArticleState(data))
})

const mapStateToProps = (state)=>({
    article: state.showArticles
})

export default connect(mapStateToProps,mapDispatchToProps)(Show);