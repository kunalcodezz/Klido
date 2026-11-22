import React, { createContext, useContext, useEffect } from 'react';
import type { DesignTokens } from '../schemas/validation';

const DesignTokenContext = createContext<DesignTokens | null>(null);

export function DesignTokenProvider({
  tokens,
  children,
}: {
  tokens: DesignTokens;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!tokens) return;
    const root = document.documentElement;
    const { colors, layout, typography, buttons } = tokens;

    if (colors) {
      if (colors.primary) root.style.setProperty('--accent-primary', colors.primary);
      if (colors.primaryHover) root.style.setProperty('--accent-hover', colors.primaryHover);
      if (colors.accent) root.style.setProperty('--accent-lime', colors.accent);
      if (colors.secondary) root.style.setProperty('--ink-primary', colors.secondary);
      if (colors.text) root.style.setProperty('--ink-primary', colors.text);
      if (colors.mutedText) root.style.setProperty('--ink-muted', colors.mutedText);
      if (colors.background) root.style.setProperty('--bg-canvas', colors.background);
      if (colors.surface) root.style.setProperty('--bg-subtle', colors.surface);
      if (colors.border) root.style.setProperty('--border-hairline', colors.border);
    }

    if (layout) {
      if (layout.containerMaxWidthPx) {
        root.style.setProperty('--container-max-w', `${layout.containerMaxWidthPx}px`);
      }
      if (layout.globalRadiusPx) {
        root.style.setProperty('--global-radius', `${layout.globalRadiusPx}px`);
      }
    }

    if (buttons) {
      if (buttons.radiusPx !== undefined) {
        root.style.setProperty('--btn-radius', `${buttons.radiusPx}px`);
      }
    }

    if (typography) {
      if (typography.bodyFont) {
        root.style.setProperty('--font-body', typography.bodyFont);
      }
      if (typography.headingFont) {
        root.style.setProperty('--font-heading', typography.headingFont);
      }
    }
  }, [tokens]);

  return (
    <DesignTokenContext.Provider value={tokens}>
      {children}
    </DesignTokenContext.Provider>
  );
}

export function useDesignTokens() {
  return useContext(DesignTokenContext);
}
