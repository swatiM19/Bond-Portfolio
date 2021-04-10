const User = require('../models/User');
const Bond = require('../models/Bond');
const Sales = require('../models/SaleInfo');
let _ = require('lodash');
let moment = require('moment');
const json2csv = require('json2csv').parse;
const fs = require('fs');
const path = require('path');

let ctrl = {
    getAllUsersForBond: async function (req, res){
        try {
            let reqObj = req.body;
            let allUsers = await User.find({ bonds: { $in: reqObj.bondId }});
            res.json({allUsers});
        } catch (e) {
            res.json({message: e});
        }

    },
    addNewUser: async function (req, res){
        try {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                isAdmin: req.body.isAdmin,
                isSalesManager: req.body.isSalesManager,
                bonds: req.body.bonds,
            })
            await user.save();
            return res.json({message: 'added'});
        } catch (e) {
            return res.json({message: e});
        }
    },
    getPortfolio: async function(req, res){
        try {
            let reqObj = req.body;
            let data = await Sales.find({'customerInfo': reqObj.customerId }).populate( 'bondInfo salesPersonInfo');
            if (!data) {
                return res.json('You have no data!');
            }
             return res.json({data});
        } catch(e){
            return res.json({message: e});
        }
    },
    // customer requesting to buy a bond

    buyBond: function(req, res){
        try {
            // bond Id

        } catch(e){
            res.json({message: e});
        }
    },
    // Admin can download sales record on daily/monthly basis
    getSalesData: async function(req, res){
        // need to modify the query for daily/monthly basis
        // let today = moment().startOf('day');
        // let lastMonth = moment(today).subtract(1,'months').endOf('month');
        // gte = moment(req.query.from).utc().toDate()
        // lt = moment(req.query.to).utc().add(1, 'days').toDate()
        // queryObj = {$and:[]};
        // queryObj.$and.push({ timeStamp: {$gte: gte, $lt: lt}});

        //For unique file name
        const dateTime = new Date().toISOString().slice(-24).replace(/\D/g,
            '').slice(0, 14);
        const filePath = path.join(__dirname, "../", "Downloads", "Sales-record" + dateTime + ".csv");
        let csv;

        const record = await Bond.find({});
        const fields = ['id','name','price', 'description'];
        try {
            csv = json2csv(record, {fields});
        } catch (err) {
            return res.status(500).json({err});
        }

        fs.writeFile(filePath, csv, function (err) {
            if (err) {
                return res.json(err).status(500);
            }
            else {
                res.download(filePath);
            }
        })
    },
    trackSales: async function (req, res) {
        try {
            // not sure what overall sales mean but let's just fetch all the sales data for a particular sales person
            const allSales = await Sales.find({});
        } catch(e){
            res.json({message: e});
        }
    }

};

module.exports = ctrl;