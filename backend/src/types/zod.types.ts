import { z } from "zod";

const UserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(255, { message: "Username must be at most 255 characters long" }),
  email: z.string().email({ message: "Invalid email" }),
  fullName: z
    .string()
    .min(3, { message: "Full Name must be at least 3 characters long" })
    .max(255, { message: "Full Name must be at most 255 characters long" }),
  avatar: z.string().url({ message: "Invalid url" }),
  // coverImage is optional
  coverImage: z.string().url({ message: "Invalid url" }).optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(255, { message: "Password must be at most 255 characters long" }),
});

export { UserSchema };

// // validate req.body using zod

// const validatedUser = UserSchema.safeParse({});

// // if validation fails, throw error
// if (!validatedUser.success) {
//   const errorMessage = validatedUser.error.issues[0].message;
//   throw new Error(errorMessage);
// }

// // console.log("validated user", validatedUser.data);
