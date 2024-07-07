import Provider from "@/lib/Provider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ProviderOptions<T> = T extends Provider<infer U, any> ? U : never;
