import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail, IsOptional } from "class-validator";

export class CreateAuthorDTO {
  id?: Number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: String;

  @IsEmail()
  @IsNotEmpty()
  email: String;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  bio?: String;
}
