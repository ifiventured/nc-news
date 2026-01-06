exports.handleNotFound = (req, res) => {
    res.status(404).send({ msg: "Path not found" });
};

exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02") {
        return res.status(400).send({ msg: "Bad request" });
    }
    next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        return res.status(err.status).send({ msg: err.msg });
    }
    next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
};
