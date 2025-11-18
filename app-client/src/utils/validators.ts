import { EMAIL_REGEX, MIN_PASSWORD_LENGTH } from '@/constants/validationConfig';
import { ERROR_MESSAGES } from '@/constants/errorMessages';

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return ERROR_MESSAGES.EMAIL_REQUIRED;
  }
  if (!isValidEmail(email)) {
    return ERROR_MESSAGES.EMAIL_INVALID;
  }
  return undefined;
};

export const validatePassword = (
  password: string,
  minLength: number = MIN_PASSWORD_LENGTH,
): string | undefined => {
  if (!password.trim()) {
    return ERROR_MESSAGES.PASSWORD_REQUIRED;
  }
  if (password.length < minLength) {
    return ERROR_MESSAGES.PASSWORD_TOO_SHORT(minLength);
  }
  return undefined;
};

export const validatePasswordConfirm = (
  password: string,
  confirmPassword: string,
): string | undefined => {
  if (!confirmPassword.trim()) {
    return ERROR_MESSAGES.PASSWORD_CONFIRM_REQUIRED;
  }
  if (password !== confirmPassword) {
    return ERROR_MESSAGES.PASSWORD_MISMATCH;
  }
  return undefined;
};

export const validateName = (name: string): string | undefined => {
  if (!name.trim()) {
    return ERROR_MESSAGES.NAME_REQUIRED;
  }
  return undefined;
};
