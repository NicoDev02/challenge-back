import { auth } from "express-oauth2-jwt-bearer";
const { AUTH_ID, AUTH_BASE_URL } = process.env;
const checkJwt = auth({
  audience: AUTH_ID,
  issuerBaseURL: AUTH_BASE_URL,
  tokenSigningAlg: "RS256",
});

export default checkJwt;
