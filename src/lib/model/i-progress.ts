export type IProgress = 'READY' | 'IN_PROGRESS' | 'COMPLETION' | 'ANNOUNCED';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIProgress(obj: any): obj is IProgress {
  return (
    obj === 'READY' ||
    obj === 'IN_PROGRESS' ||
    obj === 'COMPLETION' ||
    obj === 'ANNOUNCED'
  );
}
