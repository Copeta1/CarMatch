export type ValidationRule<T> = {
  field: keyof T;
  validate: (value: any, form: T) => boolean;
  message: string;
};

export function validateForm<T>(
  form: T,
  rules: ValidationRule<T>[]
): {
  valid: boolean;
  errors: Partial<Record<keyof T, string>>;
} {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const rule of rules) {
    if (!rule.validate(form[rule.field], form)) {
      errors[rule.field] = rule.message;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
