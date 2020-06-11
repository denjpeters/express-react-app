import {query, TQueryResults} from "./mysqlConnection";

export namespace SQL {
    export const Execute = async <T>(sql: string, binders: any = {}): Promise<TQueryResults<T>> => {
        return await new Promise((resolve, reject) => {
            query(sql, binders)
                .then((data: TQueryResults<T>) => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }
}
