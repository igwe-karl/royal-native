import { IOrders } from "@/utils/types";
import { api } from "./client";

export const getOrder = async (id: string) => {
    const res = await api.get(`/orders/${id}`);
    return res.data;
};

export const getOrders = async () => {
    const res = await api.get('/orders');
    return res.data;
};

export const createOrder = async (data: IOrders) => {
    const res = await api.post("/orders", data);
    return res.data;
};

export const updateOrder = async (orderId: string, payload: Partial<IOrders>) => {
    const res = await api.put(`/orders/${orderId}`, payload);
    return res.data;
};