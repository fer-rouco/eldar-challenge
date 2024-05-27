import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSession } from './../../services/server/authentication-service';
import { getCurrentSession } from './../../services/server/authentication-service';
import configData from './../../config.json';

const withAuth = (WrappedComponent) => {
  return function ProtectedRoutes(props) { 
    const navigate = useNavigate();

    useEffect(() => {
      const session = getCurrentSession();
      if (!configData.DEVELOP_MODE) {
        if (!session) {
          navigate('/Login');
        }
        // else {
        //   validateSession(session.token).then((result) => {
        //     // console.log("Valid session token: " + result.token);
        //   })
        //   .catch((error) => {
        //     navigate('Login');
        //   });
        // }
      }
    });

    return (
      <div>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withAuth;
