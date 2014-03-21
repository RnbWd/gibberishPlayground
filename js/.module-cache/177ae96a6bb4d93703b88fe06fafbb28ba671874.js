
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
    //console.log("x: "+event.clientX+" y: "+event.clientY);

  },
  handleInput: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    var input = React.DOM.input( {id:"textInput", type:"text", className:"form-control", value:value, onChange:this.handleInput} );
    var paragraph = React.DOM.p( {id:"awesome", className:"text-center lead"}, value);
    var btn = React.DOM.button( {className:"btn btn-default play"}, "Play")
    return (
      React.DOM.div( {className:"container-fluid", onWheel:this.handleScroll} , 
        input,
        paragraph,
        btn
      )
    )
  }
});

var avatar = React.renderComponent(
  Center(null ),
  document.body 
);
