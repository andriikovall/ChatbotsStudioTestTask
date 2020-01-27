const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const db = require('../db/entities/user');
const { JWT_SECRET } = require('../config/config');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
  try {
    const user = await db.getById(jwtPayload.user_id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
}));

/**
 * example usage of role checking middleware
 *
 * const checkAdmin = (req, res, next) => {
 * if (!req.user) res.sendStatus(401);
 * else if (req.user.role.toLowerCase() !== 'admin') res.sendStatus(403);
 * else next();
 */

const checkAuth = passport.authenticate('jwt', { session: false });
module.exports = { checkAuth };
