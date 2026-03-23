import { sql } from './banco-dados.js';

sql`
    CREATE TABLE videos (
        title             TEXT NOT NULL,
        description       TEXT,
        duration_seconds  INTEGER NOT NULL
    );
`.then(() => {
    console.log('Tabela criada!');
})