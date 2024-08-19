const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = 10;
const app = express();

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/userDataBase");
  const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
  });

  const userSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    itemForSale: [itemSchema],
  });

  const User = mongoose.model("User", userSchema);
  const Item = mongoose.model("Item", itemSchema);

  const myPassword = "iphoneisnotabrand";
  bcrypt.hash(myPassword, saltRounds, async function (err, hash) {
    const user = new User({
      name: "Bikash_007",
      email: "bikash_001@gmail.com",
      password: hash,
      itemForSale: [],
    });

    // const newUser = await user.save();
    // console.log(newUser);
  });

  const newUserFound = await User.findOne({ email: "bikash_001@gmail.com" });
  if (newUserFound) {
    bcrypt.compare(
      myPassword,
      newUserFound.password,
      async function (err, result) {
        if (result == true) {
          const item = new Item({
            name: "Diamond",
            description: "I have a lot of diamond but i dont care",
            price: 100000,
          });

          // newUserFound.itemForSale.push(item);
          // const newUserUpdate = await newUserFound.save();
          // console.log(newUserUpdate);
        }
      }
    );
  } else {
    console.log("User not found");
  }

  // const user = new User({
  //   name: "Danish_45",
  //   email: "alad2134@gmail.com",
  //   password: "yourPassword",
  //   itemForSale: [],
  // });

  //   const item = new Item({
  //     name: "Gold",
  //     description: "I have a lot of Gold",
  //     price: 70000,
  //   });

  // const foundUser = await User.findOne({ email: "alad2134@gmail.com" });
  // if (foundUser) {
  //   const item = new Item({
  //     name: "Gold",
  //     description: "I have a lot of Gold",
  //     price: 70000,
  //   });

  //   // foundUser.itemForSale.push(item);
  //   const updateUser = await foundUser.save();
  //   console.log(updateUser);
  // } else {
  //   console.log("User not found");
  // }

  app.get("/", async function (req, res) {
    res.send("Hello World");
  });
}

app.listen(process.env.PORT, () => {
  console.log("Server is running on default port");
});
