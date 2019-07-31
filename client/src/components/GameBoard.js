import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";

import Cube from "./Cube";

class GameBoard extends Component {
  state = {
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

  getMatch = id => {
    const exist = this.props.matches.indexOf(id);
    return exist > -1;
  };
  render() {
    console.log("Message from the board");
    console.log(this.props.matches);
    return (
      <>
        <div className="ui divided grid container">
          <div className="four column row">
            <Cube id={0} icon={this.state.icons[0]} match={this.getMatch(0)} />
            <Cube id={1} icon={this.state.icons[1]} match={this.getMatch(1)} />
            <Cube id={2} icon={this.state.icons[2]} match={this.getMatch(2)} />
            <Cube id={3} icon={this.state.icons[3]} match={this.getMatch(3)} />
          </div>

          <div className="four column row">
            <Cube id={4} icon={this.state.icons[4]} match={this.getMatch(4)} />
            <Cube id={5} icon={this.state.icons[5]} match={this.getMatch(5)} />
            <Cube id={6} icon={this.state.icons[6]} match={this.getMatch(6)} />
            <Cube id={7} icon={this.state.icons[7]} match={this.getMatch(7)} />
          </div>

          <div className="four column row">
            <Cube id={8} icon={this.state.icons[8]} match={this.getMatch(8)} />
            <Cube id={9} icon={this.state.icons[9]} match={this.getMatch(9)} />
            <Cube
              id={10}
              icon={this.state.icons[10]}
              match={this.getMatch(10)}
            />
            <Cube
              id={11}
              icon={this.state.icons[11]}
              match={this.getMatch(11)}
            />
          </div>

          <div className="four column row">
            <Cube
              id={12}
              icon={this.state.icons[12]}
              match={this.getMatch(12)}
            />
            <Cube
              id={13}
              icon={this.state.icons[13]}
              match={this.getMatch(13)}
            />
            <Cube
              id={14}
              icon={this.state.icons[14]}
              match={this.getMatch(14)}
            />
            <Cube
              id={15}
              icon={this.state.icons[15]}
              match={this.getMatch(15)}
            />
          </div>
        </div>
      </>
    );
  }
}
const mapStatetoProps = (state, ownProps) => {
  return {
    selected: state.selected,
    lastSelected: state.lastSelected,
    matches: _.flatten(
      Object.values(state.matches).map(item => Object.values(item))
    ).map(item => item.id)
  };
};

export default connect(
  mapStatetoProps,
  null
)(GameBoard);
