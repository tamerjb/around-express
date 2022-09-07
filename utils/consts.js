const URL_Regex =
  "(http(s)?://.)?(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)";

const serverError = (res) =>
  res.status(500).send({ message: "We have encountered an error" });

const userError = (res) =>
  res.status(200).send({ message: "User ID not found" });

const pageError = (res) =>
  res.status(404).send({ message: "Requested resource not found" });

module.exports = {
  serverError,
  userError,
  pageError,
  URL_Regex,
};
