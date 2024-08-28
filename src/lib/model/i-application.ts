export type IApplicationOverview = {
  id: number;
  studentNumber: string;
  name: string;
  major: string;
  outcome: 'PASS' | 'FAIL' | 'PENDING';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIApplicationOverview(obj: any): obj is IApplicationOverview {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.studentNumber === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.major === 'string' &&
    (obj.outcome === 'PASS' ||
      obj.outcome === 'FAIL' ||
      obj.outcome === 'PENDING')
  );
}
