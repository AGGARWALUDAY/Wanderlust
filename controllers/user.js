const User=require("../models/user");
module.exports.signup=async (req, res) => {
    try {
        let { email, username, password } = req.body;
        const newuser = new User({ email, username });
        const registeruser = await User.register(newuser, password);
        console.log(registeruser);
        req.login(registeruser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        })
    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect("/form");
    }
}
module.exports.rendersignup=(req, res) => {
    res.render("user/signup.ejs");
};
module.exports.renderlogin= (req, res) => {
    res.render("user/login.ejs");
};
module.exports.login=async (req, res) => {
    req.flash("success", "Welcome to Wanderlust");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};
module.exports.logout=(req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have Succesfully log out");
        res.redirect("/listings");
    });
};