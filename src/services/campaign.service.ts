import { Collection, ObjectId } from "mongodb";
import { Campaign } from "../types/Campaign";

export class CampaignService {
  constructor(private collection: Collection<Campaign>) {}

  getAll(email?: string) {
    if (email) {
      return this.collection.find({ userEmail: email }).toArray();
    }
    return this.collection.find().toArray();
  }

  getById(id: string) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  create(data: Campaign) {
    return this.collection.insertOne({
      ...data,
      createdAt: new Date(),
      raisedAmount: 0
    });
  }

  update(id: string, data: Partial<Campaign>) {
    return this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
  }

  delete(id: string) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}
