export interface Store {
    title: string;
    logo: string;
    favicon: string;
    slogan: string;
    phone: string;
    whatsapp: string;
    fb: string;
    insta: string;
    email: string;
    address: string;
    map: string;
    directions: string;
    payments: Payment[];
    categories: Category[];
    ship: number;
}
export interface Payment {
    name: string;
    icon: string;
}
export interface Category {
    name: string;
    icon: string;
}
export interface Product {
    cod: string;
    store: string;
    category: string;
    name: string;
    imgs: string[];
    sizes: {
        name: string;
        value: number;
    }[];
    unity: string;
    extras: {
        name: string;
        value: number;
    }[];
    optional: string[];
}
export interface Order {
    products: OrderItem[];
}
export interface OrderItem {
    cod: string;
    img: string;
    name: string;
    size: string;
    total: number;
    value: number;
    extras: {
        name: string;
        value: number;
    }[];
    removed: string[];
    quantity: number;
    observations: string;
}
export interface User {
    uid: string;
    name: string;
    phone: string;
    email: string;
    address: Address[];
    avatar: string;
    pushID: string;
}
export interface Address {
    name: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
}
