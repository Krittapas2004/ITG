export const InputMode = {
    NO_THAI: 'NO_THAI',
    ONLY_NUMBER: 'ONLY_NUMBER',
    UPPERCASE: 'UPPERCASE'
};

export const inputFormat = (value, mode) => {
    if (typeof value !== 'string') return "";

    switch (mode) {
        case InputMode.NO_THAI:
            return value
                .toUpperCase()
                .replace(/[^A-Z0-9\s\-_./@#]/g, "");

        case InputMode.ONLY_NUMBER:
            return value.replace(/[^0-9.]/g, "");

        case InputMode.UPPERCASE:
            return value.toUpperCase();

        default:
            return value;
    }
};