import { IOrders } from "@/utils/types"
import { api } from "./client"

export const getOrder = async () => {
    const res = await api.get('/users')
    return res
}

export const createOrder = async (data: IOrders) => {
    const res = api.post(`/orders`, data)
    return res
}

export const updateOrder = (orderId: string, payload: IOrders) => {
    const res = api.put(`./order${orderId}`)
    return res
}