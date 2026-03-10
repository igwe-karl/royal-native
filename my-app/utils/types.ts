import { orderStatus } from "@/app/enums/orders.enum";

export interface IOrders {
    id: string;
    user_id: string;
    receiver_id: string;
    carrier_id: string;
    transaction_id: string;
    amount: number;
    status: orderStatus;
    description: string;
    order_type: string;
    origin_address: string;
    destination_address: string;
    origin_latitude: number;
    origin_longitude: number;
    destination_latitude: number;
    destination_longitude: number;
    ride_time: string;
    first_name: string;
    last_name: string;
    email: string;
    item_value: string;
    item_weight: string;
    additional_info: string;
    corespondant_name: string; // fallback if receiver not registered
    corespondant_phone: string;
    isUserRecipient: boolean;
    pickup_otp: number;
    dropoff_otp: number;
    receiver_name: string;
    receiver_phone: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
  }