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
import { validateOrReject, validate, isAlpha, isEmail } from "class-validator";

export class AuthorsController {
  //get All Authors
  async getAuthors(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Author).createQueryBuilder().orderBy("id", "DESC");
    const { records: authors, paginationInfo } = await Paginator.paginate(builder, req);
    return ResponseUtl.sendResponse(res, "Fetch author successfully", authors, paginationInfo);
  }

  //get author by ID
  async getAuthorByID(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const author = await AppDataSource.getRepository(Author).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtl.sendResponse<Author>(res, "Fetch author successfuly", author);
  }

  //Create Author
  async createAuthor(req: Request, res: Response): Promise<Response> {
    try {
      const authorData = req.body;
      const repo = AppDataSource.getRepository(Author);

      // Call DTO and setup errors DTO
      const dto = new CreateAuthorDTO();
      Object.assign(dto, authorData);
      const errors = await validate(dto);
      // Check Email Duplicate
      authorData.email = authorData.email.trim();
      const existingAuthor = await repo.findOne({
        where: { email: authorData.email },
      });

      if (existingAuthor) {
        errors.push({ property: "email", constraints: { isUnique: "Email must be unique" } });
        return ResponseUtl.sendError(res, "Email already exists", 422, errors);
      }

      //Check Valid Email
      if (!isEmail(authorData.email)) {
        {
          return ResponseUtl.sendError(res, "Email Invalid", 422, errors);
        }
      }

      //Check Valid Name
      authorData.name = authorData.name.trim();
      if (!isAlpha(authorData.name.replace(/\s+/g, ""))) {
        ResponseUtl.sendError(res, "Name must contain only letters (a-zA-Z)", 422, errors);
      }

      // Check Name Length
      if (authorData.name.length > 50 || authorData.name.length < 3) {
        return ResponseUtl.sendError(res, "Name must not exceed 50 characters and > 3 characters", 422, errors);
      }
      if (errors.length > 0) {
        return ResponseUtl.sendError(res, "Invalid Data", 422, errors);
      }

      // Create and save the new author
      const author = repo.create(authorData);
      await repo.save(author);

      return ResponseUtl.sendResponse(res, "Create Successfully new Author", author, 200);
    } catch (error) {
      // Handle any errors (500)
      console.error("Error in createAuthor:", error);
      return ResponseUtl.sendError(res, "An unexpected error occurred", 500, error);
    }
  }
}
