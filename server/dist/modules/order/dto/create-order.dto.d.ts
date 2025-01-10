declare class OrderItemDto {
    artId: number;
    quantity: number;
}
export declare class CreateOrderDto {
    fullname: string;
    phone: string;
    address: string;
    items: OrderItemDto[];
}
export {};
