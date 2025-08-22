//Primitive types (number, string, boolean)
let b:number = 23;
let a:string = "bishal";
let c:Boolean = true

//Arrays
let d:string[] = ["hi", "It's", "me", "Bishal"]
let e:number[] = [1,3,5,6,3]

//Tuples
let a1:[string, number, boolean] = ["Bishal", 20, true]

//Enums
// Define the roles as an enum
import * as readline from "readline"
enum UserRoles {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
  SUPER_ADMIN = "SUPER_ADMIN",
}

//efine post mapping (role -> post)
const roleTopost: Record<UserRoles, string> = {
  [UserRoles.ADMIN]: "Mid-level Manager",
  [UserRoles.GUEST]: "Junior Employee",
  [UserRoles.SUPER_ADMIN]: "Serior Manager",
}

//Create readline interfacce
const r1 = readline.createInterface({
  input:process.stdin,
  output:process.stdout,
});

r1.question("Enter the value for your role (ADMIN, GUEST, SUPER_ADMIN): ",(answer)=>{
  const role = answer.trim().toUpperCase();

  if (role in UserRoles){
    console.log("You are: ", roleTopost[role as UserRoles]);
  }else {
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
let x:any = '244'; // here typescript stop completely
let x1:unknown = 1
x1 = "bsal"
if (typeof x1 === "string")
  x1.toUpperCase();