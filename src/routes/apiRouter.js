const passport = require("passport");
const apiRouter = require("express").Router();
const {
    productsTest,
    requestSucessfull,
    randomNums,
    requestFail,
} = require("../controllers/apiController");

/*
 *** ROUTES ***
 */
apiRouter.get("/productos-test", productsTest);

apiRouter.post(
    "/login",
    passport.authenticate("login", { failWithError: true }),
    requestSucessfull,
    requestFail
);

apiRouter.post(
    "/register",
    passport.authenticate("register", { failWithError: true }),
    requestSucessfull,
    requestFail
);

apiRouter.get("/randoms", randomNums);

module.exports = apiRouter;
