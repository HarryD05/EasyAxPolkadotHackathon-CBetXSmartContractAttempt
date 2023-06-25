import React, { useState } from "react";
import { useContract } from "@thirdweb-dev/react";
import { MetaMaskWallet } from "@thirdweb-dev/wallets";
import { ethers } from "ethers";
import "./styles/Home.css";

// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
//import TokenArtifact from "../contracts/Token.json";
//import contractAddress from "../contracts/contract-address.json";


const Home = () => {
  
  const [tokenData, setTokenData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const wallet = new MetaMaskWallet();

  const { contract, isLoading, error } = useContract("0xA62249583F5Bad5e33Abf7666A35Dd1B170e4b26");

  const connect = async () => {
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    setSelectedAddress(await wallet.connect());
  }

  const initializeEthers = async () => {
    // We first initialize ethers by creating a provider using window.ethereum
    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    // Then, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.
    /*this._token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      this._provider.getSigner(0)
    );*/
  }

  const checkWallet = () => {
    if (window.ethereum === undefined) {
      return <p>No wallet detected</p>;
    }
  }

  const connectWallet = () => {
    console.log(selectedAddress);
    if (!selectedAddress) {
      return (
        <>
          <p>Please connect to your wallet.</p>
          <button
            className="btn"
            type="button"
            onClick={() => connect()}
          >
            Connect Wallet
          </button>
        </>
      );
    }
  }


  return (
    <div className="container">
      <main className="main">
        {checkWallet()}
        {connectWallet()}
      </main>
    </div>
  );
}

export default Home;  //const { contract, isLoading, error } = useContract("{{contract_address}}");
