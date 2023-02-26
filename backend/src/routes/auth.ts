import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import passport from "passport";

const router = Router();
const prisma = new PrismaClient();

// Save the user's ID to the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Get user data back by searching user by ID
passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({ where: { id: id as string } });
  if (!user) {
    return done("No matching user");
  }
  done(null, user);
});

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { scope: ["user:email"] }));

export default router;
