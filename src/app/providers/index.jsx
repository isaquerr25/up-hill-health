'use client';

import { SearchProvider } from '../context/search';
import ReactQueryProvider from './reactQuery';

export default function Providers({ children }) {
  return (
    <ReactQueryProvider>
      <SearchProvider>{children}</SearchProvider>
    </ReactQueryProvider>
  );
}
