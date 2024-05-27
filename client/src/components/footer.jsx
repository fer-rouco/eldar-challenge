import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e1e1e1;
  height: 100%;
  
  &.link {
    color: #72b1bb;
    font-weight: bold; 
  }
`;

export default function Footer(props) {

  return (
    <StyledContainer>
      <p> by <a className="link" href="https://www.linkedin.com/in/fernando-nicolás-rouco-a1066262/">FnR</a></p>
    </StyledContainer>
  );
}
