import React, { createContext, useContext } from 'react';
import type { PublicSiteBundle } from '../lib/publicCmsClient';

const CMSDataContext = createContext<PublicSiteBundle | null>(null);

export function CMSDataProvider({
  bundle,
  children,
}: {
  bundle: PublicSiteBundle;
  children: React.ReactNode;
}) {
  return (
    <CMSDataContext.Provider value={bundle}>
      {children}
    </CMSDataContext.Provider>
  );
}

export function useCMSData() {
  return useContext(CMSDataContext);
}
