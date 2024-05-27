import { get, post, postPaginator, put, remove as removeById } from './base-service';

const BASE_URL = 'api/product';

export async function findById(id) {
  return get(BASE_URL + '/' + id);
}


export async function getAll(user_id) {
  return get(`${BASE_URL}/user/${user_id}`, user_id);
}

export async function findAll(pageFrom, pageSize, projectionFields, filters) {
  return postPaginator(BASE_URL, pageFrom, pageSize, projectionFields, filters);
}

export async function create(updateObject) {
  return post(BASE_URL + '/create', updateObject);
}

export async function update(updateObject) {
  return put(BASE_URL + `/update/${updateObject._id}`, updateObject);
}

export async function remove(userId) {
  return removeById(BASE_URL, userId);
}
