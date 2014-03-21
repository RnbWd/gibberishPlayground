
/** @jsx React.DOM */
var t1 = [];
var Center = React.createClass({displayName: 'Center',
 getInitialState: function() {
    return {value: "432", sine: 'off'}
  },
  componentDidMount: function() {
    //var audioSource = Gibberish.context.createMediaElementSource(this.refs.myAudio.getDOMNode());
    //modulator = new Gibberish.RingModulation({ input:audioSource, frequency:1000, synthmp:.4, mix:1 });
    //modulator.connect();
  },
  handleScroll: function(event) {
    if(event.deltaY < 800) {
      //t1.push(Math.floor(event.deltaY));
      var note = Math.floor(event.deltaY/4);
      var changa = parseInt(this.state.value) + note;
      (changa > 20 && changa < 4001) ? this.setState({value: changa}) : '';
    }
  },
  handleMouse: function(event) {
    //console.log("x: "+event.clientX+" y: "+event.clientY);

  },
  handleInput: function(event) {
    var input = event.target.value;
    console.log(input);
    if (input < 4001 && input > -1)
      this.setState({value: event.target.value});
  },
  
  play: function() {
    if (this.props.sound === synth)
      this.props.sound.note(this.state.value);
    else if (this.state.sine == "off") {
      this.props.sound.connect();
      this.setState({sine: "on"});
    }
    else if (this.state.sine == "on") {
      this.props.sound.disconnect();
      this.setState({sine: "off"});
    }
  },
  microphone: function() {
    var a = new Gibberish.Input();
    delay = new Gibberish.Delay({ input:a, time:22050, feedback:.50 }).connect();
  },
  render: function() {
    var value = this.state.value;
    this.props.sound.frequency = value;
    var inputL = React.DOM.input( {id:"textInputL", type:"text", className:"form-control", value:value, onChange:this.handleInput} )
    var inputR = React.DOM.input( {id:"textInputR", type:"text", className:"form-control", value:value, onChange:this.handleInput} )

    var paragraph = React.DOM.p( {id:"awesome", className:"text-center lead"}, "Frequency: ", value, " hz")
    //var mic = <button className="btn btn-default microphone" onClick={this.microphone} >Microphone</button>
    //var audio = <audio ref="myAudio" className="player" src='../songs/deadmau5.mp3' controls></audio>;
    var left = React.DOM.button( {className:(this.props.status) ? "btn btn-success pull-left play" : "btn btn-danger pull-left play", onClick:this.play, disabled:(this.props.status) ? false : true} , "Left")
    var right = React.DOM.button( {className:(this.props.status) ? "btn btn-success pull-right play" : "btn btn-danger pull-right play", onClick:this.playR, disabled:(this.props.status) ? false : true} , "Right")

    return (
      React.DOM.div( {className:"container-fluid", onWheel:this.handleScroll} , 
      React.DOM.h1(null, "Gibberish Playground"),
          input,
          paragraph,
          left,
          right
      )
    )
  }
});
var Filters = React.createClass({displayName: 'Filters',
  getInitialState: function() {
    return {filter: '', sound: sine, optionF: "a", optionS: "b", status: "disconnect"}
  },
  handleFilter: function(event) {

    if (this.state.status == "disconnect") {
      (this.state.filter != '') ? this.state.filter.disconnect() : this.state.sound.disconnect();
    }

    this.setState({optionF: event.target.value});
    switch (event.target.value)
    {
    case "a":
      this.setState({filter: ''})
      break;
    case "b":
      this.setState({filter: distortion})
      distortion.connect();
      break;
    case "c":
      this.setState({filter: delay})
      delay.connect();
      break;
    case "d":
      this.setState({filter: decimator})
      decimator.connect();
      break;
    case "e":
      this.setState({filter: modulator})
      modulator.connect();
      break;
    case "f":
      this.setState({filter: reverb})
      reverb.connect();
      break;
    }

  },
  handleSound: function(event) {

    
    this.setState({optionS: event.target.value});
    switch (event.target.value)
    {
    case "a":
      this.setState({sound: synth})
      break;
    case "b":
      this.setState({sound: sine})
      break;
    }

  },
  connect: function() {
    
    if (this.state.status == "connect") {
      (this.state.filter != '') ? this.state.filter.connect() : this.state.sound.connect();
      this.setState({status: "disconnect"});
      (this.state.sound === sine) ? this.state.sound.disconnect() : '';
    } else {
      (this.state.filter != '') ? this.state.filter.disconnect() : this.state.sound.disconnect();
      this.setState({status: "connect"});
    }
  },
   render: function() {
    var style;
    if (this.state.sound === sine) {
      style = {display: 'none'}
    } else if (this.state.sound === synth) {
      style = {display: 'block'}
    }
    var status = this.state.status;
    var connect = React.DOM.button( {className:(status == "connect") ? "btn btn-info connect" : "btn btn-warning connect", onClick:this.connect} , status)
    return (
      React.DOM.div(null, 
        Center( {status:(status == "connect") ? false : true, sound:  this.state.sound} ),
        connect,
        React.DOM.div( {className:"filters"}, 
        React.DOM.h4(null, "Sound"),
        React.DOM.select( {className:"form-control", value:this.state.optionS, onChange:this.handleSound}, 
            React.DOM.option( {value:"a"}, "Synth"),
            React.DOM.option( {value:"b"}, "Sine")
          ),
          React.DOM.h4( {style:style}, "Filters"),
          React.DOM.select( {style:style, className:"form-control", value:this.state.optionF, onChange:this.handleFilter}, 
            React.DOM.option( {value:"a"}, "None"),
            React.DOM.option( {value:"b"}, "Distortion"),
            React.DOM.option( {value:"c"}, "Delay"),
            React.DOM.option( {value:"d"}, "Decismator"),
            React.DOM.option( {value:"e"}, "Modulator"),
            React.DOM.option( {value:"f"}, "Reverb")
          )
        )
      )
    );
  }
});

var avatar = React.renderComponent(
  Filters(null ),
  document.getElementById("reactDiv")
);


