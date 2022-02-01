import { render, screen } from '@testing-library/react';
import MultipleChoice from './index';

test('on change, returns a value', () => {
  const testProps = {
    choices: ['apple', 'banana', 'orange', 'grape'],
    value: '',
    setValue: () => '',
  };
  render(<MultipleChoice {...testProps} />);
});
