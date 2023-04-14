import { createContext } from 'react';

const ColorSchemeContext = createContext({
  colorScheme: 'light',
  toggleColorScheme: () => {},
});

export default ColorSchemeContext;