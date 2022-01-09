import { render, screen } from '@testing-library/react';
import LoginForm from './index';

test('Login test', () => {
  render(<LoginForm />);
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug();
});
