import { API } from "../configs/constant";


function generalUrl(url) {
  const baseURL = API  + url;
  return {
    baseURL,
  };
}

const get = (url, options = {}, token = null) => {
  console.log(url);
  return new Promise((resolve, reject) => {
    const {baseURL} = generalUrl(url);
    const contentType = 'application/json'
    console.log(baseURL);
    fetch(baseURL, {
      ...options,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': contentType,
      },
    })
      .then(res => res.json())
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

const post = (url, data, method = 'POST', token) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    const {baseURL} = generalUrl(url);
    console.log(baseURL);
    const contentType = 'application/x-www-form-urlencoded';

    fetch(baseURL, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': contentType,
      },
      body: data,
    })
      .then(res => res.json())
      .then(dataApi => {
          resolve(dataApi);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export default {
  get,
  post,
  put: (url, data, token) => post(url, data, 'PUT', token),
};
