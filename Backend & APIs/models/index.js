import { userdb } from "./users/userSchema.js";
import { Gusers } from "./users/userSchema.js";
import {Members} from "./users/members.js";
// import { Posts } from "./community/posts.js";

export const initModels = () => {
  userdb();
 Gusers();
 Members();
//  Posts();
};
