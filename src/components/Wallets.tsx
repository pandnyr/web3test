import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { GlowWalletAdapter } from '@solana/wallet-adapter-glow';
import { CoinbaseWalletAdapter } from '@solana/wallet-adapter-coinbase';
import { BraveWalletAdapter } from '@solana/wallet-adapter-brave';

import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
require('../components/wallet.css');

function WalletTracker() {
    const { publicKey } = useWallet();
  
    if (!publicKey) {
      return <div>Wallet Not Found</div>;
    }
    console.log('Kullanıcı Cüzdan Adresi:', publicKey.toBase58());
    return <div> User Wallet Address: {publicKey.toBase58()}</div>;
  }

export const Wallet: FC = () => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new CoinbaseWalletAdapter(),
            new BraveWalletAdapter(),


        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    <WalletTracker></WalletTracker>
                    { /* Your app's components go here, nested within the context providers. */ }
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};