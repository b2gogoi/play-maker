export const types = {
    REQUIRED: 'required', 
    NUM_ONLY: 'number',
    HEIGHT: 'height',
    NAME: 'name'
};

export const positions = [
    {name: 'Point Gaurd', code: 'PG'},
    {name: 'Shooting Gaurd', code: 'SG'},
    {name: 'Small Forward', code: 'SF'},
    {name: 'Power Forward', code: 'PF'},
    {name: 'Center', code: 'C'}
]

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

                if (typeof value === 'string') {
                    if (!value.trim()) {
                        error = `${label} is required`;
                    }
                } else {
                    const positions = Object.entries(value);
                    const selectedPositions = positions.filter(([key, value]) => value ===true);
                    console.log('selectedPositions : ', selectedPositions);
                    error = Object.entries(value).filter(([key, value]) => value ===true).length > 0
                    ? '': `Atleast one ${label} needs to be selected.`
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