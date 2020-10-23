

export const types = {
    REQUIRED: 'required', 
    NUM_ONLY: 'number',
    HEIGHT: 'height',
    NAME: 'name'
};

function isNormalInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}

function isTextOnly(str) {
    return /^[a-zA-Z]+$/.test(str);
}

export const check = (value, label, checkTypesList) => {
    let error;

    for (let t of checkTypesList) {
        switch (t) {
            case types.REQUIRED:
                if (!value.trim()) {
                    error = `${label} is required`;
                }
                break;
            
            case types.NUM_ONLY:
                if (!isNormalInteger(value)) {
                    error = `${label} must be a number`;
                }
                break;

            case types.HEIGHT:
                if (parseInt(value) < 100) {
                    error = `${label} must be above 100`;
                }

                if (parseInt(value) > 300) {
                    error = `${label} must be below 300`;
                }
                break;

            case types.NAME:
                    if (!isTextOnly(value.trim())) {
                        error = `${label} can only have letters`;
                    }
    
                    if (value.trim().length > 25) {
                        error = `${label} is too long`;
                    }
                    break;
            default:
                break;
        }
        if (error) {
            break;
        }

    }
    return error;
}