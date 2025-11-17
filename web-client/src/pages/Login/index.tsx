import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import * as S from './Login.styles';
import { login } from '@/apis/auth';
import { recognizedUserIdAtom } from '@/atoms/userAtom';
import Button from '@/components/Button';

const Login = () => {
  const navigate = useNavigate();
  const setRecognizedUserId = useSetAtom(recognizedUserIdAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user } = await login(email, password);
      setRecognizedUserId(user.id);
      void navigate('/');
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Content>
        <S.Title>로그인</S.Title>
        <S.Form onSubmit={handleSubmit}>
          <S.InputGroup>
            <S.Label htmlFor="email">이메일</S.Label>
            <S.Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일 주소를 입력해 주세요"
              autoComplete="email"
            />
          </S.InputGroup>
          <S.InputGroup>
            <S.Label htmlFor="password">비밀번호</S.Label>
            <S.Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              autoComplete="current-password"
            />
          </S.InputGroup>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          <Button type="submit" disabled={loading} fullWidth>
            로그인
          </Button>
        </S.Form>
      </S.Content>
    </S.Container>
  );
};

export default Login;
