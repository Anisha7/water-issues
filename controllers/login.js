var loggedIn = false;

module.exports = function (app) {

    app.get('/', (req, res) => {
        if (!loggedIn) {
            res.render('login');
        }

    });
}
