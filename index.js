const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0bvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const campaignCollection = client.db('crowdDB').collection('campaigns');
    const userCollection = client.db('crowdDB').collection('users');
    const donationCollection = client.db('crowdDB').collection('donations');

    // Route to get all campaigns
    app.get('/campaigns', async (req, res) => {
      const email = req.query.email; // Get email from query params
      if (!email) {
        const cursor = campaignCollection.find();
        const result = await cursor.toArray();
        return res.send(result);
      }

      // Filter campaigns by email if email is provided
      const userCampaigns = await campaignCollection.find({ userEmail: email }).toArray();
      res.send(userCampaigns);
    });

    // Route to get a specific campaign by ID
    app.get('/campaigns/:id', async (req, res) => {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid campaign ID" });
      }
      const query = { _id: new ObjectId(id) };
      try {
        const result = await campaignCollection.findOne(query);
        if (!result) {
          return res.status(404).send({ error: "Campaign not found" });
        }
        res.send(result);
      } catch (error) {
        console.error("Error in /campaigns/:id:", error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    // Route to create a new campaign
    app.post('/campaigns', async (req, res) => {
      const newCampaign = req.body;
      const result = await campaignCollection.insertOne(newCampaign);
      res.send(result);
    });

    // Route to create a new user
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      console.log('Adding new user', newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    // Route to create a new donation
    app.post('/donation', async (req, res) => {
      const donation = req.body;
      const result = await donationCollection.insertOne(donation);
      res.send(result);
    });

    // Route to get donations by email
    app.get('/donation', async (req, res) => {
      const email = req.query.email;
      if (!email) {
        return res.status(400).send({ error: "Email is required" });
      }
      const donations = await donationCollection.find({ userEmail: email }).toArray();
      res.send(donations);
    });

    // Route to update a campaign
    app.put('/campaigns/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = { $set: req.body };
      const result = await campaignCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    });

    // Route to delete a campaign
    app.delete("/campaigns/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await campaignCollection.deleteOne(query);
      res.send(result);
    });

  } catch (err) {
    console.error(err);
  } finally {
    // Ensure that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
