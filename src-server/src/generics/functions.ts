export const isObject = (value: any): boolean => {
    return !!value && !Array.isArray(value) && typeof value === "object";
}
