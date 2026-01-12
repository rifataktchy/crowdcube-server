import { Request, Response } from "express";
import { DonationService } from "../services/donation.service";

export class DonationController {
  constructor(private service: DonationService) {}

  create = async (req: Request, res: Response) => {
    const result = await this.service.create(req.body);
    res.send(result);
  };

  getByEmail = async (
    req: Request<{}, {}, {}, { email?: string }>,
    res: Response
  ) => {
    const email = req.query.email;

    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }

    const result = await this.service.getByEmail(email);
    res.send(result);
  };
}
