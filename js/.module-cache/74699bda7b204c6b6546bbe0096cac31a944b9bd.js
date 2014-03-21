
/** @jsx React.DOM */
var t1 = [];
var Center = React.createClass({displayName: 'Center',
 getInitialState: function() {
    return {value: ''}
  },
  handleScroll: function(event) {
    if(event.deltaY < 800) {
      t1.push(Math.floor(event.deltaY));
      console.log(t1);
    }
  },
  handleMouse: function(event) {
    console.log("x: "+event.clientX+" y: "+event.clientY);
    console.log("x: "+event.pageX+" y: "+event.pageY);
  },
  handleInput: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return (
      React.DOM.div( {className:"container-fluid", onWheel:this.handleScroll} , 
        React.DOM.input( {id:"textInput", type:"text", className:"form-control", value:value, onMouseMove:this.handleMouse, onChange:this.handleInput} ),
        React.DOM.p( {id:"awesome", className:"text-center lead"}, value)
      )
    )
  }
});

var avatar = React.renderComponent(
  Center(null ),
  document.body 
);
