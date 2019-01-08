import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Index from './modules/router';

export default function App() {
  return (
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  );
}
