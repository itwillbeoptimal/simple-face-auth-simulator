export interface FormErrors {
  [key: string]: string | undefined;
}

export interface ValidationErrors extends FormErrors {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  name?: string;
}

export interface PasswordValidationErrors extends FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
