import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

passport.serializeUser((user: Express.User, done: (err: Error | null, id?: number) => void) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done: (err: Error | null, user?: Express.User | false | null) => void) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    done(null, user);
  } catch (error) {
    done(error as Error);
  }
});

export default passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done: (error: Error | null, user?: Express.User | false, options?: { message: string }) => void) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        const { password: _, ...userWithoutPassword } = user;
        return done(null, userWithoutPassword);
      } catch (error) {
        return done(error as Error);
      }
    },
  ),
);
