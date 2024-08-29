function validateRecruitmentCode(targetString: string): string {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(targetString) ? '' : '잘못된 형태의 모집 코드입니다.';
}

function validateEmail(targetString: string): string {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetString))
    return '잘못된 형태의 이메일입니다.';

  if (
    !/\.(com|net|org|edu|gov|mil|int|co|biz|info|mobi|name|ly|io|me|ai)$/.test(
      targetString.split('@')[1],
    )
  )
    return '잘못된 형태의 이메일입니다.';

  if (targetString.length > 50) return '이메일은 최대 50자까지 가능합니다.';

  return '';
}

function validatePassword(targetString: string): string {
  if (targetString.length < 8 || targetString.length > 32)
    return '비밀번호는 8자 이상 32자 이하까지 가능합니다.';

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(targetString))
    return '비밀번호는 반드시 특수문자를 포함해야 합니다.';

  if (/\s/.test(targetString)) return '비밀번호에 공백이 포함되서는 안됩니다.';

  return '';
}

function validateClubName(targetString: string): string {
  if (targetString.length < 3 || targetString.length > 30)
    return '동아리명은 3자 이상 30자 이하까지 가능합니다.';

  /*
    ToDo
    - 동아리명 유효성 검사 필요
    - 특수 문자 제외..?
   */

  return '';
}

export {
  validateRecruitmentCode,
  validateEmail,
  validatePassword,
  validateClubName,
};
