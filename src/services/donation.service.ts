import { Collection } from "mongodb";
import { Donation } from "../types/Donation";

export class DonationService {
  constructor(private collection: Collection<Donation>) {}

  create(donation: Donation) {
    return this.collection.insertOne({
      ...donation,
      donatedAt: new Date()
    });
  }

  getByEmail(email: string) {
    return this.collection.find({ userEmail: email }).toArray();
  }
}
