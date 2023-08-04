import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Author } from "../entities/Author";
import { ResponseUtl } from "../utils/Respone";
import { Paginator } from "../database/Paginator";

export class AuthorsController {
  async getAuthors(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Author).createQueryBuilder().orderBy("id", "DESC");
    const { records: authors, paginationInfo } = await Paginator.paginate(builder, req);
    return ResponseUtl.sendRespone(res, "Fetch author successfully", authors, paginationInfo);
  }

  async getAuthorByID(req: Request, res: Response) {
    const { id } = req.params;

    const author = await AppDataSource.getRepository(Author).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtl.sendRespone<Author>(res, "Fetch author successfuly", author);
  }
}
