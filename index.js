var React = require('react/addons');
var fuzzy = require('fuzzy');

var FuzzySearch = React.createClass({displayName: 'FuzzySearch',

  propTypes: {
    list: React.PropTypes.array,
    onResults: React.PropTypes.func
  },

  defaultProps: function() {
    return {
      list: [],
      onResults: function() {}
    }
  },

  _onChange: function(e) {
    var node = this.getDOMNode();
    var results = fuzzy.filter(node.value, this.props.list);
    this.props.onResults(results);
  },

  render: function() {
    return this.transferPropsTo(
      React.DOM.input({type: "text", name: "fuzzysearch", onChange: this._onChange})
    );
  }

});

module.exports = FuzzySearch;

