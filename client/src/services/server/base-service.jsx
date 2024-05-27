import Axios from 'axios';
import configData from '../../config.json';

const SERVER_URL = configData.SERVER_URL;

async function processRequest(promise) {
  return new Promise(function (resolve, reject) {
    promise
      .then((response) => {
        if (response.status && response.status === 200) {
          return response.data;
        } else {
          reject({ message: 'Unhandled error.'});
        }
      })
      .then((data) => {
        resolve(data);        
      })
      .catch((error) => {
        if (error.code && error.response) {
          return { message: error.response.data, status: error.response.status, statusText: error.response.statusText };
        } else {
          return {message: error.toString()};
        }
      })
      .then((errorData) => {
        if (errorData) {
          reject(errorData);
        }
      });
  });
}

export async function get(url, body, config) {
  return await processRequest(Axios.get(SERVER_URL + url, body, config));
}

export async function findById(url, id) {
  return get(url + '/' + id);
}

export async function post(url, body, config) {
  return await processRequest(Axios.post(SERVER_URL + url, body, config));
}

export async function postPaginator(url, pageFrom, pageSize, projectionFieldsParam, filtersParam) {
  var formdata = { pageFrom, pageSize }

  if (projectionFieldsParam) {
    var projectionFields = ['id']
    
    projectionFieldsParam.forEach((projectionField) => {
      projectionFields.push(projectionField);
    });
  
    formdata.projectionFields = projectionFields;
  }

  formdata.filters = filtersParam;
  
  return post(url, formdata);
}

export async function put(url, body, config) {
  return await processRequest(Axios.put(SERVER_URL + url, body, config));
}

export async function remove(url, id) {
  return await processRequest(Axios.delete(SERVER_URL + url + '/' + id));
}
