export type WithNullableId<T> = Omit<T, 'id'> & { id: number | null };
