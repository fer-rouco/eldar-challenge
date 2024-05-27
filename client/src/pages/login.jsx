import React, { useState } from 'react';

import { logIn } from '../services/server/authentication-service';
import { useNavigate } from 'react-router';
import SubmitButton from '../components/controls/buttons/submit-button';
import { useAlertMessage } from '../contexts/alert-message-context';
import Panel from '../components/containers/panel';
import InputField from '../components/controls/fields/input-field';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();

  const doLogin = (event) => {
    // if (email && password) {
      logIn(email, password)
        .then(() => {
          addSuccessMessage('Te logueaste exitosamente!');
          navigate('/Products');
        })
        .catch((error) => {
          console.log('Error...')
          // addFieldError(error.field, error.message);
          addErrorMessage(error.message);
        });
    // }

    event.preventDefault();
  };

  return (
    <div className='center'>
      <Panel title='Login' size='small' >
        <form onSubmit={doLogin}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-8 col-md-8">
                <InputField attr='email' type='email' label='Email' onChange={event => setEmail(event.target.value)} ></InputField>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-8 col-md-8">
                <InputField attr='password' type='password' label='Password' onChange={event => setPassword(event.target.value)} ></InputField>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-6 col-md-6">
                <SubmitButton label='Log In' className="w-100" large ></SubmitButton>
              </div>
            </div>
          </div>
        </form>
      </Panel>
    </div>
  )
};
export default Login;
