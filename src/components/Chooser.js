import React, { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import * as v from '../util/utils';

export default function Chooser (props) {

    const [data, setData] = useState(props.data);
    const [values, setValues] = useState(props.data.value);
    const [error, setError] = useState(props.data.error);

    const handleChange = (event) => {
        const code = event.target.value;

        const updatedValues = {...values, [code]:event.target.checked};
        setValues(updatedValues);
        
        const error = v.check(updatedValues, props.field.label, props.field.validationCheck);
        setError(error);

        const updated = {...data, value: updatedValues, error};
        setData(updated);

        props.update(updated); 
    };

    return (
        <FormControl component="fieldset" required error={Boolean(error)}>
            <FormLabel component="legend">{props.field.label}</FormLabel>
            <FormGroup>
                {props.options.map(opt => <FormControlLabel
                    key={opt.code}
                    value={opt.code}
                    onChange={handleChange}
                    name={opt.name}
                    control={<Checkbox color="primary" />}
                    label={`${opt.name} (${opt.code})`}
                    labelPlacement="end"
                />
            )}
            </FormGroup>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    )
}
