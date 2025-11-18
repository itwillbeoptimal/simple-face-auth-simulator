import { useState, useRef } from 'react';
import { verifyPassword } from '@/apis/userApi';
import type { PasswordValidationErrors } from '@/types/Errors';
import { validatePassword as validatePasswordUtil } from '@/utils/validators';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { PASSWORD_VALIDATION_DEBOUNCE_MS } from '@/constants/validationConfig';

interface UsePasswordValidationReturn {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  passwordErrors: PasswordValidationErrors;
  validating: boolean;
  hasPasswordChange: boolean;
  handleCurrentPasswordChange: (value: string) => void;
  handleNewPasswordChange: (value: string) => void;
  handleConfirmPasswordChange: (value: string) => void;
  isPasswordValid: () => boolean;
  validateAllPasswords: () => Promise<boolean>;
  resetPassword: () => void;
}

export const usePasswordValidation = (): UsePasswordValidationReturn => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<PasswordValidationErrors>({});
  const [validating, setValidating] = useState(false);

  const newPasswordTimer = useRef<NodeJS.Timeout | null>(null);
  const confirmPasswordTimer = useRef<NodeJS.Timeout | null>(null);

  const validateNewPassword = (password: string) => {
    if (!password) {
      setPasswordErrors(prev => ({ ...prev, newPassword: undefined }));
      return;
    }

    const passwordError = validatePasswordUtil(password);
    if (passwordError) {
      setPasswordErrors(prev => ({ ...prev, newPassword: passwordError }));
    } else {
      setPasswordErrors(prev => ({ ...prev, newPassword: undefined }));
    }

    if (confirmPassword && password !== confirmPassword) {
      setPasswordErrors(prev => ({
        ...prev,
        confirmPassword: ERROR_MESSAGES.PASSWORD_MISMATCH,
      }));
    } else if (confirmPassword) {
      setPasswordErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const validateConfirmPassword = (password: string) => {
    if (!password) {
      setPasswordErrors(prev => ({ ...prev, confirmPassword: undefined }));
      return;
    }

    if (password !== newPassword) {
      setPasswordErrors(prev => ({
        ...prev,
        confirmPassword: ERROR_MESSAGES.PASSWORD_MISMATCH,
      }));
    } else {
      setPasswordErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleCurrentPasswordChange = (value: string) => {
    setCurrentPassword(value);
    setPasswordErrors(prev => ({ ...prev, currentPassword: undefined }));
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);

    if (newPasswordTimer.current) {
      clearTimeout(newPasswordTimer.current);
    }

    newPasswordTimer.current = setTimeout(() => {
      validateNewPassword(value);
    }, PASSWORD_VALIDATION_DEBOUNCE_MS);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);

    if (confirmPasswordTimer.current) {
      clearTimeout(confirmPasswordTimer.current);
    }

    confirmPasswordTimer.current = setTimeout(() => {
      validateConfirmPassword(value);
    }, PASSWORD_VALIDATION_DEBOUNCE_MS);
  };

  const hasPasswordChange = Boolean(currentPassword && newPassword && confirmPassword);

  const validateAllPasswords = async (): Promise<boolean> => {
    if (!currentPassword && !newPassword && !confirmPassword) {
      return true;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      if (!currentPassword) {
        setPasswordErrors(prev => ({
          ...prev,
          currentPassword: ERROR_MESSAGES.CURRENT_PASSWORD_REQUIRED,
        }));
      }
      if (!newPassword) {
        setPasswordErrors(prev => ({
          ...prev,
          newPassword: ERROR_MESSAGES.NEW_PASSWORD_REQUIRED,
        }));
      }
      if (!confirmPassword) {
        setPasswordErrors(prev => ({
          ...prev,
          confirmPassword: ERROR_MESSAGES.PASSWORD_CONFIRM_REQUIRED,
        }));
      }
      return false;
    }

    const passwordError = validatePasswordUtil(newPassword);
    if (passwordError) {
      setPasswordErrors(prev => ({
        ...prev,
        newPassword: passwordError,
      }));
      return false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordErrors(prev => ({
        ...prev,
        confirmPassword: ERROR_MESSAGES.PASSWORD_MISMATCH,
      }));
      return false;
    }

    try {
      setValidating(true);
      const result = await verifyPassword({ currentPassword });
      if (!result.valid) {
        setPasswordErrors(prev => ({
          ...prev,
          currentPassword: '현재 비밀번호가 일치하지 않습니다',
        }));
        return false;
      }
    } catch {
      setPasswordErrors(prev => ({
        ...prev,
        currentPassword: '현재 비밀번호가 일치하지 않습니다',
      }));
      return false;
    } finally {
      setValidating(false);
    }

    return true;
  };

  const isPasswordValid = () => {
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) return false;
      if (Object.values(passwordErrors).some(error => error)) return false;
    }

    return true;
  };

  const resetPassword = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordErrors({});
    setValidating(false);

    if (newPasswordTimer.current) clearTimeout(newPasswordTimer.current);
    if (confirmPasswordTimer.current) clearTimeout(confirmPasswordTimer.current);
  };

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    passwordErrors,
    validating,
    hasPasswordChange,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    isPasswordValid,
    validateAllPasswords,
    resetPassword,
  };
};

export default usePasswordValidation;
