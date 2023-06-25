import React, { useState } from "react";
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import "./styles/Home.css";

const Home = () => {
    const { contract } = useContract("0x1d805699ee847496de5c959D3d931a84F6212A06");
    const { data, isLoading, error } = useContractRead(contract, "balanceOf");

    return (
    <div className="container">
        <main className="main">
            <h1>CBetX</h1>
        </main>
    </div>
  );
}

export default Home;