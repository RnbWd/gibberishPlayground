
/** @jsx React.DOM */
var t1 = [];
var Center = React.createClass({displayName: 'Center',
 getInitialState: function() {
    return {filter: synth}
  },
  componentDidMount: function() {
    audioSource = Gibberish.context.createMediaElementSource(this.refs.myAudio.getDOMNode());
  },
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
  handleFilter: function(event) {

    if (this.props.status == "disconnect") {
      this.connect();
    }

    this.setProps({filter: event.target.value});
    switch (event.target.value)
    {
    case "a":
      this.setState({filter: synth})
      break;
    case "b":
      this.setState({filter: distortion})
      break;
    case "c":
      this.setState({filter: delay})
      break;
    case "d":
      this.setState({filter: decimator})
      break;
    case "e":
      this.setState({filter: modulator})
      break;
    case "f":
      this.setState({filter: reverb})
      break;
    }
    

  },
  connect: function() {
    if (this.props.status == "connect") {
      this.state.filter.connect();
      this.setProps({status: "disconnect"});
    } else {
      this.state.filter.disconnect();
      this.setProps({status: "connect"});
    }
  },
  play: function() {
    synth.note(this.props.value);
  },
  microphone: function() {
    var a = new Gibberish.Input();
    delay = new Gibberish.Delay({ input:a, time:22050, feedback:.50 }).connect();
  },
  render: function() {
    var value = this.props.value;
    var input = React.DOM.input( {id:"textInput", type:"text", className:"form-control", value:value, onChange:this.handleInput} );
    var paragraph = React.DOM.p( {id:"awesome", className:"text-center lead"}, value);
    var play = React.DOM.button( {className:"btn btn-default play", onClick:this.play} , "Play");
    var audio = React.DOM.audio( {ref:"myAudio", className:"player", src:"../songs/deadmau5.mp3", controls:true})
    return (
      React.DOM.div( {className:"container-fluid", onWheel:this.handleScroll} , 
        input,
        paragraph,
        (this.props.value > 100 && this.props.value < 1600) ? play : '',
        React.DOM.button( {className:"btn btn-default connect", onClick:this.connect} , this.props.status),
        React.DOM.select( {className:"form-control", value:this.props.filter, onChange:this.handleFilter}, 
          React.DOM.option( {value:"a"}, "None"),
          React.DOM.option( {value:"b"}, "Distortion"),
          React.DOM.option( {value:"c"}, "Delay"),
          React.DOM.option( {value:"d"}, "Decismator"),
          React.DOM.option( {value:"e"}, "Modulator"),
          React.DOM.option( {value:"f"}, "Reverb")
        ),
        React.DOM.button( {className:"btn btn-default microphone", onClick:this.microphone} , "Microphone"),
        audio
      )
    )
  }
});

var avatar = React.renderComponent(
  Center( {status:"connect", value:"432", filter:"a"}),
  document.getElementById("reactDiv")
);


