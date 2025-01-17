/// <reference types="vite/client" />

interface Window {
  solana?: {
    isPhantom?: boolean;
    connect(): Promise<void>;
  };
}
