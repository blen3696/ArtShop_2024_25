import { ArtCategory } from '../entities/art.entity';
export declare class CreateArtDto {
    title: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
    category: ArtCategory;
}
