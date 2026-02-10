import { UserInputError } from "@/helpers/clientErrors";

const isInt = (value: string): boolean => {
  return !isNaN(parseInt(value, 10)) && /^[0-9]+$/.test(value);
};

type ParsedFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: number;
};

export function parseIdsToInt<T extends Record<string, any>, K extends keyof T>(
  args: T,
  fields: K[],
): ParsedFields<T, K> {
  const parsed = { ...args };

  fields.forEach((field) => {
    if (typeof parsed[field] === "string") {
      const num = parseInt(parsed[field] as string, 10);
      // if (isNaN(num)) {
      if (!isInt(parsed[field])) {
        throw new UserInputError(
          `Invalid ${String(field)} format. Must be Integer. Received: ${parsed[field]}`,
        );
      }
      (parsed as any)[field] = num;
    }
  });

  return parsed as ParsedFields<T, K>;
}
