function index(req, res) {
    res.send('index dei film');
}

function show(req, res) {
    res.send('show dei film');
}

module.exports = {
    index,
    show
}