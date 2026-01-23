export const InputMode = {
    NO_THAI_UPPERCASE: 'NO_THAI_UPPERCASE',
    NO_THAI: 'NO_THAI',
    ONLY_NUMBER: 'ONLY_NUMBER',
    UPPERCASE: 'UPPERCASE',
    NO_INPUT: 'NO_INPUT'
};

export const inputFormat = (value, mode) => {
    if (typeof value !== 'string') return "";

    switch (mode) {
        case InputMode.NO_THAI_UPPERCASE:
            return value
                .toUpperCase()
                .replace(/[^A-Z0-9\s\-_./@#]/g, "");
        case InputMode.NO_THAI:
            return value
                .replace(/[^A-Z0-9\s\-_./@#]/g, "");
        case InputMode.ONLY_NUMBER:
            return value.replace(/[^0-9.]/g, "");

        case InputMode.UPPERCASE:
            return value.toUpperCase();
        case InputMode.NO_INPUT:
            return null;
        default:
            return value;
    }
};