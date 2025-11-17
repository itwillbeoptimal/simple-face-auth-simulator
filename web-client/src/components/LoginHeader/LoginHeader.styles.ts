import styled from '@emotion/styled';

export const Container = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  height: 88px;
  align-items: center;
  padding: 0 32px;
  backdrop-filter: blur(10px);
`;

export const BackButton = styled.button`
  & svg {
    width: auto;
    height: 24px;
  }
`;
