import React, { useState, useEffect } from 'react';
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Paper,
} from '@mui/material';

interface Props {
  choices: string[];
  value: string;
  setValue: Function;
  children?: React.ReactNode;
}

export default function MultipleChoice(props: Props) {
  const { value, choices, setValue } = props;
  const [radioValue, setRadioValue] = useState('');

  useEffect(() => {
    setRadioValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    setValue((event.target as HTMLInputElement).value);
  };

  const RenderChoices = () =>
    choices.map((choice: string, index) => (
      <Grid item sm={12} md={6} key={choice}>
        <Paper variant="outlined">
          <FormControlLabel
            value={choice}
            control={<Radio />}
            label={choice}
            sx={{ p: 2, height: '100%', width: '100%' }}
            tabIndex={index + 1}
          />
        </Paper>
      </Grid>
    ));

  return (
    <FormControl component="fieldset" sx={{ width: '100%' }}>
      <FormLabel component="legend" sx={{ displayPrint: 'none' }}>
        Choices
      </FormLabel>
      <RadioGroup
        aria-label="choices"
        defaultValue=""
        name="radio-buttons-group"
        value={radioValue}
        onChange={handleChange}
      >
        <Grid container spacing={2}>
          {RenderChoices()}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}
