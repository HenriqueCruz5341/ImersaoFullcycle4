import {
  IsIn,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  TransactionCategory,
  TransactionCategoryList,
  TransactionType,
  TransactionTypeList,
} from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsISO8601()
  payment_date: Date;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsIn(TransactionCategoryList)
  @IsNotEmpty()
  category: TransactionCategory;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsIn(TransactionTypeList)
  @IsNotEmpty()
  type: TransactionType;
}
