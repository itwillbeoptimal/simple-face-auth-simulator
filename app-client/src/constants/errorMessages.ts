export const ERROR_MESSAGES = {
  EMAIL_REQUIRED: '이메일을 입력해 주세요',
  EMAIL_INVALID: '유효한 이메일 주소를 입력해 주세요',
  EMAIL_DUPLICATE: '이미 사용 중인 이메일입니다',
  PASSWORD_REQUIRED: '비밀번호를 입력해 주세요',
  PASSWORD_TOO_SHORT: (minLength: number) => `비밀번호는 최소 ${minLength}자 이상이어야 합니다`,
  PASSWORD_CONFIRM_REQUIRED: '비밀번호를 다시 입력해 주세요',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다',
  NAME_REQUIRED: '이름을 입력해 주세요',
  CURRENT_PASSWORD_REQUIRED: '현재 비밀번호를 입력해 주세요',
  NEW_PASSWORD_REQUIRED: '새 비밀번호를 입력해 주세요',
} as const;
