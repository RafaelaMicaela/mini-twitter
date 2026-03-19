import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  sub: string;
  iat: number;
  exp: number;
};

export const useCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { userId: null };
  }
  const decodedToken = jwtDecode<DecodedToken>(token);
  return { userId: decodedToken.sub };
};
