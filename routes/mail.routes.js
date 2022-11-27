const express = require("express");

const {
  sendMail,
  getAllMails,
  deleteMultipleMails,
  getSingleMail,
  label,
  markAsRead,
  markAsUnread,
  starMail,
  spamMail,
} = require("../services/mail.service.js");
const { authorization } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.route("/").post(sendMail);
router.route("/").get(authorization, getAllMails);
router.route("/").delete(authorization, deleteMultipleMails);
router.route("/:id").get(authorization, getSingleMail);
router.route("/:id").put(authorization, label);
router.route("/read/:id").put(authorization, markAsRead);
router.route("/unread/:id").put(authorization, markAsUnread);
router.route("/star/:id").put(authorization, starMail);
router.route("/spam/:id").put(authorization, spamMail);

module.exports = router;