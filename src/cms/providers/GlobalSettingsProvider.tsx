import React, { createContext, useContext } from 'react';
import type { SeoGlobal, FooterConfig } from '../schemas/validation';

interface GlobalSettingsContextValue {
  seoGlobal: SeoGlobal;
  footerConfig: FooterConfig;
}

const GlobalSettingsContext = createContext<GlobalSettingsContextValue | null>(null);

export function GlobalSettingsProvider({
  seoGlobal,
  footerConfig,
  children,
}: {
  seoGlobal: SeoGlobal;
  footerConfig: FooterConfig;
  children: React.ReactNode;
}) {
  return (
    <GlobalSettingsContext.Provider value={{ seoGlobal, footerConfig }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
}

export function useGlobalSettings() {
  return useContext(GlobalSettingsContext);
}
