import { IsString, IsNumber, IsNotEmpty, IsEnum, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ArtCategory } from '../entities/art.entity';

export class CreateArtDto {
  @ApiProperty({ example: 'Sunset Painting' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'A beautiful sunset over the ocean.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: '/uploads/image.jpg', required: false })
  @IsString()
  imageUrl: string;

  @ApiProperty({ enum: ArtCategory })
  @IsEnum(ArtCategory)
  category: ArtCategory;
}
