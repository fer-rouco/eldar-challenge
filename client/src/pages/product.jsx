import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { findById, create, update } from '../services/server/product-service';
import Panel from '../components/containers/panel';
import { usePage } from '../contexts/page-context';
import InputField from '../components/controls/fields/input-field';
import SubmitButton from '../components/controls/buttons/submit-button';
import Button from '../components/controls/buttons/button';
import { useNavigate } from 'react-router-dom';
import { useAlertMessage } from '../contexts/alert-message-context';
import storageManagerService from "../services/storage/storage-manager-service";
import { STORAGE_SESSION_IDENTIFIER } from '../services/storage/storage-constants';

const sessionStorageService = storageManagerService(true);

const Product = ({ hideTitle }) => {
  const navigate = useNavigate();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();

  const {id, isCreatePageType, isEditPageType, isViewPageType} = usePage();

  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (!isCreatePageType()) {
      findById(id).then((product) => {
        setCategory(product.category);
        setDescription(product.description);
        setPrice(product.price);
      });
    }
  }, [id]);

  const actionLabel = () => {
    return (isCreatePageType()) ? 'Create' : 'Update';
  }

  const handleCancelClick = () => {
    console.log("Cancel")
    navigate('/Products');
  }

  const build = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-6">
            <InputField attr='category' type='text' label='Category' value={category} onChange={event => setCategory(event.target.value)} ></InputField>
          </div>
          <div className="col-sm-6 col-md-6">
            <InputField attr='description' type='text' label='Description' value={description} onChange={event => setDescription(event.target.value)} ></InputField>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6">
            <InputField attr='price' type='number' label='Price' value={price} onChange={event => setPrice(event.target.value)} ></InputField>
          </div>
        </div>
        { isViewPageType() ||
          <div className="row">
            <div className="col-sm-6 col-md-6">
              <Button label='Cancel' className="w-100" large onClick={handleCancelClick} ></Button>
            </div>
            <div className="col-sm-6 col-md-6">
              <SubmitButton label={actionLabel()} className="w-100" large ></SubmitButton>
            </div>
          </div>
        }
      </div>
    )
  }

  const buildForm = () => {
    const buildObjectModel = () => {
      let user_id = sessionStorageService.getItem(STORAGE_SESSION_IDENTIFIER)?._id;
      let objectModel = { category, description, price, user_id };
      return (isEditPageType()) ? { _id: id, ...objectModel } : objectModel;
    }

    const submit = async (event) => {
      event.preventDefault();

      let action = '';
      try {
        if (isCreatePageType()) {
          action = 'created';
          await create(buildObjectModel());
        }
        else if (isEditPageType()) {
          action = 'updated';
          await update(buildObjectModel());
        }
        addSuccessMessage(`Product ${action} successfully`);
        navigate('/Products');
      }
      catch(error) {
        addErrorMessage(`Error trying to ${actionLabel().toLowerCase()} a product`);
      }

    }

    return (
      <form onSubmit={submit}>
        {build()}
      </form>
    )
  }

  return (
    <Panel title={`${actionLabel()} Product`.trim()} size='medium' hideTitle={hideTitle} >
      {(isViewPageType()) ? build() : buildForm()}
    </Panel>
  )
};

Product.propTypes = {
  hideTitle: PropTypes.bool
};

export default Product;
