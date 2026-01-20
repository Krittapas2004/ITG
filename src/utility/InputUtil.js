export const inputNoTH = (value) => {
    if (typeof value !== 'string') return "";

    return value
        .toUpperCase()
        .replace(/[^A-Z0-9\s\-_./@#]/g, "");
}