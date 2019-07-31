import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { sendSelect, sendLastSelected, addMatch } from "../actions";

class Cube extends Component {
  componentDidMount = () => {
    this.props.sendSelect(this.props.id, true);
    this.props.sendSelect(this.props.id, false);
  };
  onClick = () => {
    const { id, selected } = this.props;
    if (this.props.match || selected) {
      return;
    }

    if (!selected) {
      this.props.sendSelect(id, true);
      this.props.sendLastSelected(this.props.id, this.props.icon);
    }
    if (!selected && this.props.nSelected > this.props.matches.length + 1) {
      const { last, prev } = this.props.lastSelected;
      this.props.sendSelect(last.id, false);
      this.props.sendSelect(prev.id, false);
      return;
    }
    this.checkMatch();
  };

  getContent = () => {
    if (this.props.selected) {
      return <i className={`ui huge ${this.props.icon} icon`} />;
    } else {
      return <p>CLICK</p>;
    }
  };

  checkMatch = () => {
    const { last } = this.props.lastSelected;

    if (!last) {
      return;
    }
    console.log(last);
    console.log(this.props.allSelected);
    if (this.props.allSelected[last.id] && this.props.icon === last.icon) {
      this.props.addMatch({ id: this.props.id, icon: this.props.icon }, last);
    }
  };
  render() {
    var color = this.props.selected ? "blue" : "grey";
    if (this.props.match) {
      color = "red";
    }

    return (
      <div className={`${color} column center aligned`} onClick={this.onClick}>
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
    nSelected: state.selected.nSelected,
    matches: _.flatten(
      Object.values(state.matches).map(item => Object.values(item))
    ).map(item => item.id)
  };
};

export default connect(
  mapStatetoProps,
  { sendSelect, sendLastSelected, addMatch }
)(Cube);
