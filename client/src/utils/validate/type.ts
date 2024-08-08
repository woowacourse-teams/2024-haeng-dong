export interface ValidateResult {
  isValid: boolean;
  errorMessage?: string;
  errorInfo?: Record<string, boolean>;
}
