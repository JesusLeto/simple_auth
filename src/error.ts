export class ApiError extends Error{
    status:number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status
    }

    static Unauthorized() {
        return new ApiError("Не авторизован", 401)
    }

    static BadRequest(message: string) {
        return new ApiError(message, 400)
    }

}
