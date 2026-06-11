const STORAGE_KEY = "discount_codes";

const loadCodes = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveCodes = (codes) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));

// تولید کد یکتا (بررسی تکراری نبودن)
export const generateUniqueCode = (prefix) => {
  const existing = loadCodes().map((c) => c.code);
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code;
  do {
    code =
      prefix +
      "-" +
      Array.from(
        { length: 8 },
        () => chars[Math.floor(Math.random() * chars.length)],
      ).join("");
  } while (existing.includes(code));
  return code;
};

export const saveDiscountCode = (code, discountPercent) => {
  const codes = loadCodes();
  codes.push({ code, discountPercent, used: false });
  saveCodes(codes);
};

export const validateCode = (code) => {
  const codes = loadCodes();
  const entry = codes.find((c) => c.code === code && !c.used);
  return entry ? entry.discountPercent : null;
};

export const redeemCode = (code) => {
  const codes = loadCodes().filter((c) => c.code !== code);
  saveCodes(codes);
};
