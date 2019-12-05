import { ADD_ARTICLE, USER_LOGIN, ASSIGN_DATA, SHOW_DATA } from "../constants";
import AuthService from '../services/AuthService';

const Auth = new AuthService();

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

// regular Fetch
/* export function getData() {
  return function(dispatch) {
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "DATA_LOADED", payload: json });
      });
  };
} */

export function getData() {
  // return { type: "DATA_REQUESTED" };
  return function (dispatch) {
    /* return fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "DATA_LOADED", payload: json });
      }); */
    return new Promise((resolve,reject)=>{
      fetch('http://localhost:11003/v1/mylist', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': Auth.getToken()
        }
      })
        .then(response => response.json())
        .then(json => {

          dispatch({ type: "DATA_LOADED", payload: json.data });
          resolve(json);
        })
        .catch(err=>{
          reject(err)
        });
    }) 
  }
}

export const storeData = (payload) => (dispatch) => {

  // coba di console log
  const { name, tanggal } = payload;
  fetch('http://localhost:11003/v1/mylist', {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-api-key': Auth.getToken()
    },
    body: "data={\"namaaktivitas\":\"" + name + "\",\"tanggal_aktivitas\":\"" + tanggal + "\"}"
  })
    .then(response => response.json())
    .then(data => {
      console.log('daata posted')
    })
}

export const editDataAPI = (payload) => (dispatch) => {

  // coba di console log
  console.log(payload)
  const { name, tanggal } = payload;
  fetch(`http://localhost:11003/v1/mylist/${name}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-api-key': Auth.getToken()
    },
    body: "data={\"namaaktivitas\":\"" + name + "\",\"tanggal_aktivitas\":\"" + tanggal + "\"}"
  })
    .then(response => response.json())
    .then(data => {
      console.log('daata EDIIIT')
    })
}

export const deleteDataAPI = (payload) => (dispatch) => {
  // const {name} = payload
    fetch(`http://localhost:11003/v1/mylist/${payload}`, {
      method: "DELETE",
      headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-api-key': Auth.getToken()
        }
    })
    .then(res=>res)
    .then(res=>{
      alert(`shes gone -${payload}`);
    })
        
}

export const loginUserAPI = (email, password) => (dispatch) => {

  dispatch({ type: USER_LOGIN, payload: true });
  return new Promise((resolve, reject) => {
    console.log('login user api', email, password)

    Auth.login(email, password)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}
export const assignArticleState = (/* data, */ payload) => (dispatch) => {
  dispatch({ type: ASSIGN_DATA, payload: payload});
  return null;
}
// export const assignArticleState = (data, payload) => (dispatch) => {
//   // console.log('payload:', payload)
//   return dispatch({ type: ASSIGN_DATA, payload: payload });

//   const storeData = data.filter(val => val == payload);
//   console.log(storeData)
// }