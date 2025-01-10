interface Product {
    id: number;
    title: string;
    quantity: number;
    price: number;
}
interface OrderHistoryItem {
    id: number;
    products: Product[];
    total: number;
    createdAt: string;
}
declare const getQueryParam3: (param: string) => string | null;
declare const loadOrderDetails: () => Promise<Product | null>;
declare const fetchOrderDetails: (token: string) => Promise<Product[]>;
declare const calculateTotalPrice: (products: Product[]) => number;
declare const renderOrderTable: (products: Product[]) => void;
declare const orderButton: HTMLButtonElement;
declare const renderUserDataForm: () => void;
declare const finishButton: HTMLButtonElement;
declare const handleFinishButtonClick: (product: Product, token: string) => Promise<void>;
declare const userEmailElement1: HTMLElement;
declare const username11: string;
