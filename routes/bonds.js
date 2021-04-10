const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/Bonds');
const { ensureAdminPermission, ensureSalesPermission } = require('../utils');


router.get('/getAllBondsForUser', ensureAdminPermission, ctrl.getAllBondsForUser);
router.post('/create', ensureAdminPermission , ctrl.create);
router.post('/update', ensureAdminPermission, ctrl.update);
router.post('/archive', ensureAdminPermission, ctrl.archive);
router.post('/buy', ensureSalesPermission, ctrl.buyBond);
router.post('/sell', ensureSalesPermission, ctrl.sellBond);


module.exports = router;