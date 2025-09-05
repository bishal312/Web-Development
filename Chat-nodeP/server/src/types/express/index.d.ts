import { IUser } from "../../model/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Now req.user is typed
    }
  }
}
