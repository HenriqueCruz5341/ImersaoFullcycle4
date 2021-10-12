import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAccountDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  balance: number;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  subdomain: string;
}
