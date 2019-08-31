import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { sendSelect, sendLastSelected, addMatch, sendScore } from "../actions";

class Cube extends Component {
  componentDidMount = () => {
    this.props.sendSelect(this.props.id, true, 0);
    this.props.sendSelect(this.props.id, false, 0);
  };
  onClick = () => {
    const { id, selected } = this.props;
    if (this.props.match || selected) {
      return;
    }
    if (!selected) {
      this.props.sendSelect(id, true, 1);
      this.props.sendLastSelected(this.props.id, this.props.icon);
    }
    if (!selected && this.props.nSelected > this.props.matches.length + 1) {
      const { last, prev } = this.props.lastSelected;
      this.props.sendSelect(last.id, false, 0);
      this.props.sendSelect(prev.id, false, 0);
      return;
    }
    this.checkMatch();
  };

  getContent = () => {
    if (this.props.selected) {
      return <i className={`ui big ${this.props.icon} icon`} />;
    } else {
      return (
        //<i className="ui big icon">
        <i className="ui big question circle outline icon" />
      );
    }
  };

  checkMatch = () => {
    const { last, prev } = this.props.lastSelected;

    if (!last) {
      return;
    }
    //if (this.props.allSelected[last.id]) {
    if (this.props.icon === last.icon) {
      this.props.addMatch({ id: this.props.id, icon: this.props.icon }, last);
      this.props.sendScore(1);
    } else if (!prev) {
      return;
    } else if (this.props.nSelected > 2 && this.props.nClicked % 2 === 1) {
      this.props.sendScore(-1);
    }
  };
  render() {
    var color = this.props.selected ? "#A1E887" : "#80B192";
    if (this.props.match) {
      color = "#649299";
    }

    return (
      <div
        style={{ color: color }}
        className="column center aligned"
        onClick={this.onClick}
      >
        {this.getContent()}
      </div>
    );
  }
}

const mapStatetoProps = (state, ownProps) => {
  return {
    allSelected: state.selected,
    selected: state.selected[ownProps.id],
    lastSelected: state.lastSelected,
    nClicked: state.selected.nClicked,
    nSelected: state.selected.nSelected,
    matches: _.flatten(
      Object.values(state.matches).map(item => Object.values(item))
    ).map(item => item.id)
  };
};

export default connect(
  mapStatetoProps,
  { sendSelect, sendLastSelected, addMatch, sendScore }
)(Cube);
