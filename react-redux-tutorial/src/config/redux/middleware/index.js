import { ADD_ARTICLE, LOGIN_PAGE } from "../constants";
import AuthService from "../services/AuthService";
import { push } from "connected-react-router";
// import {browserHistory} from 'react-router'

const forbiddenWords = ["spam", "money"];

const auth = new AuthService();

export function forbiddenWordsMiddleware(store) {
  return function(next) {
    return function(action) {
      // do your stuff
      if (action.type === ADD_ARTICLE) {
        const foundWord = forbiddenWords.filter(word =>
          action.payload.title.includes(word)
        );
        if (foundWord.length) {
          return store.dispatch({ type: "FOUND_BAD_WORD" });
        }
        console.log('mix max',window.location.pathname,LOGIN_PAGE);
        // store.dispatch(push("/not-found"));
        // browserHistory.replace({pathname: LOGIN_PAGE});

      }
      if (window.location.pathname !== LOGIN_PAGE ) {
      }
      return next(action);
      console.log('welcome in the cruel whting')

      // console.log("current location:",window.location.pathname)
    };
  };
}