const fs = require("fs");
const users = require("../users.json");

module.exports.getRandomUser = (req, res, next) => {
  const randomUser = Math.floor(Math.random() * users.length);
  res.send(users[randomUser]);
};

module.exports.getAllUser = (req, res, next) => {
  const { limit } = req.query;
  res.send(users.slice(0, limit));
};

module.exports.saveAUser = (req, res, next) => {
  const { id, gender, name, contact, address, photoUrl } = req.body;
  if (id && gender && name && contact && address && photoUrl) {
    const userData = fs.readFileSync("./users.json");
    const allUsers = JSON.parse(userData);
    allUsers.push(req.body);

    fs.writeFile("./users.json", JSON.stringify(allUsers), (err) => {
      if (err) {
        res.send("Failed to add data");
      } else {
        res.send("User added successfully");
      }
    });
  } else {
    if (!id) {
      res.send("Id is missing");
    } else if (!gender) {
      res.send("Gender is missing");
    } else if (!name) {
      res.send("Name is missing");
    } else if (!contact) {
      res.send("Contact is missing");
    } else if (!address) {
      res.send("Address is missing");
    } else if (!photoUrl) {
      res.send("Photo url is missing");
    }
  }
};

module.exports.updateAUser = (req, res, next) => {
  const { uId } = req.params;
  const { id, gender, name, contact, address, photoUrl } = req.body;
  const userData = fs.readFileSync("./users.json");
  const allUsers = JSON.parse(userData);
  const index = allUsers.findIndex((obj) => obj.id == uId);

  id ? (allUsers[index].id = id) : allUsers[index].id;
  gender ? (allUsers[index].gender = gender) : allUsers[index].gender;
  name ? (allUsers[index].name = name) : allUsers[index].name;
  contact ? (allUsers[index].contact = contact) : allUsers[index].contact;
  address ? (allUsers[index].address = address) : allUsers[index].address;
  photoUrl ? (allUsers[index].photoUrl = photoUrl) : allUsers[index].photoUrl;

  fs.writeFile("./users.json", JSON.stringify(allUsers), (err) => {
    if (err) {
      res.send("Failed to update data");
    } else {
      res.send("User updated successfully");
    }
  });
};

module.exports.updateMultipleUser = (req, res, next) => {
  const findUsers = req.body;
  const userData = fs.readFileSync("./users.json");
  const allUsers = JSON.parse(userData);
  findUsers.forEach((element) => {
    const index = allUsers.findIndex((obj) => obj.id == element.id);
    allUsers[index].contact = element.contact;
  });
  fs.writeFile("./users.json", JSON.stringify(allUsers), (err) => {
    if (err) {
      res.send("Failed to update data");
    } else {
      res.send("Users updated successfully");
    }
  });
};

module.exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  const userData = fs.readFileSync("./users.json");
  const allUsers = JSON.parse(userData);
  const newAllUser = allUsers.filter((user) => user.id != id);
  console.log(newAllUser);
  fs.writeFile("./users.json", JSON.stringify(newAllUser), (err) => {
    if (err) {
      res.send("Failed to delete data");
    } else {
      res.send("User deleted successfully");
    }
  });
};
