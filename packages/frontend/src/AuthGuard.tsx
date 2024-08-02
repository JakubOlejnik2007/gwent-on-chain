import React, { useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";

import LoginPage from "./components/login/LoginPage";
import { isChainIdSupported } from "./wagmi/is-chain-id-supported";
import { useSiweIdentity } from "ic-use-siwe-identity";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { clear, isInitializing, identity, identityAddress } =
    useSiweIdentity();

  useEffect(() => {
    if (!isConnected && identity) {
      clear();
    }
  }, [isConnected, clear, identity]);

  useEffect(() => {
    if (chain?.id && !isChainIdSupported(chain.id)) {
      clear();
    }
  }, [chain, clear]);

  useEffect(() => {
    if (identityAddress && address && address !== identityAddress) {
      clear();
    }
  }, [address, clear, identityAddress]);

  if (isInitializing) {
    return null;
  }

  if (!isInitializing && (!isConnected || !identity)) {
    return <LoginPage />;
  }

  return <>{children}</>;
}
