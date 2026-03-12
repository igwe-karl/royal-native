import { api } from "./client"

export const fundWallet = (amount: number) => {
    const res = api.post('/paystack/pay', { amount })
    return res
}

export const withdraw = (amount: number) => {
    const res = api.post('/withdraw', { amount })
    return res
}