const mails = Array.from({ length: 5 }).map((_, i) => ({
  name: `User ${i}`,
  email: `testemail${i}@vaibhavag.me`,
  mobile: `988883438${i}`,
  message: `hello form User ${i}`,
  read: false,
  spam: false,
  starred: false,
  labels: ["none"],
}));

module.exports = { mails };