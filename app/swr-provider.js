'use client';
import { SWRConfig } from 'swr'
export const SWRProvider = ({ children }) => {
  return <SWRConfig>{children}</SWRConfig>
};