import React, { useEffect, useState } from 'react';
import { getAll, remove } from '../services/server/product-service';
import Icon from '../components/general/icon';
import { Link } from 'react-router-dom';
import { useAlertMessage } from '../contexts/alert-message-context';
import Panel from '../components/containers/panel';
import { usePage } from '../contexts/page-context';
import Product from './product';
import Modal from '../components/general/modal';
import storageManagerService from "../services/storage/storage-manager-service";
import { STORAGE_SESSION_IDENTIFIER } from '../services/storage/storage-constants';

const sessionStorageService = storageManagerService(true);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const {setId, setCreatePageType, setEditPageType, setViewPageType} = usePage();

  useEffect(() => {
    fetchProducts();
 
    return () => {
      setProducts([]);
    };
  }, []);

  const fetchProducts = () => {
    const sessionObject = sessionStorageService.getItem(STORAGE_SESSION_IDENTIFIER);
    let user_id = sessionObject?._id;
    getAll(user_id).then((products) => {
      setProducts(products);
    });
  }

  const createProduct = () => {
    setId(-1);
    setCreatePageType();
  }

  const editProduct = (id) => {
    setId(id);
    setEditPageType();
  }

  const viewProduct = (id) => {
    setId(id);
    setViewPageType();
    setModalShow(true);
  }

  const removeProduct = (product) => {
    console.log(`Removing Product/${product._id}`);
    remove(product._id).then(() => {
      addSuccessMessage('Product removed successfully!');
      fetchProducts();
    }).catch(() => {
      addErrorMessage(`Error trying to remove the product ${product.description}`);
    });
  }

  const isAdmin = () => {
    let sessionObject = sessionStorageService.getItem(STORAGE_SESSION_IDENTIFIER);
    if (sessionObject) {
      return sessionObject.profile === 'admin';
    }

    return false;
  }

  return (
    <>
      <Panel title='Products' size='large' >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">
                <Link to={{ pathname: `/Product` }} onClick={() => createProduct()} >
                  <Icon fontName='plus-square-dotted' ></Icon>
                </Link>
              </th>
              <th scope="col"></th>
              { !isAdmin() ||
                <th scope="col"></th>
              }
            </tr>
          </thead>
          <tbody>
            {
              products.map((product) => (
                <tr key={product._id} >
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  { !isAdmin() ||
                    <td>
                      <Link to={{ pathname: `/Product` }} onClick={() => editProduct(product._id)} >
                        <Icon fontName='pencil-square' ></Icon>
                      </Link>
                    </td>
                  }
                  <td>
                    <div onClick={() => viewProduct(product._id)} data-bs-target=".modal" data-bs-toggle="modal">
                      <Icon fontName='eye' ></Icon>
                    </div>
                  </td>
                  { !isAdmin() ||
                    <td>
                      <Icon fontName='trash3' onClick={() => removeProduct(product)} ></Icon>
                    </td>
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </Panel>
      <Modal title='Product' show={modalShow} >
        { !modalShow ||
          <Product hideTitle ></Product>
        }
      </Modal>
    </>
  )
};
export default Products;
