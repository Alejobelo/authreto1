import { IsEmail } from 'class-validator';

export class IsAvaibleAuthDto {
  @IsEmail()
  email: string;
}
