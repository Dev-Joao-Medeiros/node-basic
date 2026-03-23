import postgres from "postgres"
import 'dotenv/config'

//process.env => onde as variaveis de ambiente são guardadas

// Pegamos as variáveis do seu .env
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// Montamos a URL sem as opções de "project" (que são só para o Neon)
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;

// Criamos a conexão simples para localhost
const sql = postgres(URL);

export { sql };