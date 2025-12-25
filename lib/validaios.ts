import z from "zod";

export const SignInSchema = z.object({
  email: z
    .email({ message: "provide a valid email address" })
    .min(1, { message: "Email is required " }),
  password: z
    .string()
    .min(6, { message: "a least 6 charachters" })
    .max(100, { message: "password can't exceed 100 chrachters" }),
});
export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),

  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),

  email: z
    .email({ message: "Please provide a valid email address." })
    .min(1, { message: "Email is required." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});
export const askQuestionSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 5 characters.")
    .max(300, "Title musn't be longer then 130 characters."),
  content: z.string().min(100, "Minimum of 100 characters."),
  tags: z
    .array(
      z
        .string()
        .min(1, "Tag must have at least 1 character.")
        .max(15, "Tag must not exceed 15 characters.")
    )
    .min(1, "Add at least one tag.")
    .max(3, "Maximum of 3 tags."),
});
export type AskQuestionSchemeType = z.infer<typeof askQuestionSchema>;

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
  image: z.string().url("Invalid image URL").optional(),
  location: z.string().optional(),
  portfolio: z.string().url("Invalid portfolio URL").optional(),
  reputation: z.number().optional(),
});
