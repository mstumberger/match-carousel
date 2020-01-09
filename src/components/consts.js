export const NOT_STARTED = "Not started";
export const ENDED = "Ended";
export const API_URL =
  "https://ls.betradar.com/ls/feeds/?/betradar/en/Europe:Berlin/gismo/event_fullfeed/0/5";
export const TEAM_FLAG_URL = "http://ls.betradar.com/ls/crest/big/";

export const getColorFromMatchState = state => {
  switch (state) {
    case NOT_STARTED:
      return "#555555";
    case ENDED:
      return "#2c8604";
    default:
      return "#ff9600";
  }
};
