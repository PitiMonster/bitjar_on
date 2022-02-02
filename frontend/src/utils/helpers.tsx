import { sha256 } from "js-sha256";

export const generateUniqueId = () => {
  return sha256(Date.now().toString() + Math.random().toString());
};
