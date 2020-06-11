import mysql, {FieldInfo} from "mysql";
import {isObject} from "../generics/functions";

export const databasePool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3311,
    user: 'admin',
    password: '123',
    database: 'transcom-app-local'
});

export const query = async (sql: string, values?: any): Promise<{ rows: Array<any>, fields: FieldInfo[] | undefined }> => {
    return await new Promise((resolve, reject) => {
        if (!!values && isObject(values)) {
            let newSQL = sql;
            let newValues = [];
            let pos: number = newSQL.search(/:(\w)/i);

            while (pos > 0) {
                const len: number = newSQL.substr(pos).search(/\s/);
                const label = len > 0 ? newSQL.substr(pos + 1, len - 1) : newSQL.substr(pos +1);
                if (values.hasOwnProperty(label)) {
                    newValues.push(values[label]);
                } else {
                    throw Error(label + " does not exist in values for " + sql);
                }

                newSQL = newSQL.substr(0, pos) + '?' + (len > 0 ? newSQL.substr(pos + len) : "");

                pos = newSQL.search(/:(\w)/i);
            }

            databasePool.query(newSQL, newValues, (err, rows, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({rows: rows, fields: fields});
                }
            });
        } else {
            databasePool.query(sql, values, (err, rows, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({rows: rows, fields: fields});
                }
            });
        }
    });
}
