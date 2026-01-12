import { ObjectId } from "mongodb";

export interface Campaign {
  _id?: ObjectId;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount?: number;
  deadline: string;
  image: string;
  userEmail: string;
  createdAt?: Date;
}
