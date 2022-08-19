const routeNotFound = (req, res) =>
  res
    .status(500)
    .send(`<H1 style="text-align:center;color:red">Page Not Found 404 </H1>`);

module.exports = routeNotFound;
