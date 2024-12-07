const express = require('express')
const cors = require('cors')
require('dotenv').config()
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())



 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0bvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  // const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0bvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB ya!");
    
    const campaignCollection = client.db('ccubeDB').collection('campaigns');
    const userCollection = client.db('ccubeDB').collection('users');
    const donateCollection = client.db('ccubeDB').collection('donate');
//get all campaign data
    app.get('/campaigns', async (req, res) => {
      const cursor = campaignCollection.find();
      const result = await cursor.toArray();
      res.send(result);
  });
  //get id specific data
  app.get('/campaigns/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await campaignCollection.findOne(query);
    res.send(result);
})
// //get data for my campaign
// app.get("/campaigns/:email", async (req, res, next) => {
//   const email = req.params.email;

//   const userCampaigns = await campaignCollection.find({ userEmail: email }).toArray();
//   res.send(userCampaigns);
// });
  //send all campaign data
    app.post('/campaigns', async (req, res) => {
      const newCampaign = req.body;
      const result = await campaignCollection.insertOne(newCampaign);
              res.send(result);
          });
          //update campaign
          app.put('/campaigns/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: req.body
            }

            const result = await campaignCollection.updateOne(filter, updatedDoc, options)

            res.send(result);
        })  

        // users related apis
        app.post('/users', async (req, res) => {
          const newUser = req.body;
          console.log('Adding new user', newUser)

          const result = await userCollection.insertOne(newUser);
          res.send(result);
      });
      //send donate data
      app.post('/donated', async (req, res) => {
        const donation = req.body;
    
        const result = await client.db("ccubeDB").collection("donate").insertOne(donation);
        res.send(result);
    });
    //get donate data
    app.get('/myDonations', async (req, res) => {
      const email = req.query.email;
  
      if (!email) {
          return res.status(400).send({ error: "Email is required" });
      }
  
      const donations = await client
          .db("ccubeDB")
          .collection("donate")
          .find({ userEmail: email })
          .toArray();
  
      res.send(donations);
  });
    app.delete("/campaigns/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
         const result = await client.db("ccubeDB").collection("campaigns").deleteOne(query);
         res.send(result);
          });

           

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on portss ${port}`)
  })