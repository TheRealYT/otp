export type RequestBodyItem = {
    name: string
    type: string
    required: boolean
    detail: string
    values?: string[]
}

export type ResponseBodyItem = {
    name: string
    type: string
    detail: string
    values?: string[]
}

export type ErrorResponseBody = {
    status: number
    text: string
    body: ResponseBodyItem[]
}

export type Endpoint = {
    name: string
    method: string
    path: string
    detail: string
    baseUrl?: string
    req: RequestBodyItem[]
    res: ResponseBodyItem[]
    error?: ErrorResponseBody[]
    code: string
}