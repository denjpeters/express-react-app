"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFunction2 = exports.isPlainObject = exports.testFunction = void 0;
exports.testFunction = () => {
    console.log('Test function, again');
};
exports.isPlainObject = (value) => {
    return !!value && !Array.isArray(value) && typeof value === 'object';
};
exports.testFunction2 = (sql, values) => {
    if (!exports.isPlainObject(values)) {
        // return workable array or empty set
        return { sql: sql, values: values };
    }
    let newSQL = sql;
    let newArray = [];
    return { sql: newSQL, values: newArray };
};
// export const namedItemResolution = (sql: string, values: any) => {
//     console.log(sql, values);
// }
//# sourceMappingURL=functionality.js.map