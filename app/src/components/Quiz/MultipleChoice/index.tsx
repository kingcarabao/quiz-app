import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Paper } from '@mui/material';
import Choice from '../Choice';

interface Props {
    choices: String[];
    value: string;
    setValue: Function;
    children?: React.ReactNode;
}

export default function MultipleChoice(props: Props) {
    const { choices, setValue } = props;
    const [radioVal, setRadioVal] = useState('');
    console.log(choices);
    useEffect(() => {
        setValue(radioVal);
    }, [radioVal])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioVal((event.target as HTMLInputElement).value);
    };

    const RenderChoices = () => {
        // return (
        //     {
        //         choices.map((choice) => (
        //             <Paper>
        //                 <FormControlLabel value={choice} control={<Radio />} label={} />
        //             </Paper>
        //         ));
        //     }
        // )
        return null;
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ displayPrint: 'none' }}>Choices</FormLabel>
            <RadioGroup
                aria-label="choices"
                defaultValue=""
                name="radio-buttons-group"
                value={radioVal}
                onChange={handleChange}
            >
                {RenderChoices()}
            </RadioGroup>
        </FormControl>
    )
};
