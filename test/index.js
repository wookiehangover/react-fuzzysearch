var assert = require('chai').assert;
var FuzzySearch = require('..');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var jsdom = require("jsdom").jsdom;
var document = jsdom("");
var window = document.parentWindow;

global.window = window; // I'm so sorry
global.document = document;

describe('React.FuzzySearch', function() {

  beforeEach(function() {
    this.component = TestUtils.renderIntoDocument(FuzzySearch({
      list: ['John', 'Paul', 'George', 'Ringo']
    }));
  });

  it('mounts correctly', function() {
    assert.isTrue(TestUtils.isCompositeComponent(this.component));
  });

  it('returns search results', function(done) {
    this.component.setProps({
      onResults: function(res) {
        assert.equal(res.length, 3)
        done();
      }
    });

    var node = this.component.getDOMNode();
    node.value = "o";

    TestUtils.Simulate.change(node);
  });

});
