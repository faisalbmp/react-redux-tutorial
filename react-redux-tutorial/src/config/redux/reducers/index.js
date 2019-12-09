  import { ADD_ARTICLE ,DATA_LOADED, DATA_STORED, USER_LOGIN, SHOW_DATA, ASSIGN_DATA} from "../constants";

const initialState = {
  articles: [],
  remoteArticles: [],
  dataLists:[],
  isLoggedIn: false,
  showArticles:{}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ARTICLE:
     
      return Object.assign({}, state, {
        articles: state.articles.concat(action.payload)
      });
    
    case DATA_LOADED:
     
      return {
        ...state,
        remoteArticles: action.payload
      };

    case DATA_STORED:
      
      return Object.assign({},state,{
        dataLists: state.dataLists.concat(action.payload)
      });

    case USER_LOGIN:
      
      return {
        ...state,
        isLoggedIn: action.payload
      }

    case SHOW_DATA:
      
      return {
        ...state,
        showArticles: action.payload
      }
    
    case ASSIGN_DATA:
      const storeData = state.remoteArticles.filter(val => {
        return val.name == action.payload
      })
      const data = storeData[0]

      return{
        ...state,
        showArticles: data
      }


    default:
      return state;
  }
}
export default rootReducer;