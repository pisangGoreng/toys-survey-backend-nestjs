import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class StoreCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Location must be at least 4 characters' })
  location: string;

  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  long: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Address must be at least 10 characters' })
  address: string;
}
