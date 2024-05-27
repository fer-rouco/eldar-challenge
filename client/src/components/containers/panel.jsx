import { css, styled } from "styled-components";

const StyledBorder = css`
  border: 1px solid #CCC;
  border-radius: 1rem;
`;

const StyledContainer = styled.div`

  ${StyledBorder};

  background-color: #e1e1e1;

  overflow: hidden;

  padding: 1.25rem;

  margin-top: 1.25rem;
  margin-bottom: 1.25rem;

  overflow-x: auto;
  overflow-y: auto;
  max-height: 700px;

  &.small {
    max-width: 28.75rem; // 460,8px con font-size 16px
  }

  &.medium {
    max-width: 38.375rem; // 614,4px con font-size 16px
  }

  &.large {
    max-width: 49.5625rem; // 793,6px con font-size 16px
  }
`;

const StyledHeader = styled.div`

  ${StyledBorder};
  
  padding: 0 20px;
  margin: 0 20px 20px;

  background-color: #70aaff;
  color: #fff;
`;

// size: "small", "medium", "large"
const Panel = ({ title, children, size, className, hideTitle }) => {

  function getClasses() {
    return `panel container ${className || ''} ${size || ''}`;
  }

  return (
    <StyledContainer className={getClasses()} >
      { hideTitle ||
        <StyledHeader>
          <h1>{title}</h1>
        </StyledHeader>
      }
      {children}
    </StyledContainer>
  )
};
export default Panel;
