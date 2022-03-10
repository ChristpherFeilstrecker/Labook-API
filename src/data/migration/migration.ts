import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const connection = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_SCHEMA,
          port: 3306,
          multipleStatements: true,
    },
});

export const createTables = async (): Promise<boolean> => {
    try {
        await connection
            .raw(`
            CREATE TABLE labook_users(
                id VARCHAR (64) PRIMARY KEY,
                name VARCHAR (64) NOT NULL,
                email VARCHAR (64) NOT NULL UNIQUE,
                password VARCHAR (64) NOT NULL
                );

                CREATE TABLE labook_posts (
                    id VARCHAR (64) PRIMARY KEY,
                    user_id VARCHAR(64) NOT NULL,
                    photo_url VARCHAR(64) NOT NULL,
                    description TEXT,
                    date_creat VARCHAR(64) NOT NULL,
                    type ENUM("NORMAL","EVENT") DEFAULT "NORMAL",
                    FOREIGN KEY (user_id) REFERENCES labook_users(id)
                    );
           `);

        console.log("Tabelas criadas com sucesso!");
        insertUsers()
        return true;
    } catch (e) {
        const error = e as Error;
        console.log(error);
        return false;
    }
};


const insertUsers = async (): Promise<boolean> => {
    try {
        await connection.raw(`
        INSERT INTO labook_users VALUES (
            "05",
            "Thor",
            "thorrt@gmail.com",
            "$2a$12$LY7WTl2e1STwRMSwr/6VYeDRzHccEM.wxngXsRycgiqY/Pst0daRy"
            ),("07",
            "Thor",
            "thorrrrt@gmail.com",
            "$2a$12$LY7WTl2e1STwRMSwr/6VYeDRzHccEM.wxngXsRycgiqY/Pst0daRy");

            INSERT INTO labook_posts VALUES (
                "001",
                "07",
                "url1",
                "descrição1",
                "data1",
                "NORMAL"
                ),(
                "002",
                "05",
                "url1",
                "descrição1",
                "data1",
                "NORMAL"
                ); 
       `);

        console.log("Usuários e postagens criados com sucesso!");
        closeConnection()
        return true;
    } catch (e) {
        const error = e as Error;
        console.log(error);
        return false;
    }
};

const closeConnection = () => { connection.destroy(); };


