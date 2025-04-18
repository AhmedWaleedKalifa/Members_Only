const passport=require("passport");
const pool=require("../database/pool")
const db=require("../database/queries")
const LocalStrategy=require("passport-local").Strategy;
const bcrypt=require("bcrypt");

passport.use(
    new LocalStrategy(async (username, password, done) => {
      
      try {
        const user = await db.getUserByUserName(username);
  
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" })
      }
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    })
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.getUser(id);
      done(null, user);
    } catch(err) {
      done(err);
    }
  });

  module.exports=passport;