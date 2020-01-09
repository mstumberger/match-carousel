import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Card.css";
import _ from "lodash";
import { NOT_STARTED, TEAM_FLAG_URL, getColorFromMatchState } from "./consts";
import Live from "../assets/bg-live.jpg";
import PostMatch from "../assets/bg-postmatch.jpg";
import PreMatch from "../assets/bg-prematch.jpg";

class Card extends Component {
  constructor() {
    super();
    this.BACKGROUNDS = [Live, PostMatch, PreMatch];
  }
  getRandomBackground() {
    const index = (this.BACKGROUNDS.length * Math.random()) << 0;
    return this.BACKGROUNDS[index];
  }

  render() {
    try {
      const {
        realcategory: realCategory,
        tournament,
        match,
        teams
      } = this.props.data;

      // content
      const tournamentText =
        !_.isNil(tournament) &&
        `${tournament.name}${!_.isNil(tournament.seasontypename) &&
          `- ${tournament.seasontypename}`}`;
      const categoryName = !_.isNil(realCategory) ? realCategory.name : "";
      const homeTeamName = !_.isNil(teams) && teams.home.name;
      const homeTeamID = _.has(teams, "home.uid") ? teams.home.uid : null;
      const homeTeamScore = _.has(match, "result.home")
        ? match.result.home
        : null;
      const awayTeamName = _.has(teams, "away.name") ? teams.away.name : null;
      const awayTeamID = _.has(teams, "away.uid") ? teams.away.uid : null;
      const awayTeamScore = _.has(match, "result.away")
        ? match.result.away
        : null;
      const getMatchScoreOrStartTime =
        !_.isNil(match) && match.status.name !== NOT_STARTED ? (
          `${homeTeamScore}:${awayTeamScore}`
        ) : (
          <div>
            <h1>VS</h1>
            <h1>{!_.isNil(match) && match._dt.time}</h1>
            <h1>{!_.isNil(match) && match._dt.date}</h1>
          </div>
        );
      const matchStatus = !_.isNil(match) ? match.status.name : "";

      return (
        <section
          className="match_card"
          style={{ backgroundImage: `url(${this.getRandomBackground()})` }}
        >
          <div className="container">
            <div className={"card_container top"} key={homeTeamID}>
              <h1>{tournamentText}</h1>
              <br />
              <h3>{categoryName}</h3>
            </div>
            <div className={"card_container middle"}>
              <div className={"card_container_left"}>
                <img
                  alt={"Home Team Logo"}
                  src={`${TEAM_FLAG_URL}${homeTeamID}.png`}
                />
                <div className={"team_name_placeholder"}>
                  <h2>{homeTeamName}</h2>
                </div>
              </div>
              <div className={"card_container_right"}>
                <img
                  alt={"Guest Team Logo"}
                  src={`${TEAM_FLAG_URL}${awayTeamID}.png`}
                />
                <br />
                <div className={"team_name_placeholder"}>
                  <h2>{awayTeamName}</h2>
                </div>
              </div>
              <div className={"card_container_center"}>
                <h1>{getMatchScoreOrStartTime}</h1>
              </div>
            </div>
            <div className="card_container bottom">
              <div
                className="match_state"
                style={{
                  backgroundColor: getColorFromMatchState(matchStatus)
                }}
              >
                {matchStatus}
              </div>
            </div>
          </div>
        </section>
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

Card.defaultProps = {
  data: {
    tournament: { name: "World Cup 2014", seasontypename: "Group A" },
    realcategory: { name: "International" },
    match: {
      _dt: { time: "9:00", date: "23/12/13" },
      result: { home: 1, away: 0 },
      status: { name: NOT_STARTED }
    },
    teams: {
      home: { uid: 5, name: "Germany" },
      away: { uid: 3, name: "Italy" }
    }
  }
};

Card.propTypes = {
  data: PropTypes.object
};
export default Card;
