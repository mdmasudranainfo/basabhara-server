const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
var cors = require("cors");
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());

function run() {
  //mongodb connection start

  const uri =
    "mongodb+srv://masudrana:Uaz0fxaLqIXO0JgH@cluster0.ynspdjq.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  //mongodb connection end

  try {
    // collections

    const basaCollection = client.db("basaBhara").collection("allBasa");
    const usersCollection = client.db("basaBhara").collection("users");
    const categoriesCollection = client
      .db("basaBhara")
      .collection("categories");

    app.get("/text", (req, res) => {
      res.send("hello world");
    });

    app.post("/users", async (req, res) => {
      const user = req.body;

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // get users collection
    app.get("/users", async (req, res) => {
      const query = {};
      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });

    // get categories
    app.get("/categories", async (req, res) => {
      const query = {};
      const result = await categoriesCollection.find(query).toArray();
      res.send(result);
    });

    //post basa
    app.post("/categories", async (req, res) => {
      const basa = req.body;
      const result = await basaCollection.insertOne(basa);
      res.send(result);
    });

    //

    //

    //
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
