const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

const { usersDao } = require("../daos/index");

const { hashPass, checkPass } = require("../utils/auth");

passport.use(
    "register",
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            let user = await usersDao.checkUser(email);
            user = user[0]?._doc;

            if (user)
                return done(
                    {
                        code: "failSignup",
                        message: "El usuario ya existe",
                    },
                    false
                );

            if (!password)
                return done(
                    {
                        code: "failSignup",
                        message: "Por favor, ingrese una contraseña",
                    },
                    false
                );

            const newUser = {
                email,
                password: await hashPass(password),
                name: req.body.name,
                lastname: req.body.lastname,
                age: req.body.age,
                nickname: req.body.nickname,
            };

            await usersDao.save(newUser);
            return done(null, newUser);
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            let user = await usersDao.checkUser(email);
            user = user[0]?._doc;

            if (!user)
                return done(
                    {
                        code: "failLogin",
                        message: "Usuario o contraseña incorrecta",
                    },
                    false
                );

            const passValidation = await checkPass(password, user.password);
            if (!passValidation)
                return done(
                    {
                        code: "failLogin",
                        message: "Usuario o contraseña incorrecta",
                    },
                    false
                );

            delete user.password;

            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (id, done) => {
    let user = await usersDao.checkUser(id);
    user = user[0]?._doc;
    delete user.password;

    done(null, user);
});

module.exports = { passport };
