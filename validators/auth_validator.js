const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "Email must be at least 3 Chars." })
    .max(255, { message: "Email must not be more than 255 Chars." }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(3, { message: "Password must be at least 3 chars." })
    .max(255, { message: "Password must not be more than 255 characters" }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 chars." })
    .max(255, { message: "Name must not be more than 255 chars." }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(3, { message: "Phone number must be at least 3 chars. " })
    .max(255, { message: "Phone number must not be more than 255 chars." }),
});

module.exports = { loginSchema, signupSchema };
