import { JwtPayload } from "jsonwebtoken";

export interface MessageResponse {
  message: string;
}

export interface ErrorResponse extends MessageResponse {
  stack?: string;
}

export interface IJwtToken extends JwtPayload {
  id: string;
  email: string;
}
