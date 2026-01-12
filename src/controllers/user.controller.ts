import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private service: UserService) {}

  create = async (req: Request, res: Response) => {
    const result = await this.service.create(req.body);
    res.send(result);
  };
}
