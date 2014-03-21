//var gui = require('nw.gui'); 
//var win = gui.Window.get();
//var audioSource;
Gibberish.init()
Gibberish.Time.export()
Gibberish.Binops.export()

var synth = new Gibberish.FMSynth({ attack:44, decay:44100 }).connect();
var sineL = new Gibberish.Sine2(432, 0.5, 1);
var sineR = new Gibberish.Sine2(432, 0.5, -1);//var sample = new Gibberish.Sampler({ file:'../songs/deadmau5.mp3', playOnLoad: 1 });
//var sample = new Gibberish.Sampler({ file:'../songs/deadmau5.mp3', playOnLoad: 1 });
var distortion = new Gibberish.Distortion({ input:synth, amount:30 });
var delay = new Gibberish.Delay({ input:synth, time:22050, feedback:.35 });
var decimator = new Gibberish.Decimator({ input:synth, bitDepth:4.2, synthRate:.33 });
var modulator = new Gibberish.RingModulation({ input:synth, frequency:1000, synthmp:.4, mix:1 });
var reverb = new Gibberish.Reverb({input:synth, roomSize:.5, wet:1, dry:.25});
//var shuffler = b = new Gibberish.BufferShuffler({input:sample, chance:.25, rate:44100, pitchMin:-2, pitchMax:2 }).connect();
//https://docs.google.com/document/d/1dli3YXWpzMMOBFSNRoqJ9ZCFCYQOUHHBdy93joftjXc/pub
//Auto Reload Documents 
   //var Gaze = require('gaze').Gaze;
   //var gaze = new Gaze('**/*');

  // gaze.on('all', function(event, filepath) {
     //if (location)
     //  location.reload();
  // });



