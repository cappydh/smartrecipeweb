import React from "react";
import { searchRecipes } from "../redux/actions/recipeActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/SearchBar.css";

class SearchBar extends React.Component {
  state = { term: "", isOpen: false };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
  };

  onFormChange = event => {
    this.setState({ term: event.target.value, isOpen: true });
    this.props.searchRecipes(event.target.value);
  };

  onClickResult = () => {
    this.setState({ term: "" });
  };

  openResults = () => {
    this.setState({ isOpen: true });
  };

  closeResults = () => {
    setTimeout(() => {
      this.setState({
        isOpen: false
      });
    }, 200);
  };

  renderResults() {
    if (this.state.term.length > 1) {
      if (!this.state.isOpen) {
        return null;
      }
      return this.props.recipeResults.map(result => {
        return (
          <React.Fragment key={result.id}>
            <Link
              to={`/recipes/${result.id}`}
              className="item results"
              onClick={this.onClickResult}
            >
              <img
                className="ui avatar image"
                src={result.attachment}
                alt={result.id}
              />
              <div className="content">
                <div className="header">{result.name}</div>
                <div className="description">{result.description}</div>
              </div>
            </Link>
          </React.Fragment>
        );
      });
    }
  }

  render() {
    return (
      <div
        className="ui search"
        onBlur={this.closeResults}
        onFocus={this.openResults}
        style={{ width: "300px" }}
      >
        <form className="ui form">
          <div className="ui icon input" style={{ width: "300px" }}>
            <input
              type="text"
              value={this.state.term}
              onChange={this.onFormChange}
            />
            <i aria-hidden="true" className="search icon"></i>
          </div>
        </form>
        <div
          className="ui celled list"
          style={{
            position: "absolute",
            zIndex: 1,
            background: "white",
            width: "300px",
            marginTop: "0px"
          }}
        >
          {this.renderResults()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipeResults: state.foundRecipes
  };
};

export default connect(mapStateToProps, { searchRecipes })(SearchBar);
