export interface ValidateResult {
  isValid: boolean;
  errorMessage: string | null;
  errorInfo?: Record<string, boolean>;
}
