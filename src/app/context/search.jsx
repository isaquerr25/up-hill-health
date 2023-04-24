'use client';

import { createContext, useState } from 'react';

// cria o contexto
export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [search, setSearch] = useState('');
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
