import { getToken } from "./getToken"

export const getHeaders = () => {
    return {
        headers: {
            token:
                "Bearer " + getToken(),
        }
    }
}

