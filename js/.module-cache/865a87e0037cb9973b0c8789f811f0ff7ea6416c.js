
/** @jsx React.DOM */
var t1 = [];
var Center = React.createClass({displayName: 'Center',
 getInitialState: function() {
    return {value: '432'}
  },
  handleScroll: function(event) {
    if(event.deltaY < 800) {
      //t1.push(Math.floor(event.deltaY));
      var note = Math.floor(event.deltaY/4);
      
      console.log(note);
      
    }
  },
  handleMouse: function(event) {
    //console.log("x: "+event.clientX+" y: "+event.clientY);

  },
  handleInput: function(event) {
    this.setState({value: event.target.value});
  },
  play: function() {
    synth.note(this.state.value);
  },
  render: function() {
    var value = this.state.value;
    var input = React.DOM.input( {id:"textInput", type:"text", className:"form-control", value:value, onChange:this.handleInput} );
    var paragraph = React.DOM.p( {id:"awesome", className:"text-center lead"}, value);
    var btn = React.DOM.button( {className:"btn btn-default play", onClick:this.play} , "Play")
    return (
      React.DOM.div( {className:"container-fluid", onWheel:this.handleScroll} , 
        input,
        paragraph,
        (this.state.value > 100 && this.state.value < 1600) ? btn : ''
      )
    )
  }
});

var avatar = React.renderComponent(
  Center(null ),
  document.body 
);
