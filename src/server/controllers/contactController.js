const models = require("../models");

module.exports = {
  // SHOW CONTACTS
  index: function (req, res) {
    models.Contact.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function (results) {
      res.render("contacts/index", { contacts: results });
    });
  },
  show: function (req, res) {
    console.log(req.user);
    models.Contact.findOne({
      where: { id: req.params.id },
      include: [models.Deal, models.Company]
    }).then(function (results) {
      res.render("contacts/show", { contact: results });
    });
  },
  getOne: function (req, res) {
    models.Contact.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Company, models.Deal]
    }).then(function (results) {
      res.json(results);
    });
  },
  getAll: function (req, res) {
    models.Contact.findAll({
      include: [models.Company, models.Deal]
    }).then(function (results) {
      res.json(results);
    });
  },
  edit: function (req, res) {
    console.log(req.body)
    models.Contact.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        mobile: req.body.mobile,
      },
      {
        where:
          { id: req.params.id }
      }
    ).then(function (results) {
      res.json(results)
    })
  }
};
