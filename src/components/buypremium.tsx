import React from 'react';
import { Connection, SystemProgram, Transaction, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

const BuyPremiumButton: React.FC = () => {
    const { publicKey, wallet } = useWallet();

    const handleBuyPremium = async () => {
        if (!publicKey) {
            console.log('Wallet Not Found');
            return;
        }

       
        const recipientAddress = '3hDo1LpmtY2g4rDSba9bMSq25ub58634wbHKPLYKBW67';
        const lamportsToSend = 100000; 
        const network = 'devnet'; 
        const endpoint = clusterApiUrl(network);
        const connection = new Connection(endpoint, 'confirmed');
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(recipientAddress),
                lamports: lamportsToSend,
            })
        );

        try {
            if (wallet) {
                // Phantom wallet signature
                const phantomWallet = wallet as unknown as PhantomWalletAdapter;
                const signature = await phantomWallet.sendTransaction(transaction, connection);

                console.log('Buy Premium Transaction Successful. Signature:', signature);
            } else {
                console.error('Wallet Not Found');
            }
        } catch (error) {
            console.error('Buy Premium Transaction Failed:', error);
        }
    };

    return (
        <button onClick={handleBuyPremium} className='buypremium'>Buy Premium</button>
    );
};

export default BuyPremiumButton;
