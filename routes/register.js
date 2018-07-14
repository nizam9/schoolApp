//Include models
var Register = require('../models/register');

register = function (req, res) {
  console.log(req.body);
  var register = new Register({
    username: req.body.username,
    phone: req.body.phone,
    password: req.body.password,
  });
  register.save(function (err, data) {
    if (!err) {
      res.send({
        status: "success",
        message: "Registered Successfully"
      });
    } else {
      res.send({
        status: "failure",
        message: "error ocurred",
        error: JSON.stringify(err)
      });
    }
  });

}
//get user by id
getUser = function (req, res) {
  var user_idd = req.params.user_idd;
  console.log("user_idd in server", req.params, user_idd);
  Register.findById({
    _id: user_idd
  }).exec(function (err, response) {
    if (err) return res.status(500).send(err)
    console.log(response);
    //send the list of all people in database with name of "John James" and age of 36
    // Very possible this will be an array with just one Person object in it.
    return res.status(200).send(response);
  });
}
updateUser = function (req, res) {
  var user_idd = req.params.user_idd;
  var name = req.body.user_object.name;
  var username = req.body.user_object.username;
  var city = req.body.user_object.city;
  var phone = req.body.user_object.phone;
  var state = req.body.user_object.state;
  var address = req.body.user_object.address;

  console.log("user_idd in server for update", user_idd, req.params, name, state, address, city, username);
  Register.updateOne({
    _id: user_idd
  }, {
    $set: {
      phone: phone,
      name: name,
      username: username,
      city: city,
      state: state,
      address: address
    }
  }, (err, response) => {
    if (err) throw err;
    console.log("doc updated", response);
    //send the list of all people in database with name of "John James" and age of 36
    // Very possible this will be an array with just one Person object in it.
    return res.status(200).send(response);
  });
}
login = function (req, res) {

  Register.find({
    username: req.body.username,
    password: req.body.password
  }, function (err, result) {
    if (err) return res.status(500).send(err)
    return res.status(200).send(result);
    console.log(err, result);
  });
}

module.exports.route = function (router) {
  router.post('/register', register);

  router.post('/login', login);
  router.get('/register/:user_id', getUser);
  router.put('/register/:user_id', updateUser);

};
