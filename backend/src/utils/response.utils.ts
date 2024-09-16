import { Request, Response } from "express";

export const sendResponse = (statusCode: number,response: Response,data: any) => {
    return response.status(statusCode).json(data);
}

export const sendError = (statusCode: number, response:Response, data: any)=> {
    return response.status(statusCode).json(data);
}

