import React, { Component } from "react";
import Tabs from "./Tabs";
import MatchCarousel from "./MatchCarousel";
import "./App.css";
import "./Tabs.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tabs>
          <div label="Mixed Sports">
            <MatchCarousel />
          </div>
          <div label="Specific Sport">
            <MatchCarousel sportId={1} />
            <MatchCarousel sportId={2} />
          </div>
        </Tabs>
      </div>
    );
  }
}

export default App;
