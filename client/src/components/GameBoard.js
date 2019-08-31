import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import Cube from "./Cube";
import { reset } from "../actions";
import "../index.css";

class GameBoard extends Component {
  state = {
    startDate: new Date(),
    date: new Date(),

    nCubes: 16,
    icons: _.shuffle(
      _.flatten(
        _.times(2, function() {
          return [
            "apple",
            "bomb",
            "leaf",
            "snowflake outline",
            "diamond",
            "life ring outline",
            "smile outline",
            "paper plane"
          ];
        })
      )
    )
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  restart = () => {
    this.props.reset();
    this.setState({ startDate: new Date() });
  };
  getMatch = id => {
    const exist = this.props.matches.indexOf(id);
    return exist > -1;
  };

  getAllCubes = () => {
    let all = [];

    _.times(4, index => {
      all.push(
        <div className="eight column row" key={`row${index}`}>
          {this.getRowCubes(index * 4)}
        </div>
      );
    });
    return _.flatten(all);
  };
  getRowCubes = indexStart => {
    let cubes = [];
    _.times(4, index => {
      cubes.push(
        <Cube
          key={`cube${indexStart + index}`}
          id={indexStart + index}
          icon={this.state.icons[indexStart + index]}
          match={this.getMatch(indexStart + index)}
        />
      );
    });
    return cubes;
  };
  getTime = () => {
    return (
      <p style={styles.summaryStyle}>
        {Math.floor((this.state.date - this.state.startDate) / 1000 / 60)
          .toString()
          .padStart(2, "0")}
        :
        {Math.floor((this.state.date - this.state.startDate) / 1000)
          .toString()
          .padStart(2, "0")
          .slice(-2)}
      </p>
    );
  };

  render() {
    const score = [];
    _.times(this.props.score, index =>
      score.push(<i className="ui heart large icon" key={`icon${index}`}></i>)
    );
    _.times(3 - this.props.score, index =>
      score.push(
        <i className="ui heart outline large icon" key={`icon${3 - index}`}></i>
      )
    );

    return (
      <>
        <div className="ui segments">
          <div
            style={{ backgroundColor: "#4B4E6D" }}
            className="ui raised padded  inverted segment"
          >
            <h1 style={styles.header}>MATCH TO WIN</h1>
            <div
              className="ui  raised padded inverted segment"
              style={{ backgroundColor: "#493548" }}
            >
              <div className="ui  grid center aligned container ">
                <div className="four column row">
                  <div className="column">
                    {" "}
                    <h3>Score</h3> {score}
                  </div>
                  <div className="column">
                    <h3>Time</h3> {this.getTime()}
                  </div>
                  <div className="column">
                    {" "}
                    <h3>Move</h3>{" "}
                    <p style={styles.summaryStyle}>{this.props.nClicked}</p>
                  </div>
                </div>
              </div>
              <div
                className="ui circular compact brown button"
                style={styles.restartStyle}
                onClick={this.restart}
              >
                RESTART
              </div>
              <div
                style={{
                  backgroundColor: "#384F41",
                  borderStyle: "dashed",
                  borderWidth: "8px",
                  borderRadius: "100px",
                  borderColor: "#649299"
                }}
                className="ui divided grid center aligned container"
              >
                {this.getAllCubes()}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const styles = {
  summaryStyle: { fontSize: 20 },
  restartStyle: {
    float: "right",
    verticalAlign: "top",
    fontSize: 24,
    color: "",
    fontFamily: "Indie Flower",
    marginTop: "20px",
    marginBottom: "20px"
  },
  header: { fontSize: 40, textAlign: "center", fontFamily: "Indie Flower" }
};
const mapStatetoProps = (state, ownProps) => {
  return {
    selected: state.selected,
    lastSelected: state.lastSelected,
    nClicked: state.selected.nClicked,
    matches: _.flatten(
      Object.values(state.matches).map(item => Object.values(item))
    ).map(item => item.id),
    score: state.selected.score
  };
};

export default connect(
  mapStatetoProps,
  { reset }
)(GameBoard);
