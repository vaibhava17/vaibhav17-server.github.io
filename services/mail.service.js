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
    return res.status(201).json({
      success: true,
      message: "Thank you for contacting us. We will get back to you soon.",
    });
  }
  res.status(401).json({
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
      message: "mails list.",
      total: data.totalDocs,
      pageSize: data.limit,
      current: data.page,
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
    message: "Mail data fetched successfully",
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
// @route PUT /api-v1/mail/read/:id
// @access Private
const markAsRead = asyncHandler(async (req, res) => {
  const mailId = req.params.id;
  const mail = await Mail.findById(mailId);
  if (!mail) {
    return res.status(404).json({
      success: false,
      message: "No mail found.",
    });
  }
  mail.read = true;
  await mail.save();
  res.status(200).json({
    success: true,
    message: "Mail marked as read.",
  });
});

// @desc  mark as unread
// @route PUT /api-v1/mail/unread/:id
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
      message: "Provide atleast one mail id",
    });
  }
  await Mail.deleteMany({ _id: { $in: ids } });
  res.status(200).json({
    success: true,
    message: "Mails removed successfully",
  });
});

// @desc  star mail
// @route PUT /api-v1/mail/star/:id
// @access Private
const starMail = asyncHandler(async (req, res) => {
  const mailId = req.params.id;
  const mail = await Mail.findById(mailId);
  if (!mail) {
    return res.status(404).json({
      success: false,
      message: "No mail found",
    });
  }
  mail.starred = !mail.starred;
  await mail.save();
  res.status(200).json({
    success: true,
    message: "Star status changed",
    id: mail._id,
  });
});

// @desc  add/remove label
// @route PUT /api-v1/mail/add-label/:id
// @access Private
const label = asyncHandler(async (req, res) => {
  const mailId = req.params.id;
  const { addLabels, removeLabels } = req.body;
  const mail = await Mail.findById(mailId);
  if (!mail) {
    return res.status(404).json({
      success: false,
      message: "No mail found",
    });
  }
  if(addLabels && addLabels.length == 0) {
    return res.status(400).json({
      success: false,
      message: "Provide atleast one label to add.",
    });
  }
  const filteredLabels = addLabels.filter((label) => {
    return !mail.labels.includes(label);
  });
  mail.labels = [...mail.labels, ...filteredLabels];
  if (removeLabels && removeLabels.length > 0) {
    mail.labels = mail.labels.filter((label) => {
      return !removeLabels.includes(label);
    });
  }
  await mail.save();
  res.status(200).json({
    success: true,
    message: "Labels updated successfully.",
    id: mail._id,
  });
});

// @desc  update spam status
// @route PUT /api-v1/mail/spam/:id
// @query email
// @access Private
const spamMail = asyncHandler(async (req, res) => {
  const mailId = req.params.id;
  const mail = await Mail.findById(mailId);
  if (!mail) {
    return res.status(404).json({
      success: false,
      message: "No mail found",
    });
  }
  mail.spam = !mail.spam;
  await mail.save();
  res.status(200).json({
    success: true,
    message: "Mail spam status updated",
  });
});

module.exports = {
  sendMail,
  getAllMails,
  deleteMultipleMails,
  getSingleMail,
  label,
  markAsRead,
  markAsUnread,
  starMail,
  spamMail,
};