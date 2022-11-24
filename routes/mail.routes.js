const express = require("express");

const {
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
} = require("../services/mail.service.js");
const { authorization } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.route("/").post(sendMail);
router.route("/").get(authorization, getAllMails);
router.route("/").delete(authorization, deleteMultipleMails);
router.route("/:id").get(authorization, getSingleMail);
router.route("/mark-as-read/:id").put(authorization, markAsRead);
router.route("/mark-as-unread/:id").put(authorization, markAsUnread);
router.route("/add-to-star/:id").put(authorization, addToStar);
router.route("/remove-from-star/:id").put(authorization, removeFromStar);
router.route("/add-label/:id").put(authorization, addLabel);
router.route("/remove-label/:id").put(authorization, removeLabel);
router.route("/mark-as-spam").put(authorization, markAsSpam);
router.route("/mark-as-not-spam").put(authorization, markAsNotSpam);

module.exports = router;