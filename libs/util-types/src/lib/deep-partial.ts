export type DeepPartial<T> = Partial<{
  [P in keyof T]: NonNullable<T[P]> extends object ? DeepPartial<T[P]> : T[P];
}>;
