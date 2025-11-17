import { useNavigate } from 'react-router-dom';
import * as S from './Landing.styles';
import Button from '@/components/Button';

const Landing = () => {
  const navigate = useNavigate();

  const handleFaceLogin = () => {
    void navigate('/face-login');
  };

  const handleEmailLogin = () => {
    void navigate('/login');
  };

  return (
    <S.Container>
      <S.Content>
        <S.ButtonGroup>
          <Button onClick={handleFaceLogin}>얼굴 인증 로그인</Button>
          <Button onClick={handleEmailLogin} variant="secondary">
            이메일로 로그인
          </Button>
        </S.ButtonGroup>
      </S.Content>
    </S.Container>
  );
};

export default Landing;
