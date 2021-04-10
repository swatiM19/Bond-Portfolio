const Bond = require('../models/Bond');
const Sales = require('../models/SaleInfo');
const User = require('../models/User');
let _ = require('lodash');
let Promise = require('bluebird');
let moment = require('moment');

let ctrl = {
    getAllBondsForUser: async function (req, res){
        try {
            let reqObj = req.body;
            let bonds = await Bond.find({ owners: { $in: reqObj.userId }});
            res.json({bonds});
        } catch (e) {
            res.json({message: e});
        }
    },

    // params for create
    // {
    //     "name":"bond2",
    //     "description":"This is my second bond",
    //     "price":"100",
    //     "email":"Iamadmin@gmail.comp"
    // }
    create: async function (req, res) {
        try {
            const bond = new Bond({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            })
            const savedBond = await bond.save();
            res.json({savedBond});
        } catch (err) {
            res.json({message: err});
        }
    },
    update: function (req, res) {
      try {

      } catch( err) {
          res.json({message: err});
      }
    },
    // params for archive
    // {
    //     "name":"bond1", or _id
    //     "email":"Iamadmin@gmail.comp"
    // }
    archive: async function (req, res) {
        try {
            // let bond = await Bond.findOne({_id: req.bond._id , owners:[]});
            let bond = await Bond.findOne({ name: req.body.name , owners:[]});
            if (!bond) {
                return res.json({message: 'No Such bond exists'});
            }
            bond.archived = true;
            await bond.save();
            res.json({message: 'archived'});
        } catch (e) {
            res.json({message: e});
        }
    },

    // Assuming here that the customer is requesting to buy a bond .
    // He has to wait till his request to buy that bond gets approved by the sales manager.
    // Sales manager can have an array of pending requests to sell.

    buyBond: async function (req, res){
        try {
            const reqObj = req.body;
            await Promise.all([
                Bond.findOneAndUpdate({_id : reqObj.bondId}, {$set: {owners: reqObj.customerId}}, {new: true}),
                User.findOneAndUpdate({_id : reqObj.customerId}, {$set: {bonds: reqObj.bondId}}, {new: true})
            ]);
            res.json({ message: "Successfully purchased the bond." });
        } catch (e) {
            res.json({message: e});
        }
    },
    // params to sell bond
    // {
    //     "email": "Iamsalesmanager@gmail.comp",
    //     "customerId": "6071c201e9ab891a1d0e6212",
    //     "bondId":"6071c2e8f568e31a2d631728",
    //     "salesPersonInfo": "6071c253e9ab891a1d0e6214",
    // }
    sellBond: async function(req, res){
        try {
            const reqObj = req.body;
            const salesData = new Sales({
                customerInfo: reqObj.customerId,
                bondInfo: reqObj.bondId,
                salesPersonInfo: reqObj.salesId,
            })
            salesData['timeStamp'] = moment.utc();
            const data = await salesData.save();
            await Promise.all([
                Bond.findOneAndUpdate({_id : reqObj.bondId}, {$set: { owners: reqObj.customerId}}, {new: true}),
                User.findOneAndUpdate({_id : reqObj.customerId}, {$set: { bonds: reqObj.bondId}}, {new: true})
            ]);
            res.json({ data });
        } catch (e){
            res.json({message: e});
        }
    },
};

module.exports = ctrl;