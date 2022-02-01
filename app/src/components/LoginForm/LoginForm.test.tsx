import { render, screen } from '@testing-library/react';
import LoginForm from './index';

test('Login test', () => {
  render(<LoginForm />);
  screen.debug();
});
