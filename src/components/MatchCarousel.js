import React, { Component } from "react";
import PropTypes from "prop-types";
import Loader from "../assets/loader.gif";
import Timer from "./Timer";
import { API_URL } from "./consts";
import Card from "./Card";
import "./MatchCarousel.css";

class MatchCarousel extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      isLoaded: false,
      item: [],
      currentIndex: 0
    };
    this.setMatch = this.setMatch.bind(this);
  }

  componentDidMount() {
    fetch(API_URL)
      .then(response => response.json())
      .then(json => {
        this.setState(
          {
            isLoaded: true,
            items: this.parseData(json.doc[0].data)
          },
          () => (this.timer = new Timer(this.setNextMatch.bind(this), 3 * 1000))
        );
      });
  }

  parseData(data) {
    const sportId = this.props.sportId;
    if (sportId !== null) {
      data = this.getSportById(data, sportId);
    } else {
      data = this.getRandomSport(data);
    }
    return data;
  }

  getSportById(data, id) {
    return this.formatData(data.find(sport => sport._id === id));
  }

  getRandomSport(data) {
    const sportIndex = Object.keys(data);
    return this.formatData(
      data[sportIndex[(sportIndex.length * Math.random()) << 0]]
    );
  }

  formatData(data) {
    const dataToReturn = [];
    for (let category of data.realcategories) {
      if (category.tournaments.length > 0) {
        for (let tournament of category.tournaments) {
          if (tournament.matches.length > 0) {
            for (let match of tournament.matches) {
              if (dataToReturn.length < this.props.max) {
                dataToReturn.push({
                  realcategory: category,
                  tournament,
                  match,
                  teams: match.teams
                });
              } else {
                break;
              }
            }
          }
        }
      }
    }
    return dataToReturn;
  }

  getIndicators() {
    let indicators = [];
    for (let i = 0; i < this.props.max; i++) {
      const classNames = [
        "circle",
        this.state.currentIndex === i && " selected"
      ];
      indicators.push(
        <div
          className={classNames.join(" ")}
          key={i}
          onClick={() => this.setMatch(i)}
        />
      );
    }
    return indicators;
  }

  setMatch(index) {
    this.timer.reset();
    this.setState({
      ...this.state,
      currentIndex: index
    });
  }

  setNextMatch() {
    this.setState({
      ...this.state,
      currentIndex:
        this.state.currentIndex < this.props.max - 1
          ? this.state.currentIndex + 1
          : 0
    });
  }

  render() {
    const { isLoaded, items, currentIndex } = this.state;

    if (!isLoaded) {
      return (
        <img src={Loader} style={{ width: 150, height: 150 }} alt={"Loader"} />
      );
    }
    return (
      <div className={"carousel_container"}>
        <Card data={items[currentIndex]} />
        <div className={"indicators"}>{this.getIndicators()}</div>
      </div>
    );
  }
}

MatchCarousel.defaultProps = {
  max: 10,
  sportId: null
};

MatchCarousel.propTypes = {
  max: PropTypes.number,
  sportId: PropTypes.number
};

export default MatchCarousel;
