const express = require("express");
const cors = require("cors");

const app = express();

// const visitsSchema = new mongoose.Schema(
//   {
//     visitorId: Number,
//   },
//   { timeStamps: true }
// );

//this should be mongoose model that has timestamps so that it would be easier to find visits whithin last 24 hours

const visitList = [];

app.use(cors());

app.get("/visit/:visitorId", (req, res, next) => {
  const hostUniqueId = req.params.visitorId;

  // create visit document
  visitList.push({ visitorId: hostUniqueId });

  const totalVisits = visitList.length;

  const uniqueVisits = [...new Set(visitList.map((item) => item.visitorId))]
    .length;

  console.log(visitList);

  //filter by created at value in mongoose to find the documents created in last 24 hours which will give 24 hours visits count

  res.status(200).json({ data: { totalVisits, uniqueVisits } });
});

app.listen(5000, () => {
  console.log("App litening at port 5000");
});
