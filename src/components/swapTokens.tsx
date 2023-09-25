import { ethers } from 'ethers';
import { TransactionState, connectBrowserExtensionWallet, getProvider, getWalletAddress } from '../libs/providers';
import { CurrentConfig, Environment } from '../config';
import { useCallback, useEffect, useState } from 'react';
import { createTrade, executeTrade, TokenTrade } from '../libs/trading';
import { Tokens } from '../libs/constants';
import { getCurrencyBalance } from '../libs/wallet';
import { displayTrade } from '../libs/utils';
import styles from './swapToken.module.css';

export function SwapTokens() {

  // Create states to store selected token addresses and the amount to swap
  const [passedAmount, setPassedAmount] = useState<string>('');
  const [tokenInBalance, setTokenInBalance] = useState<string>()
  const [tokenOutBalance, setTokenOutBalance] = useState<string>()
  const [trade, setTrade] = useState<TokenTrade>()
  const [txState, setTxState] = useState<TransactionState>(TransactionState.New)
  CurrentConfig.tokens.amountIn = Number(passedAmount);
  const address = getWalletAddress();
    CurrentConfig.wallet.address = address as string;
  // set the selected Token

  const [selectedTokenIn, setSelectedTokenIn] = useState<string>(
    CurrentConfig.tokens.in.address
  );
  const [selectedTokenOut, setSelectedTokenOut] = useState<string>(
    CurrentConfig.tokens.out.address
  );

  const onSelectTokenIn = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTokenIn(e.target.value);
    setTokenInFromAddress(e.target.value);
  };
  const onSelectTokenOut = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTokenOut(e.target.value);
    setTokenOutFromAddress(e.target.value);
  };
  
  //refresh balances
   const refreshBalances = useCallback(async () => {
    const provider = getProvider()
    const address = getWalletAddress()
    if (!address || !provider) {
      return
    }

    setTokenInBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.in)
    )
    setTokenOutBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.out)
    )
  }, [])
  
  

  // functions to swap the tokens
  const onCreateTrade = useCallback(async () => {
    refreshBalances()
    setTrade(await createTrade())
  }, [refreshBalances])

  const onTrade = useCallback(async (trade: TokenTrade | undefined) => {
    if (trade) {
      setTxState(await executeTrade(trade))
    }
  }, [])

   
  const onConnectWallet = useCallback(async () => {
    if (await connectBrowserExtensionWallet()) {
      refreshBalances()
    }
  }, [refreshBalances])

// Function to update CurrentConfig.tokens.in
const setTokenInFromAddress = async (selectedTokenIn: string) => {
  try {
    // Find the token object that matches the selected token address
    const selectedToken = Tokens.find((tokenOption) => tokenOption.address === selectedTokenIn);

    // Check if the selected token was found
    if (selectedToken) {
      // Create a copy of the CurrentConfig object to modify
      const updatedConfig = { ...CurrentConfig };
      updatedConfig.tokens.in = selectedToken;

      // You can optionally update the balances here if needed
      const provider = getProvider();
      const address = getWalletAddress();
      if (provider && address) {
        updatedConfig.tokens.amountIn = Number(passedAmount); // Update the amountIn
        updatedConfig.tokens.in = selectedToken; // Update the selected token
        setTokenInBalance(await getCurrencyBalance(provider, address, selectedToken));
      }

      // Update the CurrentConfig object with the new values
      CurrentConfig.tokens.in = updatedConfig.tokens.in;
      CurrentConfig.tokens.amountIn = updatedConfig.tokens.amountIn;

      // You may want to trigger other updates here if needed
    } else {
      // Handle the case where the selected token address is not found
      console.error(`Token with address ${selectedTokenIn} not found.`);
    }
  } catch (error) {
    console.error("Error while setting token from address:", error);
  }
}

useEffect(() => {
  setTokenInFromAddress(selectedTokenIn);
}, [selectedTokenIn, passedAmount]);

// Function to update CurrentConfig.tokens.in
const setTokenOutFromAddress = async (selectedTokenOut: string) => {
  try {
    // Find the token object that matches the selected token address
    const selectedToken = Tokens.find((tokenOption) => tokenOption.address === selectedTokenOut);

    // Check if the selected token was found
    if (selectedToken) {
      // Create a copy of the CurrentConfig object to modify
      const updatedConfig = { ...CurrentConfig };
      updatedConfig.tokens.out = selectedToken;

      // You can optionally update the balances here if needed
      const provider = getProvider();
      const address = getWalletAddress();
      if (provider && address) {
        updatedConfig.tokens.amountIn = Number(passedAmount); // Update the amountIn
        updatedConfig.tokens.out = selectedToken; // Update the selected token
        setTokenInBalance(await getCurrencyBalance(provider, address, selectedToken));
      }

      // Update the CurrentConfig object with the new values
      CurrentConfig.tokens.in = updatedConfig.tokens.in;
      CurrentConfig.tokens.amountIn = updatedConfig.tokens.amountIn;

      // You may want to trigger other updates here if needed
    } else {
      // Handle the case where the selected token address is not found
      console.error(`Token with address ${selectedTokenOut} not found.`);
    }
  } catch (error) {
    console.error("Error while setting token from address:", error);
  }
}

useEffect(() => {
  setTokenOutFromAddress(selectedTokenOut);
}, [selectedTokenOut, passedAmount]);

return (  
  <div className={styles.swapCard}>
    <div>
      <div className={styles.body}>
           {CurrentConfig.env === Environment.MAINNET && getProvider() === null && (
           <h2 className="error">Please install a wallet to use this example configuration   </h2> )}

             {getWalletAddress() ? ( <h3>{`Wallet Address: ${getWalletAddress()}`}</h3>) 
             : CurrentConfig.env === Environment.MAINNET ? (
              <button onClick={onConnectWallet}>Connect Wallet</button>     ) : null}

      </div>
      <div className={styles.formGroup}>
        <input
          className={styles.formControl}
          placeholder={'0.00'}
          value={String(passedAmount)}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (!isNaN(Number(inputValue))) {
              setPassedAmount(inputValue);
              onCreateTrade();
            } else {
              console.error('Invalid input. Please enter a valid number.');
            }
          }}
        />
        <select value={selectedTokenIn} onChange={onSelectTokenIn}>
          {Tokens.map((tokenOption) => (
            <option key={tokenOption.address} value={tokenOption.address}>
              {tokenOption.name}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className={styles.formGroup}>
      <input
        className={styles.formControl}
        placeholder={'0.00'}
        value={trade ? ` ${displayTrade(trade)}` : ''}
      />
      <select value={selectedTokenOut} onChange={onSelectTokenOut}>
        {Tokens.map((tokenOption) => (
          <option key={tokenOption.address} value={tokenOption.address}>
            {tokenOption.name}
          </option>
        ))}
      </select>
    </div>
    <button
      onClick={() => onTrade(trade)}
      disabled={
        trade === undefined ||
        txState === TransactionState.Sending ||
        getProvider() === null ||
        CurrentConfig.rpc.mainnet === ''
      }
    >
      Swap
    </button>
  </div>
);

}

// Export the swapTokens function
export default SwapTokens;


