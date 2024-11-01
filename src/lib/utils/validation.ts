export function isFilledInput(value: string, msg: string) {
  if (!value) return msg;
  else return true;
}

export function isProperEmail(value: string, msg: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return msg;

  if (
    !/\.(com|net|org|edu|gov|mil|int|co|biz|info|mobi|name|ly|io|me|ai)$/.test(
      value.split('@')[1],
    )
  )
    return msg;

  return true;
}

export function isProperPassword(value: string, msg: string) {
  if (value.length < 8 || value.length > 32) return msg;

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return msg;

  if (/\s/.test(value)) return msg;

  return true;
}

export function isProperClubName(value: string, msg: string) {
  if (!/^[가-힣a-zA-Z0-9-_ ]+$/.test(value)) return msg;
  return true;
}

export function isProperTime(
  beforeDateString: string,
  afterDateString: string,
  msg: string,
) {
  if (
    new Date(beforeDateString).getTime() >= new Date(afterDateString).getTime()
  )
    return msg;
  else return true;
}

export function validateRecruitmentCode(targetString: string): string {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(targetString) ? '' : '잘못된 형태의 모집 코드입니다.';
}

export function validatePublicRoute(pathname: string) {
  const patterns = [/^\/$/, /^\/recruitment\/.+$/, /^\/sign-in$/, /^\/error$/];

  return patterns.some((pattern) => pattern.test(pathname));
}
