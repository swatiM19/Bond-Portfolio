const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/Users');
const { ensureAdminPermission } = require('../utils');

router.get('/getAllUsersForBond', ensureAdminPermission, ctrl.getAllUsersForBond);
router.post('/addNewUser', ctrl.addNewUser);
router.post('/portfolio', ctrl.getPortfolio);
router.post('/downloadSalesRecord',ensureAdminPermission, ctrl.getSalesData);
router.get('getSalesRecord', ensureAdminPermission, ctrl.trackSales);

module.exports = router;