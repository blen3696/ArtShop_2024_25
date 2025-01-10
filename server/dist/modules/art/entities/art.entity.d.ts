export declare enum ArtCategory {
    SCULPTURE = "sculpture",
    PAINTING = "painting",
    NATURE = "nature"
}
export declare class Art {
    id: number;
    title: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
    category: ArtCategory;
    inStock: boolean;
}
