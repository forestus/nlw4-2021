import "reflect-metadata"
import express, { NextFunction, Request, Response } from 'express'
import "express-async-errors"
import createConnection from "./database"
import { router } from "./routes"
import { AppError } from "./errors/AppError"

createConnection();
const server = express()
server.use(express.json());
server.use(router)

server.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }
    return response.status(500).json({
        status: "Error",
        message: `Internal Server Error ${err.message}`
    })
})

export { server }