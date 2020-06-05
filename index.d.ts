/**
 * A hook that provides:
 *  - supported
 *  - isInstalled
 *  - pwaInstall
 *
 *  See: https://www.npmjs.com/package/react-pwa-install for more info.
 */
export function useReactPWAInstall(): {
  supported: () => boolean;
  isInstalled: () => boolean;
  pwaInstall: (options: {
    title?: string;
    logo?: string;
    features?: React.ReactNode;
    description?: string;
  }) => Promise<void>;
};

/**
 * Context provider for react-pwa-install
 *
 *  See: https://www.npmjs.com/package/react-pwa-install for more info.
 */
export const ReactPWAInstallProvider: React.FC<{ enableLogging?: boolean }>;
export default ReactPWAInstallProvider;
