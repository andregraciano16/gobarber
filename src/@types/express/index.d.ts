declare namespace Express {
    // Concatena o usuario para poder ser achado no request do express
    export interface Request {
        user: {
            id: string;
        };
    }
}
