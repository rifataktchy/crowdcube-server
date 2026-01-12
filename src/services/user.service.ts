import { Collection } from "mongodb";
import { User } from "../types/User";

export class UserService {
  constructor(private collection: Collection<User>) {}

  create(user: User) {
    return this.collection.insertOne({
      ...user,
      createdAt: new Date()
    });
  }
}
