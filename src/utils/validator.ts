interface NotBlank {
  message: string;
}

interface Pattern {
  message: string;
  regex: string;
}

interface Length {
  message: string;
  min: number;
  max: number;
}

function hasNotNull(...params: any[]): boolean {
  return params.filter((param) => param !== null).length > 0;
}

function notBlank(constraint: NotBlank, value: string): string | null {
  return value === '' ? constraint.message : null;
}

function length(constraint: Length, value: string): string | null {
  return constraint.min <= value.length && value.length <= constraint.max
    ? null
    : constraint.message;
}

function matchPattern(constraint: Pattern, value: string): string | null {
  const regex = new RegExp(constraint.regex);
  return regex.test(value) ? null : constraint.message;
}

export { length, matchPattern, notBlank, hasNotNull };
export type { Length, NotBlank, Pattern };
