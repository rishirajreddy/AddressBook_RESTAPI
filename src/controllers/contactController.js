const Contact = require('../models/contact_model');
const User = require('../models/auth_model');
const {format} = require("date-fns");
const {getPagination} = require("../utils/helper");

const dotenv = require("dotenv");

dotenv.config();

//Get all contacts
exports.getAllContacts  = async(req,res) => {
    const {page, size} = req.query;
    const {limit, offset} = getPagination(page, size);
    
    Contact.find()
        .limit(limit)
        .skip(offset)
        .exec()
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(err => res.send(err.message));
}

//Get details of a single contact
exports.getContact = async(req,res) => {
    Contact.findOne({_id: req.params.id})
        .populate('_user', ['username', 'email'])
        .exec()
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.send(err.message);
            console.log(err.message)})
}

//Insert single contact
exports.createContact = async(req,res) => {
    const {firstName, lastName, contactNo ,city, street, post_code, country} = req.body;
    const user = await User.findOne({username:req.decoded.username});
    const userId = user.get("_id").toString();

    const newContact  = new Contact({
        _user: userId,
        name: {
            firstName:firstName,
            lastName: lastName
        },
        contactNo,
        address: {
            city:city,
            street:street,
            post_code: post_code,
            country: country
        },
        createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss")
    })
    await newContact.save()
        .then((result) => {
            res.status(200).send(result)            
        })
        .catch(err => {
            res.send(err.message);
            console.log(err.message);
        })
}

//Insert bulk contacts
exports.insertBulkContacts = async(req,res) => {
    const body = req.body;
    const user = await User.findOne({username:req.decoded.username});
    const userId = user.get("_id").toString();

    let contacts = body.map(item => {
        return {
            _user: userId,
            name: {
                firstName:item.firstName,
                lastName: item.lastName
            },
            contactNo: item.contactNo,
            address: {
                city:item.city,
                street:item.street,
                post_code: item.post_code,
                country: item.country
            },
            createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss")
            }
    })

    Contact.insertMany(contacts)
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(err => {res.send(err.message)})

}


//Fetch phase matching contacts
exports.fetchMatchingContact = async(req,res) => {
    Contact.find(
        {
            $or: [
                {'name.firstName': req.body.firstName},
                {'name.lastName': req.body.lastName},
                {'contactNo': req.body.contactNo}
            ]
        }
    )
        .then((data) => {
            res.status(200).send({results_found: data.length, results: data})
        })
        .catch(err => {res.send(err.message)})
}


//Update given contact
exports.updateContact = async(req,res) => {
    Contact.updateOne(
        {_id: req.params.id},
        {
            $set: {
                    "name.firstName": req.body.firstName,
                    "name.lastName": req.body.lastName,
                    "contactNo": req.body.contactNo,
                    "address.city":req.body.city,
                    "address.street":req.body.street,
                    "address.post_code": req.body.post_code,
                    "address.country": req.body.country
        }
        }
    )
        .then((result) => {
            if(result.modifiedCount > 0){
                res.status(200).send("Record Updated")
            }else {
                res.status(201).send("Record Not Updated! Try Changing any of the values")
            }
            console.log(result);
        })
        .catch(err => {
            res.send(err.message);
            console.log(err.message);})
}

//delete the given contact
exports.deleteContact = async(req,res) => {
    Contact.deleteOne(
        {_id: req.params.id},
        {
            $pull: {_id: req.params.id}
        }
    )
        .then((result) => {
            res.send(result)
        })
        .catch(err => res.send(err.message))
}

