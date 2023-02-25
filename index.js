const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId, Admin } = require("mongodb");
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
    const locationCollection = client.db("basaBhara").collection("locations");
    const usersCollection = client.db("basaBhara").collection("users");
    const categoriesCollection = client
      .db("basaBhara")
      .collection("categories");
    const reviewCollection = client.db("basaBhara").collection("review");

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
      const query = { userType: "user" };
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
    app.post("/allbasa", async (req, res) => {
      const basa = req.body;
      const result = await basaCollection.insertOne(basa);
      res.send(result);
    });

    // get all basa collection
    app.get("/allbasa", async (req, res) => {
      const query = {};
      const result = await basaCollection.find(query).toArray();
      res.send(result);
    });

    // adject categories basa_____________________________________-
    app.get("/homes/:category", async (req, res) => {
      const category = req.params.category;
      console.log(category);
      const query = { category: category };
      const result = await basaCollection.find(query).toArray();
      res.send(result);
    });

    //get exact homeDetails____________________________________
    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await basaCollection.findOne(query);
      res.send(result);
    });

    // delete basaCollection
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await basaCollection.deleteOne(query);
      res.send(result);
    });

    // expincive basa get
    app.get("/expensive", async (req, res) => {
      const query = { expancive: true };
      const result = await basaCollection.find(query).toArray();
      res.send(result);
    });

    // location get

    app.get("/locations", async (req, res) => {
      const query = {};
      const result = await locationCollection.find(query).toArray();
      res.send(result);
    });

    // seller request post
    app.put("/sellerrequest/:email", async (req, res) => {
      const user = req.body;
      const email = req.params.email;
      const query = { email: email };
      const options = { upsert: true };

      const updateDoc = {
        $set: user,
      };
      const result = await usersCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // all user get
    app.get("/pending", async (req, res) => {
      const query = { userType: "pending" };
      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });

    // all user get
    app.get("/seller", async (req, res) => {
      const query = { userType: "seller" };
      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });



    // post review...........................
    app.post("/review", async (req, res) => {
      const review = req.body;
      const cursor = await reviewCollection.insertOne(review);
      res.send(cursor);
    });



    // get Review....................................
    app.get("/review", async (req, res) => {
      let query = {};
      if (req.query.homeId) {
        query = { homeId: req.query.homeId };
      }

      const cursor = await reviewCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });




    // approved seller by Admin.....................................................
    app.put("/approved/:id", async (req, res) => {
        const id = req.params.id;
        const query =  { _id: new ObjectId(id) };
        const options = { upsert: true };

        const updateDoc = {
          $set: {
            userType: "seller"
          },
        };
        const result = await usersCollection.updateOne(query, updateDoc, options);
        res.send(result);
        
    })

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
