import { useQuery } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Header.styles';
import { getUserInfo } from '@/apis/users';
import AngleDownIcon from '@/assets/icons/angle-down.svg?react';
import { recognizedUserIdAtom } from '@/atoms/userAtom';

const Header = () => {
  const navigate = useNavigate();
  const recognizedUserId = useAtomValue(recognizedUserIdAtom);
  const setRecognizedUserId = useSetAtom(recognizedUserIdAtom);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', recognizedUserId],
    queryFn: () => getUserInfo(recognizedUserId!),
    enabled: !!recognizedUserId,
  });

  const displayName = userInfo?.name || '사용자';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogin = () => {
    void navigate('/');
  };

  const handleLogout = () => {
    setRecognizedUserId(null);
    setIsDropdownOpen(false);
    void navigate('/');
  };

  return (
    <S.Container>
      <div />
      {recognizedUserId ? (
        <S.UserMenuContainer ref={dropdownRef}>
          <S.UserButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <S.UserButtonText>{displayName} 님</S.UserButtonText>
            <S.DropdownButton isOpen={isDropdownOpen}>
              <AngleDownIcon />
            </S.DropdownButton>
          </S.UserButton>
          {isDropdownOpen && (
            <S.Dropdown>
              <S.DropdownSection>
                <S.UserInfo>
                  <S.UserName>{displayName} 님</S.UserName>
                  {userInfo?.email && <S.UserEmail>{userInfo.email}</S.UserEmail>}
                </S.UserInfo>
              </S.DropdownSection>
              <S.DropdownSection>
                <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
              </S.DropdownSection>
            </S.Dropdown>
          )}
        </S.UserMenuContainer>
      ) : (
        <S.LoginButton onClick={handleLogin}>로그인</S.LoginButton>
      )}
    </S.Container>
  );
};

export default Header;
