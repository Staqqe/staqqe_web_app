export const APPNAME = "Dotenv"
export const SERVERDOMAIN = "http://172.20.10.2:5002";
export const DOMAIN = "http://localhost:3000";
export const DOMAINAPI = DOMAIN +"/api";
export const GITHUBURL = DOMAINAPI + "/auth/github"
export const GOOGLEURL = DOMAINAPI + "/auth/google"
export const GOOGLECALLBACKURL = DOMAINAPI + "/auth/google/callback"
export const GITHUBCALLBACKURL = DOMAINAPI + "/auth/github/callback"
export const SIGNUPURL =DOMAINAPI+"/auth/signup"
export const LOGINURL =DOMAINAPI+"/auth/login"
export const VERIFYOTP =DOMAINAPI+"/auth/verify-otp"
export const VERIFYEMAILURL =DOMAINAPI+"/auth/verify-email"
export const RESENDOTP =DOMAINAPI+"/auth/resend-otp"
export const RESETPASSWORD =DOMAINAPI+"/auth/reset-password"
export const FORGOTPASSWORD =DOMAINAPI+"/auth/forgot-password"
export enum OTPTYPE {
  forgotPassword = "forgotPassword",
  emailVerification = "emailVerification",
}