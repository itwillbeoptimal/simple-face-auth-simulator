import styled from '@emotion/styled';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const StyledButton = styled.button<{ variant: string; fullWidth: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  padding: 16px 24px;
  border-radius: 12px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          color: ${props.theme.COLORS.LABEL.SECONDARY};
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        `;
      default:
        return `
          background-color: ${props.theme.COLORS.MAIN.PRIMARY};
        `;
    }
  }}

  ${props => props.fullWidth && 'width: 100%;'}
`;

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  ...rest
}) => {
  return (
    <StyledButton type={type} disabled={disabled} variant={variant} fullWidth={fullWidth} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
