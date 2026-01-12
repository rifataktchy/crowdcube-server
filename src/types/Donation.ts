import { ObjectId } from "mongodb";

export interface Donation {
  _id?: ObjectId;
  campaignId: string;
  userEmail: string;
  amount: number;
  donatedAt?: Date;
}
