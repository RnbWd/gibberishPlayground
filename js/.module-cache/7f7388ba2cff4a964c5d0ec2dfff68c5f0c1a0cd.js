
/** @jsx React.DOM */
var t1 = [];
var Center = React.createClass({displayName: 'Center',
 //getInitialState: function() {
    //return {value: '432'}
 // },
  handleScroll: function(event) {
    if(event.deltaY < 800) {
      //t1.push(Math.floor(event.deltaY));
      var note = Math.floor(event.deltaY/4);
      var changa = parseInt(this.props.value) + note;
      (changa > 100 && changa < 1600) ? this.setProps({value: changa}) : '';
      
    }
  },
  handleMouse: function(event) {
    //console.log("x: "+event.clientX+" y: "+event.clientY);

  },
  handleInput: function(event) {
    if (event.target.value.length < 5)
    this.setProps({value: event.target.value});
  },
  connect: function() {
    if (this.props.status == "connect") {
      synth.connect();
      this.setProps({status: "disconnect"});
    } else {
      synth.disconnect();
      this.setProps({status: "connect"});
    }
  },
  play: function() {
    synth.note(this.props.value);
  },
  render: function() {
    var value = this.state.value;
    var input = React.DOM.input( {id:"textInput", type:"text", className:"form-control", value:value, onChange:this.handleInput} );
    var paragraph = React.DOM.p( {id:"awesome", className:"text-center lead"}, value);
    var play = React.DOM.button( {className:"btn btn-default play", onClick:this.play} , "Play");

    return (
      React.DOM.div( {className:"container-fluid", onWheel:this.handleScroll} , 
        input,
        paragraph,
        (this.state.value > 100 && this.state.value < 1600) ? play : '',
        React.DOM.button( {className:"btn btn-default connect", onClick:this.connect} , this.props.status)
      )
    )
  }
});

var avatar = React.renderComponent(
  Center( {status:"connect", value:"432"}),
  document.body 
);
