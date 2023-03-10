
class SpeechProcessor extends AudioWorkletProcessor {
  constructor(options) {
    // The super constructor call is required.
    super(options);
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = []; // Make sure output array can be assigned to
    for (let channel = 0; channel < input.length; channel += 1) {
      output[channel] = input[channel];
    }
    this.port.postMessage(output[0]);
    return true;
  }
}

registerProcessor('speech-processor', SpeechProcessor);
