import styled from 'styled-components';
import storageManagerService from "../services/storage/storage-manager-service";
import { STORAGE_SESSION_IDENTIFIER } from '../services/storage/storage-constants';
import { useNavigate } from 'react-router-dom';


const StyledNav = styled.nav`
  background-color: #262626; // #e1e1e1;
  position: fixed;
  width: 100%;
`;

const StyledNavTitle = styled.div`
  min-width: 180px;
  font-size: 2.25rem;
  text-transform: uppercase;
  font-weight: 900;
  color: #e2e2e2; // #000000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const StyledNavLogout = styled.div`
  font-size: 1rem;
  color: #e2e2e2; // #000000; 
  text-align: end;
  cursor: pointer;
  padding: 0 5px 0 0;
`;

const sessionStorageService = storageManagerService(true);

export default function NavBar(props) {
  const navigate = useNavigate();

  const logOut = () => {
    sessionStorageService.removeItem(STORAGE_SESSION_IDENTIFIER);
    navigate('/');
  };

  const isUserLoggedIn = () => {
    return Boolean(sessionStorageService.getItem(STORAGE_SESSION_IDENTIFIER));
  }

  return (
    <StyledNav className="">
      <div className="container-fluid">
        <div className="row">
          <StyledNavTitle className="col-10 align-self-start">
            {props.title}
          </StyledNavTitle>
          <StyledNavLogout className="col-2 align-self-center" onClick={logOut} >
            { !isUserLoggedIn() ||
              'Logout'
            }
          </StyledNavLogout>
        </div>
      </div>
    </StyledNav>
  );
}
