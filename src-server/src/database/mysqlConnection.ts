import mysql from "mysql";
// import util from "util";

export const databasePool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3311,
    user: 'admin',
    password: '123',
    database: 'transcom-app-local'
});

// databasePool.query = util.promisify(databasePool.query);
// databasePool.query = util.promisify(
//     (err, rows, fields) => databasePool.query(
//         rows,
//         fields,
//         (err, ...results) => cb(err, results)
//     ));

function isPlainObject(input) {
    return !!input && !Array.isArray(input) && typeof input === 'object';
}

databasePool.queryParms = async (sql: string, values?: object | []): Promise<any> => {
    return await new Promise((resolve, reject) => {
        if (!values) {
            databasePool.query(sql, values, (err, rows, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({rows: rows, fields: fields});
                }
            });

            return;
        }

        let newSQL = sql;
        let newValues = values;

        // if (isPlainObject(values)) {
        //     while (const pos = newSQL.search(':'))
        // }

        databasePool.query(newSQL, newValues, (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve({rows: rows, fields: fields});
            }
        });
    });
}
