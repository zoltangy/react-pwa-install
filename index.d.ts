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
    featuresTitle?: string,
    description?: string;
    descritpionTitle?: string,
    instructionTitle?: string,
    instructionActionOk?: string,
    instructionActionCancel?: string,
    instructionActionInstall?: string,
    instructionIdeviceAction1?: string,
    instructionIdeviceAction2?: string,
    instructionFirefoxAction1?: string,
    instructionFirefoxAction2?: string,
    instructionFirefoxNewAction1?: string,
    instructionFirefoxNewAction2?: string,
    instructionOperaAction1?: string,
    instructionOperaAction2?: string,
    instructionNotSupported?: string,
  }) => Promise<void>;
};

/**
 * Context provider for react-pwa-install
 *
 *  See: https://www.npmjs.com/package/react-pwa-install for more info.
 */
export const ReactPWAInstallProvider: React.FC<{ enableLogging?: boolean }>;
export default ReactPWAInstallProvider;
