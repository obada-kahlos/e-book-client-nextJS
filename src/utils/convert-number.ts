export const formatPhoneNumber = (phoneNumberString: string | undefined) => {
  let cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{3})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3] + "-" + match[4];
  }
  return null;
};
