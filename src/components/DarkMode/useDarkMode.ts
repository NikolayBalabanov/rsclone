// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

export default function useDarkMode() {
  const root = window.document.documentElement as HTMLElement;
  root.classList.toggle('dark');
}
