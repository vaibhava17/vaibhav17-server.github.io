const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

// sample data
const { user } = require("../data/user.data.js");
const { blogs } = require("../data/blogs.data.js");
const { mails } = require("../data/mails.data.js");

// models
const { User } = require("../models/user.model.js");
const { Blog } = require("../models/blog.model.js");
const { Mail } = require("../models/mail.model.js");

const db = require("../db.js");

dotenv.config();
db();

const importData = async () => {
  try {
    await User.deleteMany();
    await Blog.deleteMany();
    await Mail.deleteMany();

    // import users
    const createdUsers = await User.insertMany(user);
    const adminUser = createdUsers[0]._id;

    // import blogs 
    const blogsData = blogs.map((blog) => {
      return { ...blog, user: adminUser };
    });
    await Blog.insertMany(blogsData);

    // import mails
    const mailsData = mails.map((mail) => {
      return { ...mail, user: adminUser };
    });
    await Mail.insertMany(mailsData);

    console.log(`Data Imported Successfully With Admin Id: ${adminUser}` .green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Import Fail Error: ${error}`.red.inverse);
    process.exit(1);
  };
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Blog.deleteMany();
    await Mail.deleteMany();
    
    console.log(`Data Destroyed Successfully From: ${process.env.NODE_ENV} database` .red.inverse);
    process.exit();
  } catch (error) {
    console.log(`Destory Error: ${error}`.blue.inverse);
    process.exit(1);
  };
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
};
