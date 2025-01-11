
export class UserDataInOrder {
    fullName: string;
    password: string;
    email: string;
    address: string
}
export class OrderItems {
    name: string;
    price: number;
    quantity: number;
    image: string;
    description: string
}
export class RabitMQDataPlaceOrder {
    type?: 'CREATE_ORDER' | 'DELETE_ORDER';
    userData: UserDataInOrder;
    userEmail: string;
    address: string;
    fullName: string;
    totalPrice: number;
    items: OrderItems[];
    foreignId: number

}

export class RabitMQDataDeleteOrder {
    type?: 'CREATE_ORDER' | 'DELETE_ORDER';
    foreignId: number

}


