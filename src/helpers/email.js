export default function prepareEmailByType(email: string, type: number) {
  if (!email) {
    return '';
  }
  let splitted = email.toString().split('@');
  type = type === 1 ? '_student' : '_teacher';

  if (splitted.length === 2) {
    return splitted[0] + type + '@' + splitted[1];
  }

  return splitted[0] + type;
}
