const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
var cors = require("cors");
app.use(cors());
const port = process.env.PORT || 5000;

function run() {
  //mongodb connection start

  const uri =
    "mongodb+srv://masudrana:kzeQ6jEvvmQoGiUl@cluster0.hsazmle.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  //mongodb connection end

  try {
    // collections

    const basaCollection = client.db("basaBhara").collection("allBasa");

    app.get("/text", (req, res) => {
      res.send("hello world");
    });
  } finally {
  }

  //
}
run();

//

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is Running  ${port}`);
});
