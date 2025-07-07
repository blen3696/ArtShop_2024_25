import { IsString, IsNotEmpty, IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  artId: number;

  @ApiProperty({ example: 2, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'Ruth Ambaw' })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ example: '+251912345678' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Bole, Addis Ababa, Ethiopia' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: [OrderItemDto],
    example: [{ artId: 1, quantity: 2 }, { artId: 3, quantity: 1 }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
