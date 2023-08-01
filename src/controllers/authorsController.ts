import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Author } from "../entities/Author";
import { ResponseUtl } from "../utils/Respone";

export class AuthorsController {
  async getAuthors(req: Request, res: Response) {
    const authors = await AppDataSource.getRepository(Author).find();

    return ResponseUtl.sendRespone(res, "Fetch author successfully", authors, null);
  }

  async getAuthorByID(req: Request, res: Response) {
    const { id } = req.params;

    const author = await AppDataSource.getRepository(Author).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtl.sendRespone<Author>(res, "Fetch author successfuly", author);
  }
}
