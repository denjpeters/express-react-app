
export const testFunction = () => {
    console.log('Test function, again!!');
}

export const isPlainObject = (value: any) => {
    return !!value && !Array.isArray(value) && typeof value === 'object';
}

export const testFunction2 = (sql: string, values?: object | Array<any>): {sql: string, values?: object | Array<any>} => {
    if (!isPlainObject(values)) {
        // return workable array or empty set
        return {sql: sql, values: values};
    }

    let newSQL = sql;
    let newArray: Array<any> = [];



    return {sql: newSQL, values: newArray};
}

// export const namedItemResolution = (sql: string, values: any) => {
//     console.log(sql, values);
// }
