const config = require('./config');

let ctrl = {
    ensureAdminPermission: function(req, res, next) {
        let sendErr = function(s) {
            return res.status(401).json({
                message: 'You do not have admin privileges',
                s: s
            });
        };
        if (req.body.email == null) {
            return sendErr('Please provide your email');
        }
        if (config.adminUserEmailList.indexOf(req.body.email) !== -1) {
            return next();
        } else {
            return sendErr('Not Admin User!');
        }
    },
    ensureSalesPermission: function(req, res, next) {
        let sendErr = function(s) {
            return res.status(401).json({
                message: 'You do not have sales privileges',
                s: s
            });
        };
        if (req.body.email == null) {
            return sendErr('Please provide your email');
        }
        if (config.salesUserEmailList.indexOf(req.body.email) !== -1) {
            return next();
        } else {
            return sendErr('Not Sales Manager!');
        }
    }

};
module.exports = ctrl;