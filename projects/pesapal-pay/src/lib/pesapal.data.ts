export interface IPayments {
    id: string
    amount: number
    currency: string
    description: string
    notification_id: string
        phone_number: string
        email_address: string
        country_code: string
        first_name: string
        middle_name: string
        last_name: string
        line_1: string
        line_2: string
        city: string
        state: string
        postal_code: string
        zip_code: string
}

export interface IIpn {
    url: string
    ipn_notification_type: string
}

export interface IKeys {
    consumer_key: string
    consumer_secret: string
}