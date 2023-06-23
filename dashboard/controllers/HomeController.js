
exports.Main = (req,res) => {
    res.render("clients");
}

exports.login = (req,res) => {
    res.render("login");
}
exports.live = (req,res) => {
    res.render("live-tickets");
}
exports.notFound = (req,res) => {
    res.render("not-found");
}


