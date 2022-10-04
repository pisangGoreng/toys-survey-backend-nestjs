import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReceiptCreateDto {
  @IsNotEmpty()
  @IsString()
  receipt_no: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  employee_id: number;

  @IsNotEmpty()
  @IsNumber()
  rating: number;
}
