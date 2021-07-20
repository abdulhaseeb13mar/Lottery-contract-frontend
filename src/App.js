import React, { useEffect, useState } from "react";
import web3 from "./web3";
import lottery from "./lottery";

const App = () => {
  useEffect(() => {
    getManager();
    getPlayers();
    getBalance();
  }, []);

  const getPlayers = async () => {
    const players = await lottery.methods.getPlayers().call();
    setPlayers(players);
  };

  const getBalance = async () => {
    const balance = await web3.eth.getBalance(lottery.options.address);
    setBalance(balance);
  };

  const getManager = async () => {
    const manager = await lottery.methods.manager().call();
    setManager(manager);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage("Waiting on transaction success...");
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });
    setMessage("you have been entered!!");
  };

  const pickWinner = async () => {
    const accounts = await web3.eth.getAccounts();
    setMessage("Waiting on transaction success...");
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    setMessage("Winner has been picked!!");
  };

  const [manager, setManager] = useState("");
  const [balance, setBalance] = useState("");
  const [players, setPlayers] = useState("");
  const [value, setvalue] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This Contract is managed by {manager}</p>
      <p>
        There are currently {players.length} people entered, competing to win{" "}
        {web3.utils.fromWei(balance, "ether")}
      </p>
      <hr />
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            value={value}
            onChange={(event) => setvalue(event.target.value)}
          />
        </div>
        <button>Enter</button>
      </form>
      <hr />
      <h4>ready to pick a winner?</h4>
      <button onClick={pickWinner}>Pick a Winner</button>
      <hr />
      <h1>{message}</h1>
    </div>
  );
};

export default App;
