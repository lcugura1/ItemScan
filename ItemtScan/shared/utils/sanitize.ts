export const sanitize = {
  email: (v: string) => v.trim().toLowerCase().replace(/\s+/g, ""),
  password: (v: string) => v.replace(/[\x00-\x1F\x7F]/g, ""),
  name: (v: string) => v.trim().replace(/\s+/g, " "),
};
