import { orderStatus } from "@/app/enums/orders.enum";

export interface IUser {
  id: string;
  email: string;
  fname: string;
  lname: string;
  refer: string;
  pnumber: string;
  status: string;
  transactions: ITransactions;
}

export interface ITransactions {
  id: string;
  user_id: string;
  carrier_id: string;
  order_id: string;
  amount: number;
  status: string;
  type: string;
  created_at: string;
  description: string;
}

export interface IOrders {
  id: string;
  user_id: string;
  receiver_id?: string;
  carrier_id?: string;
  carrier_type: string;
  transaction_id?: string;
  amount: number;
  status?: orderStatus;
  description: string;
  order_type?: string;
  origin_address: string;
  destination_address: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_time: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  item_value: string;
  item_weight: string;
  additional_info: string;
  corespondant_name: string; // fallback if receiver not registered
  corespondant_phone: string;
  isUserRecipient: boolean;
  pickup_otp: number;
  dropoff_otp: number;
  receiver_name?: string;
  receiver_phone?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

/** Offer from Firebase Realtime Database (carrier offers for orders) */
export interface IOffer {
  offerId: string;
  order_id: string;
  offerPrice?: string
  carrierId?: string;
  carrier_email?: string
  carrier_name?: string;
  rating?: number;
  distance?: string;
  duration?: string;
  amount: number | string;
  avatar?: string;
  status?: string;
  [key: string]: unknown;
}

export const CARRIER_TYPES = [
  { id: "bike", label: "Bike", icon: "🏍️" },
  { id: "car", label: "Car", icon: "🚗" },
  { id: "van", label: "Van", icon: "🚐" },
  { id: "mini-truck", label: "Mini Truck", icon: "🚚" },
];