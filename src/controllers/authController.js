import passport from "passport";

let getLogout = (req, res) => {
  req.logout();
  return res.status(200).send({message: "Đăng xuất thành công!", done: true});
}

let checkLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    console.log('logged out!!');
    return res.send({message:'not logged in!!!', done: false});
  }
  next();
}

let checkLoggedOut = (req, res, next) => {
  if(req.isAuthenticated()){
    console.log('logged in!!');
    return res.send({message:'logged in!!!', done: false});;
  }
  next();
}

let getLoginStatus = (req, res, next) => {
  if(!req.isAuthenticated()){
    return res.send(false);
  } else {
    return res.send(true);
  }
}

let passportAuth = (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) { return console.log(err); }
    if (!user) { 
      return res.send({message:'login fail!!!', done: false});
    }
    req.logIn(user, function(err) {
      if (err) { return console.log(err);}
      return res.send({
        message: 'login success!!!', 
        user: user,
        done: true
      });
    });
  })(req, res, next);
}

module.exports = {
  getLogout: getLogout,
  checkLoggedOut: checkLoggedOut,
  checkLoggedIn: checkLoggedIn,
  getLoginStatus: getLoginStatus,
  passportAuth: passportAuth
};
