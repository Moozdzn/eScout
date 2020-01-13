var express = require('express');
var teamDAO = require('../models/teamDAO');
var router = express.Router();


router.get("/:id", function (req, res, next) {
    var id = req.params.id;
    teamDAO.getTeamInfo(id, function (err, result) {
        if (err) {
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        } res.status(result.code).send(result.data);
    }, next)

});


module.exports = router;