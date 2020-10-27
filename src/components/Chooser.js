import React, { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function Chooser (props) {

    const [data, setData] = useState(props.data);
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        const code = event.target.value;
    
        const value = { ...data.value, [code]:event.target.checked};
        setData({...data, value});
        setError(Object.entries(value).filter(([key, value]) => value ===true).length > 0 ? '': 'Atleast one position needs to be selected.');
     };

     useEffect(() => {
         props.update(data);
     }, [data]);

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
