import passport from "passport";
import passportLocal from "passport-local";
import User from "../../models/user";

const LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            let user = await User.getUserByUsername(username);
            if (!user) {
                return done(null, false, req.flash("errors", "Đăng nhập thất bại!"));
            }

            let checkPassword = await user.comparePassword(password);

            if (!checkPassword) {
                return done(null, false, req.flash("errors", "Đăng nhập thất bại!"));
            }

            return done(null, user, req.flash("successes", "Đăng nhập thành công!"));
        } catch (error) {
            console.log(error);
            return done(null, false, req.flash("errors", "Đăng nhập thất bại!"));
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await User.findUserByIdForSessionToUse(id);
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    });
}

module.exports = initPassportLocal;