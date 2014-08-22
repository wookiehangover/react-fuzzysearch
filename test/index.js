var assert = require('chai').assert;
var FuzzySearch = require('..');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var sinon = require('sinon');

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
        assert.equal(res.length, 3);
        done();
      }
    });

    var node = this.component.getDOMNode();
    node.value = "o";

    TestUtils.Simulate.change(node);
  });

  it('transfers properties as expected', function() {
    var stub = sinon.stub();
    this.component.setProps({
      onKeyDown: stub,
      placeholder: 'Search...'
    });

    var node = this.component.getDOMNode();
    assert.equal(node.placeholder, this.component.props.placeholder);

    TestUtils.Simulate.keyDown(node);
    assert.ok(stub.calledOnce);
  });


});
