//Primitive types (number, string, boolean)
let b = 23;
let a = "bishal";
let c = true;
//Arrays
let d = ["hi", "It's", "me", "Bishal"];
let e = [1, 3, 5, 6, 3];
//Tuples
let a1 = ["Bishal", 20, true];
//Enums
// Define the roles as an enum
import * as readline from "readline";
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "ADMIN";
    UserRoles["GUEST"] = "GUEST";
    UserRoles["SUPER_ADMIN"] = "SUPER_ADMIN";
})(UserRoles || (UserRoles = {}));
//efine post mapping (role -> post)
const roleTopost = {
    [UserRoles.ADMIN]: "Mid-level Manager",
    [UserRoles.GUEST]: "Junior Employee",
    [UserRoles.SUPER_ADMIN]: "Serior Manager",
};
//Create readline interfacce
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
r1.question("Enter the value for your role (ADMIN, GUEST, SUPER_ADMIN): ", (answer) => {
    const role = answer.trim().toUpperCase();
    if (role in UserRoles) {
        console.log("You are: ", roleTopost[role]);
    }
    else {
        console.log("Wrong Selection!");
    }
    r1.close();
});
// Get input from user
// let I1: string | null = prompt("Enter the value for your role (ADMIN, GUEST, SUPER_ADMIN)");
// if (I1 === UserRoles.ADMIN) {
//   console.log("You are:", Post.MIDMAN);
// } else if (I1 === UserRoles.GUEST) {
//   console.log("You are:", Post.JUNIOR);
// } else if (I1 === UserRoles.SUPER_ADMIN) {
//   console.log("You are:", Post.SENIOR);
// } else {
//   console.log("Wrong Selection!");
// }
//Any, Unknown, Void, Null, Undefine, Never
let x = '244'; // here typescript stop completely
let x1 = 1;
x1 = "bsal";
if (typeof x1 === "string")
    x1.toUpperCase();
//# sourceMappingURL=index.js.map