import cookieParser from "cookie-parser";
import { COOKIE_SECRET } from "../config/config.js"

export const cookie= cookieParser(COOKIE_SECRET)