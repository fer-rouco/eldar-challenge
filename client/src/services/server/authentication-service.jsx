import { get, post } from './base-service';
// import jsSHA from 'jssha';
import storageManagerService from "../storage/storage-manager-service";
import { STORAGE_SESSION_IDENTIFIER } from '../storage/storage-constants';

const BASE_URL = 'api/auth';
const sessionStorageService = storageManagerService(true);

// export async function getSessionInfo() {
//   return get(BASE_URL);
// }

export async function logIn(user, password) {
  // const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
  // shaObj.update(password);
  // const hashedPassword = shaObj.getHash('HEX');

  return post(BASE_URL + '/login', {
    // params: { userName: user, password: hashedPassword },
    // params: { email: user, password: password },
    email: user, password: password 
  }).then((session) => {
    sessionStorageService.setItem(STORAGE_SESSION_IDENTIFIER, session);
    return session;
  });

  // try {
  //   const url = await post(BASE_URL + '/login', {
  //     // params: { userName: user, password: hashedPassword },
  //     email: user, password: password 
  //   });
  //   sessionStorageService.setItem(STORAGE_SESSION_IDENTIFIER, url);
  //   return url;
  // } catch (e) {
  //   console.error("ERROR: ", e);
  // }
}

export async function logOut() {
  return get(
    BASE_URL + '/logout'
  ).then((session) => {
    sessionStorageService.removeItem(STORAGE_SESSION_IDENTIFIER);
    return session;
  });
}

export async function validateSession(token) {
  const headers = {
    'Content-Type': 'text/plain'
  }
  return post(
    BASE_URL + '/validate', token, { headers: headers }
  ).then((session) => {
    return session;
  });
}

export function getCurrentSession() {
  return sessionStorageService.getItem(STORAGE_SESSION_IDENTIFIER);
}
