import express from 'express';
import cors from 'cors';
import { Collection } from "mongodb";
import { client } from "./db/mongo";

import { Campaign } from "./types/Campaign";
import { CampaignService } from "./services/campaign.service";
import { CampaignController } from "./controllers/campaign.controller";

const app = express();
const port: number = Number(process.env.PORT) || 5000;


import { Donation } from "./types/Donation";
import { DonationService } from "./services/donation.service";
import { DonationController } from "./controllers/donation.controller";
import { User } from "./types/User";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";


// Middleware
app.use(cors());
app.use(express.json());


async function run() {
  try {
    // await client.connect();
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const campaignCollection: Collection<Campaign> = client.db('crowdDB').collection<Campaign>('campaigns');
    const userCollection: Collection<User> = client.db('crowdDB').collection<User>('users');
    const donationCollection: Collection<Donation> = client.db('crowdDB').collection<Donation>('donations');

    const campaignService = new CampaignService(campaignCollection);
    const campaignController = new CampaignController(campaignService);
    const userService = new UserService(userCollection);
    const userController = new UserController(userService);
    const donationService = new DonationService(donationCollection);
    const donationController = new DonationController(donationService);
    // Route to get all campaigns
    app.get("/campaigns", campaignController.getAll);
    app.get("/campaigns/:id", campaignController.getById);
    app.post("/campaigns", campaignController.create);
    app.put("/campaigns/:id", campaignController.update);
    app.delete("/campaigns/:id", campaignController.delete);

    // Route to create a new user
    app.post("/users", userController.create);


    // Route to create a new donation
    app.post("/donation", donationController.create);
    app.get("/donation", donationController.getByEmail);


  } catch (err) {
    console.error(err);
  } finally {
    // Ensure that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from crowd cube server!!!');
});

app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
