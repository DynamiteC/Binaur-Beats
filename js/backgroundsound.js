
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
var noiseNode;
// var osc,osc2,osc3,osc4,gainOsc,gainOsc2,gainOsc3,gainOsc4;
// var kickNode,snareNode,hihatNode;
// var mixGain = audioContext.createGain();
// var filterGain = audioContext.createGain();
// var mixButton = document.querySelector('#mixButton');
function noise(element) {


    if(element.value == "Add Noise")
    {
    noiseNode= audioContext.createBufferSource(),
    buffer = audioContext.createBuffer(1, 4096, audioContext.sampleRate),
    data = buffer.getChannelData(0);
    for (var i = 0; i < 4096; i++) {

        data[i] = Math.random();
    }

    noiseNode.buffer = buffer;
    noiseNode.loop = true;
    noiseNode.start(audioContext.currentTime);
    noiseNode.connect(audioContext.destination);
    document.getElementById("backgroundNoise").value = "Remove Noise";
  }
  else {

    noiseNode.stop();
    document.getElementById("backgroundNoise").value = "Add Noise";
    // document.getElementById("backgroundNoise").style.display = "none";
  }
};

function showExtraOptions(element)
{
  if(element.value == "Show Presets")
  {
    document.getElementById("showExtra").style.display = "inline";
    document.getElementById("extraButton").value = "Hide Presets";
  }
  else
  {
    document.getElementById("showExtra").style.display = "none";
    document.getElementById("extraButton").value = "Show Presets";
  }
}
