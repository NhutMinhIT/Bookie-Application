import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Author } from "../entities/Author";

export class AuthorsController {
  async getAuthors(req: Request, res: Response) {
    const authors = await AppDataSource.getRepository(Author).find();

    return res.status(200).json({
      success: true,
      message: " Fetched Authors Successfully",
      data: authors,
    });
  }

  async getAuthorByID(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const author = await AppDataSource.getRepository(Author).findOne({
        where: { id: Number(id) },
      });

      if (!author) {
        return res.status(404).json({
          success: false,
          message: "Author does not exist !!!",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Fetch Author",
        data: author,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching author.",
      });
    }
  }
}
