import { Request, Response } from "express";
import { CampaignService } from "../services/campaign.service";
import { ObjectId } from "mongodb";

export class CampaignController {
  constructor(private service: CampaignService) {}

  getAll = async (
    req: Request<{}, {}, {}, { email?: string }>,
    res: Response
  ) => {
    const result = await this.service.getAll(req.query.email);
    res.send(result);
  };

  getById = async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid campaign ID" });
    }

    const result = await this.service.getById(id);

    if (!result) {
      return res.status(404).send({ error: "Campaign not found" });
    }

    res.send(result);
  };

  create = async (req: Request, res: Response) => {
    const result = await this.service.create(req.body);
    res.send(result);
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    const result = await this.service.update(req.params.id, req.body);
    res.send(result);
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    const result = await this.service.delete(req.params.id);
    res.send(result);
  };
}
