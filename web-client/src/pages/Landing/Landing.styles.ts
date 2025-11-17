import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 280px;
`;
