export function isFilledInput(value: string, msg: string) {
  if (!value) return msg;
  else return true;
}

export function isProperDeadlinePattern(value: string): true | string {
  const match = value.match(/^(\d{2})-(\d{2})-(\d{2})-(\d{2})$/);
  if (!match) return '마감일자 형식을 [YY-MM-DD-HH]로 맞춰주세요.';

  const [_, year, month, day, hour] = match;
  const formattedDate = `20${year}-${month}-${day}T${hour}:00:00`;

  const deadline = new Date(formattedDate);

  const isValid =
    deadline.getFullYear() === parseInt(`20${year}`, 10) &&
    deadline.getMonth() + 1 === parseInt(month, 10) &&
    deadline.getDate() === parseInt(day, 10) &&
    deadline.getHours() === parseInt(hour, 10);

  if (!isValid) return '날짜를 확인해주세요.';

  if (deadline.getTime() <= new Date().getTime())
    return '마감 시간은 현 시점 이전이 될 수 없습니다.';

  return true;
}

export function isProperNewDeadline(
  value: string,
  originDeadline: string,
): true | string {
  const match = value.match(/^(\d{2})-(\d{2})-(\d{2})-(\d{2})$/);
  if (!match) return '마감일자 형식을 [YY-MM-DD-HH]로 맞춰주세요.';

  const [_, year, month, day, hour] = match;
  const formattedDate = `20${year}-${month}-${day}T${hour}:00:00`;

  const deadline = new Date(formattedDate);

  const isValid =
    deadline.getFullYear() === parseInt(`20${year}`, 10) &&
    deadline.getMonth() + 1 === parseInt(month, 10) &&
    deadline.getDate() === parseInt(day, 10) &&
    deadline.getHours() === parseInt(hour, 10);

  if (!isValid) return '날짜를 확인해주세요.';

  if (deadline.getTime() <= new Date(originDeadline).getTime())
    return '새로운 마감 일자는 기존 일자 이전이 될 수 없습니다.';

  return true;
}

export function isNumber(value: string, msg: string) {
  if (!/^\d+$/.test(value)) return msg;
  if (isNaN(Number(value))) return msg;
  return true;
}
