import { render, screen } from '@testing-library/react';
import DataFetcher from './index';

test('renders data fetcher component', () => {
  const testProps = {
    resourceUrl: '/api/users',
    resourceName: 'users',
    resourceParams: {},
    children: null,
  };
  render(<DataFetcher {...testProps} />);
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug();
});
