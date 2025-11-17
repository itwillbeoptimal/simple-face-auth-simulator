import styled from '@emotion/styled';

export const Container = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  height: 92px;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  backdrop-filter: blur(10px);
`;

export const UserMenuContainer = styled.div`
  position: relative;
`;

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 8px;
  transition: background-color 0.2s;
`;

export const UserButtonText = styled.span`
  font-weight: 500;
`;

export const LoginButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.theme.COLORS.MAIN.PRIMARY};
  border-radius: 8px;
  font-weight: 500;
`;

export const DropdownButton = styled.span<{ isOpen: boolean }>`
  transition: transform 0.2s;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};

  & svg {
    width: auto;
    height: 12px;
    fill: white;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 240px;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
`;

export const DropdownSection = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #111;
`;

export const UserEmail = styled.span`
  font-size: 13px;
  color: #666;
`;

export const LogoutButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  font-weight: 500;
  font-size: 15px;
  background-color: ${props => props.theme.COLORS.MAIN.PRIMARY};
  border-radius: 8px;
`;
