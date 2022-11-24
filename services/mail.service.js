const asyncHandler = require("express-async-handler");
const { Mail } = require("../models/mail.model.js");

// @desc  Send Mail
// @route POST /api-v1/mail
// @access Public
const sendMail = asyncHandler(async (req, res) => {
  const { name, email, mobile, message } = req.body;
  if (!name || !email || !mobile || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the fields.",
    });
  }
  const mail = null;
  const checkMailFromEmail = await Mail.find({ email });
  if (checkMailFromEmail.length > 0) {
    checkMailFromEmail.find(mail => {
      if (mail.spam) {
        return res.status(400).json({
          success: false,
          message: "You have been marked as spam.",
        });
      }
    })
  } else {
    mail = await Mail.create({
      name,
      email,
      mobile,
      message,
    });
  }
  if (mail) {
    return res.status(200).json({
      success: true,
      message: "Thank you for contacting us. We will get back to you soon.",
    });
  }
  res.status(400).json({
    success: false,
    message: "Sorry! We can not send your message. Please try again.",
  });
});

// @desc  Get All Mails
// @route GET /api-v1/mail
// @access Private
const getAllMails = asyncHandler(async (req, res) => {
  const { current, pageSize, sortField, sortOrder, search } = req.query;
  let query = [
    {
      $match: {
        $or: [
          { message: { $regex: search ? search : "", $options: "i" } },
          { email: { $regex: search ? search : "", $options: "i" } },
          { name: { $regex: search ? search : "", $options: "i" } },
        ],
      },
    },
  ];
  const option = {
    page: parseInt(current, 10) || 1,
    limit: parseInt(pageSize, 10) || 10,
    sort: { [sortField]: sortOrder },
  };
  return Mail.aggregatePaginate(Mail.aggregate(query), option).then((data) => {
    res.status(200).json({
      success: true,
      message: "All the messages are fetched successfully.",
      total: data.totalDocs,
      pageSize: data.limit,
      totalPages: data.totalPages,
      current: data.page,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
      items: data.map((item) => {
        return {
          id: item._id,
          name: item.name,
          email: item.email,
          mobile: item.mobile,
          message: item.message,
          spam: item.spam,
          read: item.read,
        };
      }),
    });
  });
});

// @desc  Get Single Mail
// @route GET /api-v1/mail/:id
// @access Private
const getSingleMail = asyncHandler(async (req, res) => {
  const mailId = req.params.id;
  const mail = await Mail.findById(mailId);
  if (!mail) {
    return res.status(404).json({
      success: false,
      message: "No mail found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Mail fetched successfully",
    data: {
      id: mail._id,
      name: mail.name,
      email: mail.email,
      mobile: mail.mobile,
      message: mail.message,
      spam: mail.spam,
      read: mail.read,
    },
  });
});

// @desc  mark as read
// @route PUT /api-v1/mail/mark-as-read/:id
// @access Private
const markAsRead = asyncHandler(async (req, res) => {
  const mailId = req.params.id;
  const mail = await Mail.findById(mailId);
  if (!mail) {
    return res.status(404).json({
      success: false,
      message: "No mail found",
    });
  }
  mail.read = true;
  await mail.save();
  res.status(200).json({
    success: true,
    message: "Mail marked as read",
  });
});

// @desc  mark as unread
// @route PUT /api-v1/mail/mark-as-unread/:id
// @access Private
const markAsUnread = asyncHandler(async (req, res) => {
  const mailId = req.params.id;
  const mail = await Mail.findById(mailId);
  if (!mail) {
    return res.status(404).json({
      success: false,
      message: "No mail found",
    });
  }
  mail.read = false;
  await mail.save();
  res.status(200).json({
    success: true,
    message: "Mail marked as unread",
  });
});

// @desc  Delete Multiple Mails
// @route DELETE /api-v1/mail
// @access Private
const deleteMultipleMails = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids) {
    return res.status(400).json({
      success: false,
      message: "Please provide ids",
    });
  }
  await Mail.deleteMany({ _id: { $in: ids } });
  res.status(200).json({
    success: true,
    message: "Mails deleted successfully",
  });
});

// @desc  add to star
// @route PUT /api-v1/mail/add-to-star/:id
// @access Private
const addToStar = asyncHandler(async (req, res) => {
  const mailId = req.params.id;
  const mail = await Mail.findById(mailId);
  if (!mail) {
    return res.status(404).json({
      success: false,
      message: "No mail found",
    });
  }
  mail.starred = true;
  await mail.save();
  res.status(200).json({
    success: true,
    message: "Mail add to star",
  });
});

// @desc  remove from star
// @route PUT /api-v1/mail/remove-from-star/:id
// @access Private
const removeFromStar = asyncHandler(async (req, res) => {
  const mailId = req.params.id;
  const mail = await Mail.findById(mailId);
  if (!mail) {
    return res.status(404).json({
      success: false,
      message: "No mail found",
    });
  }
  mail.starred = false;
  await mail.save();
  res.status(200).json({
    success: true,
    message: "Mail remove from star",
  });
});

// @desc  add label
// @route PUT /api-v1/mail/add-label/:id
// @access Private
const addLabel = asyncHandler(async (req, res) => {
  const mailId = req.params.id;
  const { label } = req.body;
  const mail = await Mail.findById(mailId);
  if (!mail) {
    return res.status(404).json({
      success: false,
      message: "No mail found",
    });
  }
  mail.labels.push(label);
  await mail.save();
  res.status(200).json({
    success: true,
    message: "Label added successfully",
  });
});

// @desc  remove label
// @route PUT /api-v1/mail/remove-label/:id
// @access Private
const removeLabel = asyncHandler(async (req, res) => {
  const mailId = req.params.id;
  const { label } = req.body;
  const mail = await Mail.findById(mailId);
  if (!mail) {
    return res.status(404).json({
      success: false,
      message: "No mail found",
    });
  }
  mail.labels = mail.labels.filter((item) => item !== label);
  await mail.save();
  res.status(200).json({
    success: true,
    message: "Label removed successfully",
  });
});

// @desc  markAsSpam
// @route PUT /api-v1/mail/mark-as-spam
// @query email
// @access Private
const markAsSpam = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const allMails = await Mail.find({ email });
  if(!allMails) {
    return res.status(404).json({
      success: false,
      message: "No mail found",
    });
  }
  allMails.forEach(async (item) => {
    item.spam = true;
    await item.save();
  });
  res.status(200).json({
    success: true,
    message: "Mail marked as spam",
  });
});

// @desc  markAsNotSpam
// @route PUT /api-v1/mail/mark-as-not-spam
// @query email
// @access Private
const markAsNotSpam = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const allMails = await Mail.find({
    email,
    spam: true,
  });
  if(!allMails) {
    return res.status(404).json({
      success: false,
      message: "No mail found",
    });
  };
  allMails.forEach(async (item) => {
    item.spam = false;
    await item.save();
  });
  res.status(200).json({
    success: true,
    message: "Mail marked as not spam",
  });
});

module.exports = {
  sendMail,
  getAllMails,
  getSingleMail,
  markAsRead,
  markAsUnread,
  deleteMultipleMails,
  addToStar,
  removeFromStar,
  addLabel,
  removeLabel,
  markAsSpam,
  markAsNotSpam,
};