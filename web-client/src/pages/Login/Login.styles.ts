import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.COLORS.BACKGROUND};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
  max-width: 400px;
  padding: 40px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.theme.COLORS.LABEL.PRIMARY};
  margin: 0;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.COLORS.LABEL.PRIMARY};
`;

export const Input = styled.input`
  font-size: 16px;
  padding: 14px 16px;
  background-color: rgba(255, 255, 255, 0.05);
  color: ${props => props.theme.COLORS.LABEL.PRIMARY};
  border: 1px solid ${props => props.theme.COLORS.LABEL.QUATERNARY};
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.COLORS.MAIN.PRIMARY};
  }

  &::placeholder {
    color: ${props => props.theme.COLORS.LABEL.TERTIARY};
  }
`;

export const ErrorMessage = styled.div`
  font-size: 14px;
  color: ${props => props.theme.COLORS.LABEL.ALERT};
  text-align: center;
`;
