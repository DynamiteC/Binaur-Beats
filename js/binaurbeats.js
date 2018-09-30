var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var lFreq, rFreq;
var gainNodeL, gainNodeR;
var oscillatorL, oscillatorR;
var timerInterval, timerRemaining;
var volume;

var clearTimer = function() {
    if (timerInterval) {
        window.clearInterval(timerInterval);
        document.getElementById("timerValue").innerHTML = '';
    }
};

var beep = function() {
  document.getElementById("toggleButton").value = 'Stop';

  oscillatorL = audioCtx.createOscillator();
  oscillatorR = audioCtx.createOscillator();

  oscillatorL.frequency.value = lFreq;
  oscillatorR.frequency.value = rFreq;

  oscillatorL.type = 'sine';
  oscillatorR.type = 'sine';

  gainNodeL = audioCtx.createGain();
  gainNodeR = audioCtx.createGain();

  gainNodeL.gain.value = volume;
  gainNodeR.gain.value = volume;

  var StereoPannerOptionsL = {
    pan : -1.0
  };
  var StereoPannerOptionsR = {
    pan : 1.0
  };

  var panNodeL = audioCtx.createStereoPanner();
  panNodeL.pan.value = -1.0;
  var panNodeR = audioCtx.createStereoPanner();
  panNodeR.pan.value = 1.0;

  oscillatorL.connect(gainNodeL);
  oscillatorR.connect(gainNodeR);

  gainNodeL.connect(panNodeL);
  gainNodeR.connect(panNodeR);

  panNodeL.connect(audioCtx.destination);
  panNodeR.connect(audioCtx.destination);

  oscillatorL.start();
  oscillatorR.start();

};

var stop = function() {
  clearTimer();
  document.getElementById("toggleButton").value = 'Play';
  if (oscillatorL) {
    oscillatorL.stop();
    oscillatorR.stop();
  }
};

var adjustVolume = function() {
  volume = document.getElementById("vIn").value / 100;
  document.getElementById("vOut").innerHTML = volume;
  if (gainNodeL) {
    gainNodeL.gain.value = volume;
    gainNodeR.gain.value = volume;
  }
};

var show = function() {
  stop();
  var carrierFrequency = Number(document.getElementById("cIn").value);
  var beatFrequency = Number(document.getElementById("bIn").value / 100);
  lFreq = carrierFrequency - (beatFrequency / 2);
  rFreq = carrierFrequency + (beatFrequency / 2);

  document.getElementById("cOut").value = carrierFrequency;
  document.getElementById("bOut").value = beatFrequency;
  document.getElementById("fOutL").innerHTML = lFreq + ' Hz';
  document.getElementById("fOutR").innerHTML = rFreq + ' Hz';

  volume = document.getElementById("vIn").value / 100;
  document.getElementById("vOut").innerHTML = volume;
};

var inputText = function() {
  document.getElementById("cIn").value = Number(document.getElementById("cOut").value);
  document.getElementById("bIn").value = Number(document.getElementById("bOut").value) * 100;
  show();
};

var toggle = function() {
  var currentValue = document.getElementById("toggleButton").value;
  if (currentValue == 'Play') {
  	document.getElementById("Player").classList.add('gif');
    beep();
  } else {
  	document.getElementById("Player").classList.remove('gif');
    stop();
  }
};

var preset = function(carrier,beat) {
  document.getElementById("cOut").value = carrier;
  document.getElementById("bOut").value = beat;
  inputText();
};

var str_pad_left = function(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
};

var updateTimer = function() {
    timerRemaining = timerRemaining - 1;
    var minutes = Math.floor(timerRemaining / 60);
    var seconds = timerRemaining - minutes * 60;
    seconds = str_pad_left(seconds, '0', 2);
    var timeLeft = minutes + ":" + seconds;
    document.getElementById("timerValue").innerHTML = timeLeft;
    if (timerRemaining < 1) {
        stop();
    }
};

var timer = function(length) {
    var currentValue = document.getElementById("toggleButton").value;
    if (currentValue == 'Stop') {
      stop();
    }
    timerRemaining = length * 60;
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
    toggle();
};

window.onload = function() {
  show();
};
