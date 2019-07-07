const express = require("express");
const cors = require("cors");
const app = express();

app.use("/", cors());

app.get("/accounts", function(_, res) {
  const accounts = [
    {
      id: "aa54a5b4-d5b5-4081-8c57-0e39701b0dcc",
      operations: [
        {
          id: "1e61de81-9351-4c44-8631-734d061ee2c0",
          date: new Date(2019, 5, 12),
          amount: 100
        },
        {
          id: "f85cce23-f62c-4370-a375-03d3a214e1be",
          date: new Date(2019, 5, 13),
          amount: -40
        },
        {
          id: "bdef40f1-e5fe-4050-aee8-f2254c9d6dc9",
          date: new Date(2019, 10, 21),
          amount: -5
        }
      ]
    }
  ];
  res.send(accounts);
});

app.post("/operation", function(_, res) {
  res.sendStatus(200);
});

app.delete("/operation/:id", function(_, res) {
  res.sendStatus(200);
});

app.listen(5000, function() {
  console.log("Fake API listening on port 5000!");
});
