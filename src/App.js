import React, { Component } from "react";
import "./App.css";
import BlockchainWelcome from "./components/BlockchainWelcome";
import { Button } from "@blueprintjs/core";
import { action } from "./store";
import { Tooltip, Dialog } from "./components/walkthrough";

class App extends Component {
  state = {
    ownBlockchainName: ""
  };
  pickBlockchain = name => {
    action({ type: "PICK_BLOCKCHAIN", name });
  };
  render() {
    return (
      <div className="">
        <nav className="pt-navbar">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Build your own Blockchain</div>
           
          </div>

          <div className="pt-navbar-group pt-align-right">
            <Tooltip
              step={1}
              content={
                <p style={{ maxWidth: "250px" }}>
                  You can either keep the current blockchain or start you own
                  blockchain from scratch
                </p>
              }
            >
              <select
                onChange={evt => {
                  this.pickBlockchain(evt.target.value);
                }}
                value={
                  this.props.appState.selectedBlockchain
                    ? this.props.appState.selectedBlockchain.name
                    : ""
                }
              >
                {[
                  <option key="default" value="">
                    Pick a blockchain or
                  </option>
                ].concat(
                  this.props.appState.blockchains.map(b => (
                    <option key={b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))
                )}
              </select>
            </Tooltip>
            <div className="pt-control-group">
              <div className="pt-input-group">
                <input
                  className="pt-input"
                  placeholder="create your own"
                  value={this.state.ownBlockchainName}
                  style={{ paddingRight: "150px" }}
                  onChange={evt =>
                    this.setState({ ownBlockchainName: evt.target.value })
                  }
                  onKeyPress={evt => {
                    if (evt.charCode === 13) {
                      this.pickBlockchain(this.state.ownBlockchainName);
                    }
                  }}
                />
                <div className="pt-input-action">
                  <Button
                    text="Create"
                    onClick={() =>
                      this.pickBlockchain(this.state.ownBlockchainName)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Dialog step={0} title="Welcome!" quitWalkthroughVisible={true}>
          <div>
            <p>
              Hello! This is an interactive demonstration for making a blockchain that will give you a much better understanding and broader perspective 
              of how blockchains work.
             </p>
          </div>
        </Dialog>
        <div className="container" style={{ padding: 24 }}>
          {this.props.appState.selectedBlockchain === undefined && (
            <p>
              Learn more about blockchains. Start by picking or create a new
              blockchain in the top-right corner.
            </p>
          )}
          {this.props.appState.selectedBlockchain !== undefined && (
            <BlockchainWelcome
              blockchain={this.props.appState.selectedBlockchain}
              node={this.props.appState.node}
              identities={this.props.appState.identities}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
