import { JwtPayload } from "jsonwebtoken";

export default interface IJwtToken extends JwtPayload {
  id: string;
  email: string;
}
