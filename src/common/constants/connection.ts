export const connection: Connection = {
    CONNECTION_STRING: 'CONNECTION_STRING',
    DB: 'POSTGRES',
    DBNAME: 'NESTJS',
};
export type Connection = {
    CONNECTION_STRING: string;
    DB: string;
    DBNAME: string;
};