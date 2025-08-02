import {z} from "zod";

export const registerZSchema = z.object({
  username: z
  .string({required_error: "Username is required"})
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be at most 20 characters")
  .trim(),

  password: z
  .string({required_error: "password is required"})
  .min(8, "password must be at least 8 characters")
  .max(20, "password must be at most 20 characters")
  .trim()
});