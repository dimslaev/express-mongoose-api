import * as jwt from "jsonwebtoken";

export const freshToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};
