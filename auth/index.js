var skaffold = require('skaffold-ecommerce');

exports.app = app = skaffold.app;

// app.use(csrfProtection); put back when all is ready

var PassportLocalService = require('skaffold-auth').AuthenticationService.PassportLocalService;
var authenticationService = new PassportLocalService();

app.use(authenticationService._passport.initialize());
app.use(authenticationService._passport.session());

exports.authenticationService = authenticationService;


require('./routes/route');