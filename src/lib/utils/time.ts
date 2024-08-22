/** This function changes Date object to YYYY-MM-DD HH:MM:SS format*/
export const formateDateTime = (date: Date) => {
  const tmpMonth = date.getMonth() + 1;
  const tmpDate = date.getDate();
  const month = tmpMonth < 10 ? `0${tmpMonth}` : tmpMonth;
  const day = tmpDate < 10 ? `0${tmpDate}` : tmpDate;

  const formattedDate = `${date.getFullYear()}-${month}-${day}`;
  const formattedTime = date.toTimeString().substring(0, 8);

  return `${formattedDate} ${formattedTime}`;
};

/** This function changes date number to HH:MM:SS format*/
export const formatNumberTime = (diff: number) => {
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}:${String(seconds).padStart(2, '0')}`;
};
