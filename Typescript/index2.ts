//Type Inference
let a = 12 //this inference as typescript automatically knows the type

//Type annotations
let b: number | string | boolean;
b = "ram";
b = 3
b = false

//Interface
interface User {
  name: string,
  email: String,
  password: string,
}

function getUsersData(obj: User): void {
}