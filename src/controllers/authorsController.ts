//COMMON
import { Request, Response } from "express";
// IMPORT DATA
import { AppDataSource } from "../database/data-source";
//ENTITIES
import { Author } from "../entities/Author";

import { ResponseUtl } from "../utils/Respone";
import { Paginator } from "../database/Paginator";

//DTO
import { CreateAuthorDTO } from "../DTO/CreateAuthor";

//Error
import { validateOrReject, validate } from "class-validator";

export class AuthorsController {
  //get All Authors
  async getAuthors(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Author).createQueryBuilder().orderBy("id", "DESC");
    const { records: authors, paginationInfo } = await Paginator.paginate(builder, req);
    return ResponseUtl.sendRespone(res, "Fetch author successfully", authors, paginationInfo);
  }

  //get author by ID
  async getAuthorByID(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const author = await AppDataSource.getRepository(Author).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtl.sendRespone<Author>(res, "Fetch author successfuly", author);
  }

  //Create Author
  async createAuthor(req: Request, res: Response): Promise<Response> {
    try {
      const authorData = req.body;

      const repo = AppDataSource.getRepository(Author);

      const dto = new CreateAuthorDTO();
      Object.assign(dto, authorData);

      const errors = await validate(dto);
      if (errors.length > 0) {
        return ResponseUtl.sendError(res, "Invalid Data", 422, errors);
      }

      // Check Email Duplicate
      const existingAuthor = await repo.findOne({
        where: { email: authorData.email },
      });
      if (existingAuthor) {
        errors.push({ property: "email", constraints: { isUnique: "Email must be unique" } });
        return ResponseUtl.sendError(res, "Email already exists", 422, errors);
      }

      // Create and save the new author
      const author = repo.create(authorData);
      await repo.save(author);

      return ResponseUtl.sendRespone(res, "Create Successfully new Author", author, 200);
    } catch (error) {
      // Handle any unexpected errors here
      console.error("Error in createAuthor:", error);
      return ResponseUtl.sendError(res, "An unexpected error occurred", 500, null);
    }
  }
}
