
// Dependencies for this module:
//   ../../fs

import { PathLike } from "fs";
import * as fs from "fs";

/**
    * Represents audio input configuration used for specifying what type of input to use (microphone, file, stream).
    * @class AudioConfig
    * Updated in version 1.11.0
    */
export abstract class AudioConfig {
        /**
            * Creates an AudioConfig object representing the default microphone on the system.
            * @member AudioConfig.fromDefaultMicrophoneInput
            * @function
            * @public
            * @returns {AudioConfig} The audio input configuration being created.
            */
        static fromDefaultMicrophoneInput(): AudioConfig;
        /**
            * Creates an AudioConfig object representing a microphone with the specified device ID.
            * @member AudioConfig.fromMicrophoneInput
            * @function
            * @public
            * @param {string | undefined} deviceId - Specifies the device ID of the microphone to be used.
            * Default microphone is used the value is omitted.
            * @returns {AudioConfig} The audio input configuration being created.
            */
        static fromMicrophoneInput(deviceId?: string): AudioConfig;
        /**
            * Creates an AudioConfig object representing the specified file.
            * @member AudioConfig.fromWavFileInput
            * @function
            * @public
            * @param {File} fileName - Specifies the audio input file. Currently, only WAV / PCM is supported.
            * @returns {AudioConfig} The audio input configuration being created.
            */
        static fromWavFileInput(file: File | Buffer, name?: string): AudioConfig;
        /**
            * Creates an AudioConfig object representing the specified stream.
            * @member AudioConfig.fromStreamInput
            * @function
            * @public
            * @param {AudioInputStream | PullAudioInputStreamCallback | MediaStream} audioStream - Specifies the custom audio input
            * stream. Currently, only WAV / PCM is supported.
            * @returns {AudioConfig} The audio input configuration being created.
            */
        static fromStreamInput(audioStream: AudioInputStream | PullAudioInputStreamCallback | MediaStream): AudioConfig;
        /**
            * Creates an AudioConfig object representing the default speaker.
            * @member AudioConfig.fromDefaultSpeakerOutput
            * @function
            * @public
            * @returns {AudioConfig} The audio output configuration being created.
            * Added in version 1.11.0
            */
        static fromDefaultSpeakerOutput(): AudioConfig;
        /**
            * Creates an AudioConfig object representing the custom IPlayer object.
            * You can use the IPlayer object to control pause, resume, etc.
            * @member AudioConfig.fromSpeakerOutput
            * @function
            * @public
            * @param {IPlayer} player - the IPlayer object for playback.
            * @returns {AudioConfig} The audio output configuration being created.
            * Added in version 1.12.0
            */
        static fromSpeakerOutput(player?: IPlayer): AudioConfig;
        /**
            * Creates an AudioConfig object representing a specified output audio file
            * @member AudioConfig.fromAudioFileOutput
            * @function
            * @public
            * @param {PathLike} filename - the filename of the output audio file
            * @returns {AudioConfig} The audio output configuration being created.
            * Added in version 1.11.0
            */
        static fromAudioFileOutput(filename: PathLike): AudioConfig;
        /**
            * Creates an AudioConfig object representing a specified audio output stream
            * @member AudioConfig.fromStreamOutput
            * @function
            * @public
            * @param {AudioOutputStream | PushAudioOutputStreamCallback} audioStream - Specifies the custom audio output
            * stream.
            * @returns {AudioConfig} The audio output configuration being created.
            * Added in version 1.11.0
            */
        static fromStreamOutput(audioStream: AudioOutputStream | PushAudioOutputStreamCallback): AudioConfig;
        /**
            * Explicitly frees any external resource attached to the object
            * @member AudioConfig.prototype.close
            * @function
            * @public
            */
        abstract close(): void;
        /**
            * Sets an arbitrary property.
            * @member SpeechConfig.prototype.setProperty
            * @function
            * @public
            * @param {string} name - The name of the property to set.
            * @param {string} value - The new value of the property.
            */
        abstract setProperty(name: string, value: string): void;
        /**
            * Returns the current value of an arbitrary property.
            * @member SpeechConfig.prototype.getProperty
            * @function
            * @public
            * @param {string} name - The name of the property to query.
            * @param {string} def - The value to return in case the property is not known.
            * @returns {string} The current value, or provided default, of the given property.
            */
        abstract getProperty(name: string, def?: string): string;
}
/**
    * Represents audio input stream used for custom audio input configurations.
    * @private
    * @class AudioConfigImpl
    */
export class AudioConfigImpl extends AudioConfig implements IAudioSource {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {IAudioSource} source - An audio source.
            */
        constructor(source: IAudioSource);
        /**
            * Format information for the audio
            */
        get format(): Promise<AudioStreamFormatImpl>;
        /**
            * @member AudioConfigImpl.prototype.close
            * @function
            * @public
            */
        close(cb?: () => void, err?: (error: string) => void): void;
        /**
            * @member AudioConfigImpl.prototype.id
            * @function
            * @public
            */
        id(): string;
        /**
            * @member AudioConfigImpl.prototype.blob
            * @function
            * @public
            */
        get blob(): Promise<Blob | Buffer>;
        /**
            * @member AudioConfigImpl.prototype.turnOn
            * @function
            * @public
            * @returns {Promise<void>} A promise.
            */
        turnOn(): Promise<void>;
        /**
            * @member AudioConfigImpl.prototype.attach
            * @function
            * @public
            * @param {string} audioNodeId - The audio node id.
            * @returns {Promise<IAudioStreamNode>} A promise.
            */
        attach(audioNodeId: string): Promise<IAudioStreamNode>;
        /**
            * @member AudioConfigImpl.prototype.detach
            * @function
            * @public
            * @param {string} audioNodeId - The audio node id.
            */
        detach(audioNodeId: string): void;
        /**
            * @member AudioConfigImpl.prototype.turnOff
            * @function
            * @public
            * @returns {Promise<void>} A promise.
            */
        turnOff(): Promise<void>;
        /**
            * @member AudioConfigImpl.prototype.events
            * @function
            * @public
            * @returns {EventSource<AudioSourceEvent>} An event source for audio events.
            */
        get events(): EventSource<AudioSourceEvent>;
        setProperty(name: string, value: string): void;
        getProperty(name: string, def?: string): string;
        get deviceInfo(): Promise<ISpeechConfigAudioDevice>;
}
export class AudioOutputConfigImpl extends AudioConfig implements IAudioDestination {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {IAudioDestination} destination - An audio destination.
            */
        constructor(destination: IAudioDestination);
        set format(format: AudioStreamFormat);
        write(buffer: ArrayBuffer): void;
        close(): void;
        id(): string;
        setProperty(): void;
        getProperty(): string;
}

export enum AudioFormatTag {
        PCM = 1,
        MuLaw = 2,
        Siren = 3,
        MP3 = 4,
        SILKSkype = 5,
        OGG_OPUS = 6,
        WEBM_OPUS = 7,
        ALaw = 8,
        FLAC = 9,
        OPUS = 10
}
/**
    * Represents audio stream format used for custom audio input configurations.
    * @class AudioStreamFormat
    */
export abstract class AudioStreamFormat {
        /**
            * Creates an audio stream format object representing the default audio stream
            * format (16KHz 16bit mono PCM).
            * @member AudioStreamFormat.getDefaultInputFormat
            * @function
            * @public
            * @returns {AudioStreamFormat} The audio stream format being created.
            */
        static getDefaultInputFormat(): AudioStreamFormat;
        /**
            * Creates an audio stream format object with the specified format characteristics.
            * @member AudioStreamFormat.getWaveFormat
            * @function
            * @public
            * @param {number} samplesPerSecond - Sample rate, in samples per second (Hertz).
            * @param {number} bitsPerSample - Bits per sample, typically 16.
            * @param {number} channels - Number of channels in the waveform-audio data. Monaural data
            * uses one channel and stereo data uses two channels.
            * @param {AudioFormatTag} format - Audio format (PCM, alaw or mulaw).
            * @returns {AudioStreamFormat} The audio stream format being created.
            */
        static getWaveFormat(samplesPerSecond: number, bitsPerSample: number, channels: number, format: AudioFormatTag): AudioStreamFormat;
        /**
            * Creates an audio stream format object with the specified pcm waveformat characteristics.
            * @member AudioStreamFormat.getWaveFormatPCM
            * @function
            * @public
            * @param {number} samplesPerSecond - Sample rate, in samples per second (Hertz).
            * @param {number} bitsPerSample - Bits per sample, typically 16.
            * @param {number} channels - Number of channels in the waveform-audio data. Monaural data
            * uses one channel and stereo data uses two channels.
            * @returns {AudioStreamFormat} The audio stream format being created.
            */
        static getWaveFormatPCM(samplesPerSecond: number, bitsPerSample: number, channels: number): AudioStreamFormat;
        /**
            * Explicitly frees any external resource attached to the object
            * @member AudioStreamFormat.prototype.close
            * @function
            * @public
            */
        abstract close(): void;
}
/**
    * @private
    * @class AudioStreamFormatImpl
    */
export class AudioStreamFormatImpl extends AudioStreamFormat {
        protected privHeader: ArrayBuffer;
        /**
            * Creates an instance with the given values.
            * @constructor
            * @param {number} samplesPerSec - Samples per second.
            * @param {number} bitsPerSample - Bits per sample.
            * @param {number} channels - Number of channels.
            * @param {AudioFormatTag} format - Audio format (PCM, alaw or mulaw).
            */
        constructor(samplesPerSec?: number, bitsPerSample?: number, channels?: number, format?: AudioFormatTag);
        /**
            * Retrieves the default input format.
            * @member AudioStreamFormatImpl.getDefaultInputFormat
            * @function
            * @public
            * @returns {AudioStreamFormatImpl} The default input format.
            */
        static getDefaultInputFormat(): AudioStreamFormatImpl;
        /**
            * Creates an audio context appropriate to current browser
            * @member AudioStreamFormatImpl.getAudioContext
            * @function
            * @public
            * @returns {AudioContext} An audio context instance
            */
        static getAudioContext(sampleRate?: number): AudioContext;
        /**
            * Closes the configuration object.
            * @member AudioStreamFormatImpl.prototype.close
            * @function
            * @public
            */
        close(): void;
        /**
            * The format of the audio, valid values: 1 (PCM)
            * @member AudioStreamFormatImpl.prototype.formatTag
            * @function
            * @public
            */
        formatTag: number;
        /**
            * The number of channels, valid values: 1 (Mono).
            * @member AudioStreamFormatImpl.prototype.channels
            * @function
            * @public
            */
        channels: number;
        /**
            * The sample rate, valid values: 16000.
            * @member AudioStreamFormatImpl.prototype.samplesPerSec
            * @function
            * @public
            */
        samplesPerSec: number;
        /**
            * The bits per sample, valid values: 16
            * @member AudioStreamFormatImpl.prototype.b
            * @function
            * @public
            */
        bitsPerSample: number;
        /**
            * Average bytes per second, usually calculated as nSamplesPerSec * nChannels * ceil(wBitsPerSample, 8).
            * @member AudioStreamFormatImpl.prototype.avgBytesPerSec
            * @function
            * @public
            */
        avgBytesPerSec: number;
        /**
            * The size of a single frame, valid values: nChannels * ceil(wBitsPerSample, 8).
            * @member AudioStreamFormatImpl.prototype.blockAlign
            * @function
            * @public
            */
        blockAlign: number;
        get header(): ArrayBuffer;
        protected setString(view: DataView, offset: number, str: string): void;
}

/**
    * Represents audio input stream used for custom audio input configurations.
    * @class AudioInputStream
    */
export abstract class AudioInputStream {
        /**
            * Creates and initializes an instance.
            * @constructor
            */
        protected constructor();
        /**
            * Creates a memory backed PushAudioInputStream with the specified audio format.
            * @member AudioInputStream.createPushStream
            * @function
            * @public
            * @param {AudioStreamFormat} format - The audio data format in which audio will be
            * written to the push audio stream's write() method (Required if format is not 16 kHz 16bit mono PCM).
            * @returns {PushAudioInputStream} The audio input stream being created.
            */
        static createPushStream(format?: AudioStreamFormat): PushAudioInputStream;
        /**
            * Creates a PullAudioInputStream that delegates to the specified callback interface for read()
            * and close() methods.
            * @member AudioInputStream.createPullStream
            * @function
            * @public
            * @param {PullAudioInputStreamCallback} callback - The custom audio input object, derived from
            * PullAudioInputStreamCallback
            * @param {AudioStreamFormat} format - The audio data format in which audio will be returned from
            * the callback's read() method (Required if format is not 16 kHz 16bit mono PCM).
            * @returns {PullAudioInputStream} The audio input stream being created.
            */
        static createPullStream(callback: PullAudioInputStreamCallback, format?: AudioStreamFormat): PullAudioInputStream;
        /**
            * Explicitly frees any external resource attached to the object
            * @member AudioInputStream.prototype.close
            * @function
            * @public
            */
        abstract close(): void;
}
/**
    * Represents memory backed push audio input stream used for custom audio input configurations.
    * @class PushAudioInputStream
    */
export abstract class PushAudioInputStream extends AudioInputStream {
        /**
            * Creates a memory backed PushAudioInputStream with the specified audio format.
            * @member PushAudioInputStream.create
            * @function
            * @public
            * @param {AudioStreamFormat} format - The audio data format in which audio will be written to the
            * push audio stream's write() method (Required if format is not 16 kHz 16bit mono PCM).
            * @returns {PushAudioInputStream} The push audio input stream being created.
            */
        static create(format?: AudioStreamFormat): PushAudioInputStream;
        /**
            * Writes the audio data specified by making an internal copy of the data.
            * @member PushAudioInputStream.prototype.write
            * @function
            * @public
            * @param {ArrayBuffer} dataBuffer - The audio buffer of which this function will make a copy.
            */
        abstract write(dataBuffer: ArrayBuffer): void;
        /**
            * Closes the stream.
            * @member PushAudioInputStream.prototype.close
            * @function
            * @public
            */
        abstract close(): void;
}
/**
    * Represents memory backed push audio input stream used for custom audio input configurations.
    * @private
    * @class PushAudioInputStreamImpl
    */
export class PushAudioInputStreamImpl extends PushAudioInputStream implements IAudioSource {
        /**
            * Creates and initalizes an instance with the given values.
            * @constructor
            * @param {AudioStreamFormat} format - The audio stream format.
            */
        constructor(format?: AudioStreamFormat);
        /**
            * Format information for the audio
            */
        get format(): Promise<AudioStreamFormatImpl>;
        /**
            * Writes the audio data specified by making an internal copy of the data.
            * @member PushAudioInputStreamImpl.prototype.write
            * @function
            * @public
            * @param {ArrayBuffer} dataBuffer - The audio buffer of which this function will make a copy.
            */
        write(dataBuffer: ArrayBuffer): void;
        /**
            * Closes the stream.
            * @member PushAudioInputStreamImpl.prototype.close
            * @function
            * @public
            */
        close(): void;
        id(): string;
        get blob(): Promise<Blob | Buffer>;
        turnOn(): Promise<void>;
        attach(audioNodeId: string): Promise<IAudioStreamNode>;
        detach(audioNodeId: string): void;
        turnOff(): Promise<void>;
        get events(): EventSource<AudioSourceEvent>;
        get deviceInfo(): Promise<ISpeechConfigAudioDevice>;
}
export abstract class PullAudioInputStream extends AudioInputStream {
        /**
            * Creates and initializes and instance.
            * @constructor
            */
        protected constructor();
        /**
            * Creates a PullAudioInputStream that delegates to the specified callback interface for
            * read() and close() methods, using the default format (16 kHz 16bit mono PCM).
            * @member PullAudioInputStream.create
            * @function
            * @public
            * @param {PullAudioInputStreamCallback} callback - The custom audio input object,
            * derived from PullAudioInputStreamCustomCallback
            * @param {AudioStreamFormat} format - The audio data format in which audio will be
            * returned from the callback's read() method (Required if format is not 16 kHz 16bit mono PCM).
            * @returns {PullAudioInputStream} The push audio input stream being created.
            */
        static create(callback: PullAudioInputStreamCallback, format?: AudioStreamFormat): PullAudioInputStream;
        /**
            * Explicitly frees any external resource attached to the object
            * @member PullAudioInputStream.prototype.close
            * @function
            * @public
            */
        abstract close(): void;
}
/**
    * Represents audio input stream used for custom audio input configurations.
    * @private
    * @class PullAudioInputStreamImpl
    */
export class PullAudioInputStreamImpl extends PullAudioInputStream implements IAudioSource {
        /**
            * Creates a PullAudioInputStream that delegates to the specified callback interface for
            * read() and close() methods, using the default format (16 kHz 16bit mono PCM).
            * @constructor
            * @param {PullAudioInputStreamCallback} callback - The custom audio input object,
            * derived from PullAudioInputStreamCustomCallback
            * @param {AudioStreamFormat} format - The audio data format in which audio will be
            * returned from the callback's read() method (Required if format is not 16 kHz 16bit mono PCM).
            */
        constructor(callback: PullAudioInputStreamCallback, format?: AudioStreamFormatImpl);
        /**
            * Format information for the audio
            */
        get format(): Promise<AudioStreamFormatImpl>;
        /**
            * Closes the stream.
            * @member PullAudioInputStreamImpl.prototype.close
            * @function
            * @public
            */
        close(): void;
        id(): string;
        get blob(): Promise<Blob | Buffer>;
        turnOn(): Promise<void>;
        attach(audioNodeId: string): Promise<IAudioStreamNode>;
        detach(audioNodeId: string): void;
        turnOff(): Promise<void>;
        get events(): EventSource<AudioSourceEvent>;
        get deviceInfo(): Promise<ISpeechConfigAudioDevice>;
}

/**
    * Represents audio output stream used for custom audio output configurations.
    * @class AudioOutputStream
    */
export abstract class AudioOutputStream {
        /**
            * Creates and initializes an instance.
            * @constructor
            */
        protected constructor();
        /**
            * Sets the format of the AudioOutputStream
            * Note: the format is set by the synthesizer before writing. Do not set it before passing it to AudioConfig
            * @member AudioOutputStream.prototype.format
            */
        abstract set format(format: AudioStreamFormat);
        /**
            * Creates a memory backed PullAudioOutputStream with the specified audio format.
            * @member AudioOutputStream.createPullStream
            * @function
            * @public
            * @returns {PullAudioOutputStream} The audio output stream being created.
            */
        static createPullStream(): PullAudioOutputStream;
        /**
            * Explicitly frees any external resource attached to the object
            * @member AudioOutputStream.prototype.close
            * @function
            * @public
            */
        abstract close(): void;
}
/**
    * Represents memory backed push audio output stream used for custom audio output configurations.
    * @class PullAudioOutputStream
    */
export abstract class PullAudioOutputStream extends AudioOutputStream {
        /**
            * Creates a memory backed PullAudioOutputStream with the specified audio format.
            * @member PullAudioOutputStream.create
            * @function
            * @public
            * @returns {PullAudioOutputStream} The push audio output stream being created.
            */
        static create(): PullAudioOutputStream;
        /**
            * Reads audio data from the internal buffer.
            * @member PullAudioOutputStream.prototype.read
            * @function
            * @public
            * @param {ArrayBuffer} dataBuffer - An ArrayBuffer to store the read data.
            * @returns {Promise<number>} Audio buffer length has been read.
            */
        abstract read(dataBuffer: ArrayBuffer): Promise<number>;
        /**
            * Closes the stream.
            * @member PullAudioOutputStream.prototype.close
            * @function
            * @public
            */
        abstract close(): void;
}
/**
    * Represents memory backed push audio output stream used for custom audio output configurations.
    * @private
    * @class PullAudioOutputStreamImpl
    */
export class PullAudioOutputStreamImpl extends PullAudioOutputStream implements IAudioDestination {
        /**
            * Creates and initializes an instance with the given values.
            * @constructor
            */
        constructor();
        /**
            * Sets the format information to the stream. For internal use only.
            * @param {AudioStreamFormat} format - the format to be set.
            */
        set format(format: AudioStreamFormat);
        /**
            * Format information for the audio
            */
        get format(): AudioStreamFormat;
        /**
            * Checks if the stream is closed
            * @member PullAudioOutputStreamImpl.prototype.isClosed
            * @property
            * @public
            */
        get isClosed(): boolean;
        /**
            * Gets the id of the stream
            * @member PullAudioOutputStreamImpl.prototype.id
            * @property
            * @public
            */
        id(): string;
        /**
            * Reads audio data from the internal buffer.
            * @member PullAudioOutputStreamImpl.prototype.read
            * @function
            * @public
            * @param {ArrayBuffer} dataBuffer - An ArrayBuffer to store the read data.
            * @returns {Promise<number>} - Audio buffer length has been read.
            */
        read(dataBuffer: ArrayBuffer): Promise<number>;
        /**
            * Writes the audio data specified by making an internal copy of the data.
            * @member PullAudioOutputStreamImpl.prototype.write
            * @function
            * @public
            * @param {ArrayBuffer} dataBuffer - The audio buffer of which this function will make a copy.
            */
        write(dataBuffer: ArrayBuffer): void;
        /**
            * Closes the stream.
            * @member PullAudioOutputStreamImpl.prototype.close
            * @function
            * @public
            */
        close(): void;
}
export abstract class PushAudioOutputStream extends AudioOutputStream {
        /**
            * Creates and initializes and instance.
            * @constructor
            */
        protected constructor();
        /**
            * Creates a PushAudioOutputStream that delegates to the specified callback interface for
            * write() and close() methods.
            * @member PushAudioOutputStream.create
            * @function
            * @public
            * @param {PushAudioOutputStreamCallback} callback - The custom audio output object,
            * derived from PushAudioOutputStreamCallback
            * @returns {PushAudioOutputStream} The push audio output stream being created.
            */
        static create(callback: PushAudioOutputStreamCallback): PushAudioOutputStream;
        /**
            * Explicitly frees any external resource attached to the object
            * @member PushAudioOutputStream.prototype.close
            * @function
            * @public
            */
        abstract close(): void;
}
/**
    * Represents audio output stream used for custom audio output configurations.
    * @private
    * @class PushAudioOutputStreamImpl
    */
export class PushAudioOutputStreamImpl extends PushAudioOutputStream implements IAudioDestination {
        /**
            * Creates a PushAudioOutputStream that delegates to the specified callback interface for
            * read() and close() methods.
            * @constructor
            * @param {PushAudioOutputStreamCallback} callback - The custom audio output object,
            * derived from PushAudioOutputStreamCallback
            */
        constructor(callback: PushAudioOutputStreamCallback);
        set format(format: AudioStreamFormat);
        write(buffer: ArrayBuffer): void;
        close(): void;
        id(): string;
}

/**
    * Defines the possible reasons a recognition result might be canceled.
    * @class CancellationReason
    */
export enum CancellationReason {
        /**
            * Indicates that an error occurred during speech recognition.
            * @member CancellationReason.Error
            */
        Error = 0,
        /**
            * Indicates that the end of the audio stream was reached.
            * @member CancellationReason.EndOfStream
            */
        EndOfStream = 1
}

/**
    * An abstract base class that defines callback methods (read() and close()) for
    * custom audio input streams).
    * @class PullAudioInputStreamCallback
    */
export abstract class PullAudioInputStreamCallback {
        /**
            * Reads data from audio input stream into the data buffer. The maximal number of bytes
            * to be read is determined by the size of dataBuffer.
            * @member PullAudioInputStreamCallback.prototype.read
            * @function
            * @public
            * @param {ArrayBuffer} dataBuffer - The byte array to store the read data.
            * @returns {number} the number of bytes have been read.
            */
        abstract read(dataBuffer: ArrayBuffer): number;
        /**
            * Closes the audio input stream.
            * @member PullAudioInputStreamCallback.prototype.close
            * @function
            * @public
            */
        abstract close(): void;
}

/**
    * An abstract base class that defines callback methods (write() and close()) for
    * custom audio output streams).
    * @class PushAudioOutputStreamCallback
    */
export abstract class PushAudioOutputStreamCallback {
        /**
            * Writes audio data into the data buffer.
            * @member PushAudioOutputStreamCallback.prototype.write
            * @function
            * @public
            * @param {ArrayBuffer} dataBuffer - The byte array that stores the audio data to write.
            */
        abstract write(dataBuffer: ArrayBuffer): void;
        /**
            * Closes the audio output stream.
            * @member PushAudioOutputStreamCallback.prototype.close
            * @function
            * @public
            */
        abstract close(): void;
}

/**
    * Represents a keyword recognition model for recognizing when
    * the user says a keyword to initiate further speech recognition.
    * @class KeywordRecognitionModel
    */
export class KeywordRecognitionModel {
        /**
            * Creates a keyword recognition model using the specified filename.
            * @member KeywordRecognitionModel.fromFile
            * @function
            * @public
            * @param {string} fileName - A string that represents file name for the keyword recognition model.
            * Note, the file can point to a zip file in which case the model
            * will be extracted from the zip.
            * @returns {KeywordRecognitionModel} The keyword recognition model being created.
            */
        static fromFile(fileName: string): KeywordRecognitionModel;
        /**
            * Creates a keyword recognition model using the specified filename.
            * @member KeywordRecognitionModel.fromStream
            * @function
            * @public
            * @param {string} file - A File that represents file for the keyword recognition model.
            * Note, the file can point to a zip file in which case the model will be extracted from the zip.
            * @returns {KeywordRecognitionModel} The keyword recognition model being created.
            */
        static fromStream(file: File): KeywordRecognitionModel;
        /**
            * Dispose of associated resources.
            * @member KeywordRecognitionModel.prototype.close
            * @function
            * @public
            */
        close(): void;
}

/**
    * Defines content for session events like SessionStarted/Stopped, SoundStarted/Stopped.
    * @class SessionEventArgs
    */
export class SessionEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {string} sessionId - The session id.
            */
        constructor(sessionId: string);
        /**
            * Represents the session identifier.
            * @member SessionEventArgs.prototype.sessionId
            * @function
            * @public
            * @returns {string} Represents the session identifier.
            */
        get sessionId(): string;
}

/**
    * Defines payload for session events like Speech Start/End Detected
    * @class
    */
export class RecognitionEventArgs extends SessionEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {number} offset - The offset.
            * @param {string} sessionId - The session id.
            */
        constructor(offset: number, sessionId?: string);
        /**
            * Represents the message offset
            * @member RecognitionEventArgs.prototype.offset
            * @function
            * @public
            */
        get offset(): number;
}

/**
    * Define Speech Recognizer output formats.
    * @class OutputFormat
    */
export enum OutputFormat {
        /**
            * @member OutputFormat.Simple
            */
        Simple = 0,
        /**
            * @member OutputFormat.Detailed
            */
        Detailed = 1
}

/**
    * Intent recognition result event arguments.
    * @class
    */
export class IntentRecognitionEventArgs extends RecognitionEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param result - The result of the intent recognition.
            * @param offset - The offset.
            * @param sessionId - The session id.
            */
        constructor(result: IntentRecognitionResult, offset?: number, sessionId?: string);
        /**
            * Represents the intent recognition result.
            * @member IntentRecognitionEventArgs.prototype.result
            * @function
            * @public
            * @returns {IntentRecognitionResult} Represents the intent recognition result.
            */
        get result(): IntentRecognitionResult;
}

/**
    * Defines result of speech recognition.
    * @class RecognitionResult
    */
export class RecognitionResult {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {string} resultId - The result id.
            * @param {ResultReason} reason - The reason.
            * @param {string} text - The recognized text.
            * @param {number} duration - The duration.
            * @param {number} offset - The offset into the stream.
            * @param {string} language - Primary Language detected, if provided.
            * @param {string} languageDetectionConfidence - Primary Language confidence ("Unknown," "Low," "Medium," "High"...), if provided.
            * @param {string} errorDetails - Error details, if provided.
            * @param {string} json - Additional Json, if provided.
            * @param {PropertyCollection} properties - Additional properties, if provided.
            */
        constructor(resultId?: string, reason?: ResultReason, text?: string, duration?: number, offset?: number, language?: string, languageDetectionConfidence?: string, errorDetails?: string, json?: string, properties?: PropertyCollection);
        /**
            * Specifies the result identifier.
            * @member RecognitionResult.prototype.resultId
            * @function
            * @public
            * @returns {string} Specifies the result identifier.
            */
        get resultId(): string;
        /**
            * Specifies status of the result.
            * @member RecognitionResult.prototype.reason
            * @function
            * @public
            * @returns {ResultReason} Specifies status of the result.
            */
        get reason(): ResultReason;
        /**
            * Presents the recognized text in the result.
            * @member RecognitionResult.prototype.text
            * @function
            * @public
            * @returns {string} Presents the recognized text in the result.
            */
        get text(): string;
        /**
            * Duration of recognized speech in 100 nano second increments.
            * @member RecognitionResult.prototype.duration
            * @function
            * @public
            * @returns {number} Duration of recognized speech in 100 nano second increments.
            */
        get duration(): number;
        /**
            * Offset of recognized speech in 100 nano second increments.
            * @member RecognitionResult.prototype.offset
            * @function
            * @public
            * @returns {number} Offset of recognized speech in 100 nano second increments.
            */
        get offset(): number;
        /**
            * Primary Language detected.
            * @member RecognitionResult.prototype.language
            * @function
            * @public
            * @returns {string} language detected.
            */
        get language(): string;
        /**
            * Primary Language detection confidence (Unknown, Low, Medium, High).
            * @member RecognitionResult.prototype.languageDetectionConfidence
            * @function
            * @public
            * @returns {string} detection confidence strength.
            */
        get languageDetectionConfidence(): string;
        /**
            * In case of an unsuccessful recognition, provides details of the occurred error.
            * @member RecognitionResult.prototype.errorDetails
            * @function
            * @public
            * @returns {string} a brief description of an error.
            */
        get errorDetails(): string;
        /**
            * A string containing Json serialized recognition result as it was received from the service.
            * @member RecognitionResult.prototype.json
            * @function
            * @private
            * @returns {string} Json serialized representation of the result.
            */
        get json(): string;
        /**
            * The set of properties exposed in the result.
            * @member RecognitionResult.prototype.properties
            * @function
            * @public
            * @returns {PropertyCollection} The set of properties exposed in the result.
            */
        get properties(): PropertyCollection;
}

/**
    * Defines result of speech recognition.
    * @class SpeechRecognitionResult
    */
export class SpeechRecognitionResult extends RecognitionResult {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @public
            * @param {string} resultId - The result id.
            * @param {ResultReason} reason - The reason.
            * @param {string} text - The recognized text.
            * @param {number} duration - The duration.
            * @param {number} offset - The offset into the stream.
            * @param {string} language - Primary Language detected, if provided.
            * @param {string} languageDetectionConfidence - Primary Language confidence ("Unknown," "Low," "Medium," "High"...), if provided.
            * @param {string} speakerId - speaker id for conversation transcription, if provided.
            * @param {string} errorDetails - Error details, if provided.
            * @param {string} json - Additional Json, if provided.
            * @param {PropertyCollection} properties - Additional properties, if provided.
            */
        constructor(resultId?: string, reason?: ResultReason, text?: string, duration?: number, offset?: number, language?: string, languageDetectionConfidence?: string, speakerId?: string, errorDetails?: string, json?: string, properties?: PropertyCollection);
        /**
            * speaker id from conversation transcription/id scenarios
            * @member SpeechRecognitionResult.prototype.speakerId
            * @function
            * @public
            * @returns {string} id of speaker in given result
            */
        get speakerId(): string;
}

/**
    * Intent recognition result.
    * @class
    */
export class IntentRecognitionResult extends SpeechRecognitionResult {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param intentId - The intent id.
            * @param resultId - The result id.
            * @param reason - The reason.
            * @param text - The recognized text.
            * @param duration - The duration.
            * @param offset - The offset into the stream.
            * @param language - Primary Language detected, if provided.
            * @param languageDetectionConfidence - Primary Language confidence ("Unknown," "Low," "Medium," "High"...), if provided.
            * @param errorDetails - Error details, if provided.
            * @param json - Additional Json, if provided.
            * @param properties - Additional properties, if provided.
            */
        constructor(intentId?: string, resultId?: string, reason?: ResultReason, text?: string, duration?: number, offset?: number, language?: string, languageDetectionConfidence?: string, errorDetails?: string, json?: string, properties?: PropertyCollection);
        /**
            * A String that represents the intent identifier being recognized.
            * @member IntentRecognitionResult.prototype.intentId
            * @function
            * @public
            * @returns {string} A String that represents the intent identifier being recognized.
            */
        get intentId(): string;
}

/**
    * Language understanding model
    * @class LanguageUnderstandingModel
    */
export class LanguageUnderstandingModel {
        /**
            * Creates and initializes a new instance
            * @constructor
            */
        protected constructor();
        /**
            * Creates an language understanding model using the specified endpoint.
            * @member LanguageUnderstandingModel.fromEndpoint
            * @function
            * @public
            * @param {URL} uri - A String that represents the endpoint of the language understanding model.
            * @returns {LanguageUnderstandingModel} The language understanding model being created.
            */
        static fromEndpoint(uri: URL): LanguageUnderstandingModel;
        /**
            * Creates an language understanding model using the application id of Language Understanding service.
            * @member LanguageUnderstandingModel.fromAppId
            * @function
            * @public
            * @param {string} appId - A String that represents the application id of Language Understanding service.
            * @returns {LanguageUnderstandingModel} The language understanding model being created.
            */
        static fromAppId(appId: string): LanguageUnderstandingModel;
        /**
            * Creates a language understanding model using hostname, subscription key and application
            * id of Language Understanding service.
            * @member LanguageUnderstandingModel.fromSubscription
            * @function
            * @public
            * @param {string} subscriptionKey - A String that represents the subscription key of
            * Language Understanding service.
            * @param {string} appId - A String that represents the application id of Language
            * Understanding service.
            * @param {LanguageUnderstandingModel} region - A String that represents the region
            * of the Language Understanding service (see the <a href="https://aka.ms/csspeech/region">region page</a>).
            * @returns {LanguageUnderstandingModel} The language understanding model being created.
            */
        static fromSubscription(subscriptionKey: string, appId: string, region: string): LanguageUnderstandingModel;
}
/**
    * @private
    * @class LanguageUnderstandingModelImpl
    */
export class LanguageUnderstandingModelImpl extends LanguageUnderstandingModel {
        appId: string;
        region: string;
        subscriptionKey: string;
}

/**
    * Defines contents of speech recognizing/recognized event.
    * @class SpeechRecognitionEventArgs
    */
export class SpeechRecognitionEventArgs extends RecognitionEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {SpeechRecognitionResult} result - The speech recognition result.
            * @param {number} offset - The offset.
            * @param {string} sessionId - The session id.
            */
        constructor(result: SpeechRecognitionResult, offset?: number, sessionId?: string);
        /**
            * Specifies the recognition result.
            * @member SpeechRecognitionEventArgs.prototype.result
            * @function
            * @public
            * @returns {SpeechRecognitionResult} the recognition result.
            */
        get result(): SpeechRecognitionResult;
}
/**
    * Defines contents of conversation transcribed/transcribing event.
    * @class ConversationTranscriptionEventArgs
    */
export class ConversationTranscriptionEventArgs extends SpeechRecognitionEventArgs {
}

export class SpeechRecognitionCanceledEventArgs extends CancellationEventArgsBase {
}

/**
    * Translation text result event arguments.
    * @class TranslationRecognitionEventArgs
    */
export class TranslationRecognitionEventArgs extends RecognitionEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {TranslationRecognitionResult} result - The translation recognition result.
            * @param {number} offset - The offset.
            * @param {string} sessionId - The session id.
            */
        constructor(result: TranslationRecognitionResult, offset?: number, sessionId?: string);
        /**
            * Specifies the recognition result.
            * @member TranslationRecognitionEventArgs.prototype.result
            * @function
            * @public
            * @returns {TranslationRecognitionResult} the recognition result.
            */
        get result(): TranslationRecognitionResult;
}

/**
    * Translation Synthesis event arguments
    * @class TranslationSynthesisEventArgs
    */
export class TranslationSynthesisEventArgs extends SessionEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {TranslationSynthesisResult} result - The translation synthesis result.
            * @param {string} sessionId - The session id.
            */
        constructor(result: TranslationSynthesisResult, sessionId?: string);
        /**
            * Specifies the translation synthesis result.
            * @member TranslationSynthesisEventArgs.prototype.result
            * @function
            * @public
            * @returns {TranslationSynthesisResult} Specifies the translation synthesis result.
            */
        get result(): TranslationSynthesisResult;
}

/**
    * Translation text result.
    * @class TranslationRecognitionResult
    */
export class TranslationRecognitionResult extends SpeechRecognitionResult {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {Translations} translations - The translations.
            * @param {string} resultId - The result id.
            * @param {ResultReason} reason - The reason.
            * @param {string} text - The recognized text.
            * @param {number} duration - The duration.
            * @param {number} offset - The offset into the stream.
            * @param {string} errorDetails - Error details, if provided.
            * @param {string} json - Additional Json, if provided.
            * @param {PropertyCollection} properties - Additional properties, if provided.
            */
        constructor(translations: Translations, resultId?: string, reason?: ResultReason, text?: string, duration?: number, offset?: number, errorDetails?: string, json?: string, properties?: PropertyCollection);
        static fromSpeechRecognitionResult(result: SpeechRecognitionResult): TranslationRecognitionResult;
        /**
            * Presents the translation results. Each item in the dictionary represents
            * a translation result in one of target languages, where the key is the name
            * of the target language, in BCP-47 format, and the value is the translation
            * text in the specified language.
            * @member TranslationRecognitionResult.prototype.translations
            * @function
            * @public
            * @returns {Translations} the current translation map that holds all translations requested.
            */
        get translations(): Translations;
}

/**
    * Defines translation synthesis result, i.e. the voice output of the translated
    * text in the target language.
    * @class TranslationSynthesisResult
    */
export class TranslationSynthesisResult {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {ResultReason} reason - The synthesis reason.
            * @param {ArrayBuffer} audio - The audio data.
            */
        constructor(reason: ResultReason, audio: ArrayBuffer);
        /**
            * Translated text in the target language.
            * @member TranslationSynthesisResult.prototype.audio
            * @function
            * @public
            * @returns {ArrayBuffer} Translated audio in the target language.
            */
        get audio(): ArrayBuffer;
        /**
            * The synthesis status.
            * @member TranslationSynthesisResult.prototype.reason
            * @function
            * @public
            * @returns {ResultReason} The synthesis status.
            */
        get reason(): ResultReason;
}

/**
    * Defines the possible reasons a recognition result might be generated.
    * @class ResultReason
    */
export enum ResultReason {
        /**
            * Indicates speech could not be recognized. More details
            * can be found in the NoMatchDetails object.
            * @member ResultReason.NoMatch
            */
        NoMatch = 0,
        /**
            * Indicates that the recognition was canceled. More details
            * can be found using the CancellationDetails object.
            * @member ResultReason.Canceled
            */
        Canceled = 1,
        /**
            * Indicates the speech result contains hypothesis text.
            * @member ResultReason.RecognizedSpeech
            */
        RecognizingSpeech = 2,
        /**
            * Indicates the speech result contains final text that has been recognized.
            * Speech Recognition is now complete for this phrase.
            * @member ResultReason.RecognizedSpeech
            */
        RecognizedSpeech = 3,
        /**
            * Indicates the speech result contains a finalized acceptance of a provided keyword.
            * Speech recognition will continue unless otherwise configured.
            * @member ResultReason.RecognizedKeyword
            */
        RecognizedKeyword = 4,
        /**
            * Indicates the intent result contains hypothesis text and intent.
            * @member ResultReason.RecognizingIntent
            */
        RecognizingIntent = 5,
        /**
            * Indicates the intent result contains final text and intent.
            * Speech Recognition and Intent determination are now complete for this phrase.
            * @member ResultReason.RecognizedIntent
            */
        RecognizedIntent = 6,
        /**
            * Indicates the translation result contains hypothesis text and its translation(s).
            * @member ResultReason.TranslatingSpeech
            */
        TranslatingSpeech = 7,
        /**
            * Indicates the translation result contains final text and corresponding translation(s).
            * Speech Recognition and Translation are now complete for this phrase.
            * @member ResultReason.TranslatedSpeech
            */
        TranslatedSpeech = 8,
        /**
            * Indicates the synthesized audio result contains a non-zero amount of audio data
            * @member ResultReason.SynthesizingAudio
            */
        SynthesizingAudio = 9,
        /**
            * Indicates the synthesized audio is now complete for this phrase.
            * @member ResultReason.SynthesizingAudioCompleted
            */
        SynthesizingAudioCompleted = 10,
        /**
            * Indicates the speech synthesis is now started
            * @member ResultReason.SynthesizingAudioStarted
            */
        SynthesizingAudioStarted = 11,
        /**
            * Indicates the voice profile is being enrolled and customers need to send more audio to create a voice profile.
            * @member ResultReason.EnrollingVoiceProfile
            */
        EnrollingVoiceProfile = 12,
        /**
            * Indicates the voice profile has been enrolled.
            * @member ResultReason.EnrolledVoiceProfile
            */
        EnrolledVoiceProfile = 13,
        /**
            * Indicates successful identification of some speakers.
            * @member ResultReason.RecognizedSpeakers
            */
        RecognizedSpeakers = 14,
        /**
            * Indicates successfully verified one speaker.
            * @member ResultReason.RecognizedSpeaker
            */
        RecognizedSpeaker = 15,
        /**
            * Indicates a voice profile has been reset successfully.
            * @member ResultReason.ResetVoiceProfile
            */
        ResetVoiceProfile = 16,
        /**
            * Indicates a voice profile has been deleted successfully.
            * @member ResultReason.DeletedVoiceProfile
            */
        DeletedVoiceProfile = 17,
        /**
            * Indicates synthesis voices list has been successfully retrieved.
            * @member ResultReason.VoicesListRetrieved
            */
        VoicesListRetrieved = 18
}

/**
    * Speech configuration.
    * @class SpeechConfig
    */
export abstract class SpeechConfig {
        /**
            * Creates and initializes an instance.
            * @constructor
            */
        protected constructor();
        /**
            * Static instance of SpeechConfig returned by passing subscriptionKey and service region.
            * Note: Please use your LanguageUnderstanding subscription key in case you want to use the Intent recognizer.
            * @member SpeechConfig.fromSubscription
            * @function
            * @public
            * @param {string} subscriptionKey - The subscription key.
            * @param {string} region - The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
            * @returns {SpeechConfig} The speech factory
            */
        static fromSubscription(subscriptionKey: string, region: string): SpeechConfig;
        /**
            * Creates an instance of the speech config with specified endpoint and subscription key.
            * This method is intended only for users who use a non-standard service endpoint or parameters.
            * Note: Please use your LanguageUnderstanding subscription key in case you want to use the Intent recognizer.
            * Note: The query parameters specified in the endpoint URL are not changed, even if they are set by any other APIs.
            * For example, if language is defined in the uri as query parameter "language=de-DE", and also set by
            * SpeechConfig.speechRecognitionLanguage = "en-US", the language setting in uri takes precedence,
            * and the effective language is "de-DE". Only the parameters that are not specified in the
            * endpoint URL can be set by other APIs.
            * Note: To use authorization token with fromEndpoint, pass an empty string to the subscriptionKey in the
            * fromEndpoint method, and then set authorizationToken="token" on the created SpeechConfig instance to
            * use the authorization token.
            * @member SpeechConfig.fromEndpoint
            * @function
            * @public
            * @param {URL} endpoint - The service endpoint to connect to.
            * @param {string} subscriptionKey - The subscription key. If a subscription key is not specified, an authorization token must be set.
            * @returns {SpeechConfig} A speech factory instance.
            */
        static fromEndpoint(endpoint: URL, subscriptionKey?: string): SpeechConfig;
        /**
            * Creates an instance of the speech config with specified host and subscription key.
            * This method is intended only for users who use a non-default service host. Standard resource path will be assumed.
            * For services with a non-standard resource path or no path at all, use fromEndpoint instead.
            * Note: Query parameters are not allowed in the host URI and must be set by other APIs.
            * Note: To use an authorization token with fromHost, use fromHost(URL),
            * and then set the AuthorizationToken property on the created SpeechConfig instance.
            * Note: Added in version 1.9.0.
            * @member SpeechConfig.fromHost
            * @function
            * @public
            * @param {URL} host - The service endpoint to connect to. Format is "protocol://host:port" where ":port" is optional.
            * @param {string} subscriptionKey - The subscription key. If a subscription key is not specified, an authorization token must be set.
            * @returns {SpeechConfig} A speech factory instance.
            */
        static fromHost(hostName: URL, subscriptionKey?: string): SpeechConfig;
        /**
            * Creates an instance of the speech factory with specified initial authorization token and region.
            * Note: The caller needs to ensure that the authorization token is valid. Before the authorization token
            * expires, the caller needs to refresh it by calling this setter with a new valid token.
            * Note: Please use a token derived from your LanguageUnderstanding subscription key in case you want
            * to use the Intent recognizer. As configuration values are copied when creating a new recognizer,
            * the new token value will not apply to recognizers that have already been created. For recognizers
            * that have been created before, you need to set authorization token of the corresponding recognizer
            * to refresh the token. Otherwise, the recognizers will encounter errors during recognition.
            * @member SpeechConfig.fromAuthorizationToken
            * @function
            * @public
            * @param {string} authorizationToken - The initial authorization token.
            * @param {string} region - The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
            * @returns {SpeechConfig} A speech factory instance.
            */
        static fromAuthorizationToken(authorizationToken: string, region: string): SpeechConfig;
        /**
            * Sets the proxy configuration.
            * Only relevant in Node.js environments.
            * Added in version 1.4.0.
            * @param proxyHostName The host name of the proxy server.
            * @param proxyPort The port number of the proxy server.
            */
        abstract setProxy(proxyHostName: string, proxyPort: number): void;
        /**
            * Sets the proxy configuration.
            * Only relevant in Node.js environments.
            * Added in version 1.4.0.
            * @param proxyHostName The host name of the proxy server, without the protocol scheme (http://)
            * @param proxyPort The port number of the proxy server.
            * @param proxyUserName The user name of the proxy server.
            * @param proxyPassword The password of the proxy server.
            */
        abstract setProxy(proxyHostName: string, proxyPort: number, proxyUserName: string, proxyPassword: string): void;
        /**
            * Gets the authorization token.
            * @member SpeechConfig.prototype.authorizationToken
            * @function
            * @public
            */
        abstract get authorizationToken(): string;
        /**
            * Gets/Sets the authorization token.
            * Note: The caller needs to ensure that the authorization token is valid. Before the authorization token
            * expires, the caller needs to refresh it by calling this setter with a new valid token.
            * @member SpeechConfig.prototype.authorizationToken
            * @function
            * @public
            * @param {string} value - The authorization token.
            */
        abstract set authorizationToken(value: string);
        /**
            * Returns the configured language.
            * @member SpeechConfig.prototype.speechRecognitionLanguage
            * @function
            * @public
            */
        abstract get speechRecognitionLanguage(): string;
        /**
            * Gets/Sets the input language.
            * @member SpeechConfig.prototype.speechRecognitionLanguage
            * @function
            * @public
            * @param {string} value - The authorization token.
            */
        abstract set speechRecognitionLanguage(value: string);
        /**
            * Sets an arbitrary property.
            * @member SpeechConfig.prototype.setProperty
            * @function
            * @public
            * @param {string | PropertyId} name - The name of the property to set.
            * @param {string} value - The new value of the property.
            */
        abstract setProperty(name: string | PropertyId, value: string): void;
        /**
            * Returns the current value of an arbitrary property.
            * @member SpeechConfig.prototype.getProperty
            * @function
            * @public
            * @param {string} name - The name of the property to query.
            * @param {string} def - The value to return in case the property is not known.
            * @returns {string} The current value, or provided default, of the given property.
            */
        abstract getProperty(name: string, def?: string): string;
        /**
            * Gets speech recognition output format (simple or detailed).
            * Note: This output format is for speech recognition result, use [SpeechConfig.speechSynthesisOutputFormat] to
            * get synthesized audio output format.
            * @member SpeechConfig.prototype.outputFormat
            * @function
            * @public
            * @returns {OutputFormat} Returns the output format.
            */
        abstract get outputFormat(): OutputFormat;
        /**
            * Gets/Sets speech recognition output format (simple or detailed).
            * Note: This output format is for speech recognition result, use [SpeechConfig.speechSynthesisOutputFormat] to
            * set synthesized audio output format.
            * @member SpeechConfig.prototype.outputFormat
            * @function
            * @public
            */
        abstract set outputFormat(format: OutputFormat);
        /**
            * Gets the endpoint ID of a customized speech model that is used for speech recognition.
            * @member SpeechConfig.prototype.endpointId
            * @function
            * @public
            * @return {string} The endpoint ID
            */
        abstract get endpointId(): string;
        /**
            * Gets/Sets the endpoint ID of a customized speech model that is used for speech recognition.
            * @member SpeechConfig.prototype.endpointId
            * @function
            * @public
            * @param {string} value - The endpoint ID
            */
        abstract set endpointId(value: string);
        /**
            * Closes the configuration.
            * @member SpeechConfig.prototype.close
            * @function
            * @public
            */
        close(): void;
        /**
            * @member SpeechConfig.prototype.subscriptionKey
            * @function
            * @public
            * @return {string} The subscription key set on the config.
            */
        abstract get subscriptionKey(): string;
        /**
            * @member SpeechConfig.prototype.region
            * @function
            * @public
            * @return {region} The region set on the config.
            */
        abstract get region(): string;
        /**
            * @member SpeechConfig.prototype.setServiceProperty
            * @function
            * @public
            * @param {name} The name of the property.
            * @param {value} Value to set.
            * @param {channel} The channel used to pass the specified property to service.
            * @summary Sets a property value that will be passed to service using the specified channel.
            * Added in version 1.7.0.
            */
        abstract setServiceProperty(name: string, value: string, channel: ServicePropertyChannel): void;
        /**
            * @member SpeechConfig.prototype.setProfanity
            * @function
            * @public
            * @param {profanity} Profanity option to set.
            * @summary Sets profanity option.
            * Added in version 1.7.0.
            */
        abstract setProfanity(profanity: ProfanityOption): void;
        /**
            * @member SpeechConfig.prototype.enableAudioLogging
            * @function
            * @public
            * @summary Enable audio logging in service.
            * Added in version 1.7.0.
            */
        abstract enableAudioLogging(): void;
        /**
            * @member SpeechConfig.prototype.requestWordLevelTimestamps
            * @function
            * @public
            * @summary Includes word-level timestamps.
            * Added in version 1.7.0.
            */
        abstract requestWordLevelTimestamps(): void;
        /**
            * @member SpeechConfig.prototype.enableDictation
            * @function
            * @public
            * @summary Enable dictation. Only supported in speech continuous recognition.
            * Added in version 1.7.0.
            */
        abstract enableDictation(): void;
        /**
            * Gets the language of the speech synthesizer.
            * @member SpeechConfig.prototype.speechSynthesisLanguage
            * @function
            * @public
            * @returns {string} Returns the speech synthesis language.
            * Added in version 1.11.0.
            */
        abstract get speechSynthesisLanguage(): string;
        /**
            * Sets the language of the speech synthesizer.
            * @member SpeechConfig.prototype.speechSynthesisLanguage
            * @function
            * @public
            * Added in version 1.11.0.
            */
        abstract set speechSynthesisLanguage(language: string);
        /**
            * Gets the voice of the speech synthesizer.
            * @member SpeechConfig.prototype.speechSynthesisVoiceName
            * @function
            * @public
            * @returns {string} Returns the speech synthesis voice.
            * Added in version 1.11.0.
            */
        abstract get speechSynthesisVoiceName(): string;
        /**
            * Sets the voice of the speech synthesizer. (see <a href="https://aka.ms/speech/tts-languages">available voices</a>).
            * @member SpeechConfig.prototype.speechSynthesisVoiceName
            * @function
            * @public
            * Added in version 1.11.0.
            */
        abstract set speechSynthesisVoiceName(voice: string);
        /**
            * Gets the speech synthesis output format.
            * @member SpeechConfig.prototype.speechSynthesisOutputFormat
            * @function
            * @public
            * @returns {SpeechSynthesisOutputFormat} Returns the speech synthesis output format
            * Added in version 1.11.0.
            */
        abstract get speechSynthesisOutputFormat(): SpeechSynthesisOutputFormat;
        /**
            * Sets the speech synthesis output format (e.g. Riff16Khz16BitMonoPcm).
            * @member SpeechConfig.prototype.speechSynthesisOutputFormat
            * @function
            * @public
            * The default format is Audio16Khz64KBitRateMonoMp3 for browser and Riff16Khz16BitMonoPcm for Node.JS
            * Added in version 1.11.0.
            */
        abstract set speechSynthesisOutputFormat(format: SpeechSynthesisOutputFormat);
}
/**
    * @public
    * @class SpeechConfigImpl
    */
export class SpeechConfigImpl extends SpeechConfig {
        constructor();
        get properties(): PropertyCollection;
        get endPoint(): URL;
        get subscriptionKey(): string;
        get region(): string;
        get authorizationToken(): string;
        set authorizationToken(value: string);
        get speechRecognitionLanguage(): string;
        set speechRecognitionLanguage(value: string);
        get autoDetectSourceLanguages(): string;
        set autoDetectSourceLanguages(value: string);
        get outputFormat(): OutputFormat;
        set outputFormat(value: OutputFormat);
        get endpointId(): string;
        set endpointId(value: string);
        setProperty(name: string | PropertyId, value: string): void;
        getProperty(name: string | PropertyId, def?: string): string;
        setProxy(proxyHostName: string, proxyPort: number): void;
        setProxy(proxyHostName: string, proxyPort: number, proxyUserName: string, proxyPassword: string): void;
        setServiceProperty(name: string, value: string): void;
        setProfanity(profanity: ProfanityOption): void;
        enableAudioLogging(): void;
        requestWordLevelTimestamps(): void;
        enableDictation(): void;
        clone(): SpeechConfigImpl;
        get speechSynthesisLanguage(): string;
        set speechSynthesisLanguage(language: string);
        get speechSynthesisVoiceName(): string;
        set speechSynthesisVoiceName(voice: string);
        get speechSynthesisOutputFormat(): SpeechSynthesisOutputFormat;
        set speechSynthesisOutputFormat(format: SpeechSynthesisOutputFormat);
}

/**
    * Speech translation configuration.
    * @class SpeechTranslationConfig
    */
export abstract class SpeechTranslationConfig extends SpeechConfig {
        /**
            * Creates an instance of recognizer config.
            */
        protected constructor();
        /**
            * Static instance of SpeechTranslationConfig returned by passing a subscription key and service region.
            * @member SpeechTranslationConfig.fromSubscription
            * @function
            * @public
            * @param {string} subscriptionKey - The subscription key.
            * @param {string} region - The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
            * @returns {SpeechTranslationConfig} The speech translation config.
            */
        static fromSubscription(subscriptionKey: string, region: string): SpeechTranslationConfig;
        /**
            * Static instance of SpeechTranslationConfig returned by passing authorization token and service region.
            * Note: The caller needs to ensure that the authorization token is valid. Before the authorization token
            * expires, the caller needs to refresh it by setting the property authorizationToken with a new
            * valid token. Otherwise, all the recognizers created by this SpeechTranslationConfig instance
            * will encounter errors during recognition.
            * As configuration values are copied when creating a new recognizer, the new token value will not apply
            * to recognizers that have already been created.
            * For recognizers that have been created before, you need to set authorization token of the corresponding recognizer
            * to refresh the token. Otherwise, the recognizers will encounter errors during recognition.
            * @member SpeechTranslationConfig.fromAuthorizationToken
            * @function
            * @public
            * @param {string} authorizationToken - The authorization token.
            * @param {string} region - The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
            * @returns {SpeechTranslationConfig} The speech translation config.
            */
        static fromAuthorizationToken(authorizationToken: string, region: string): SpeechTranslationConfig;
        /**
            * Creates an instance of the speech config with specified host and subscription key.
            * This method is intended only for users who use a non-default service host. Standard resource path will be assumed.
            * For services with a non-standard resource path or no path at all, use fromEndpoint instead.
            * Note: Query parameters are not allowed in the host URI and must be set by other APIs.
            * Note: To use an authorization token with fromHost, use fromHost(URL),
            * and then set the AuthorizationToken property on the created SpeechConfig instance.
            * Note: Added in version 1.9.0.
            * @member SpeechConfig.fromHost
            * @function
            * @public
            * @param {URL} host - The service endpoint to connect to. Format is "protocol://host:port" where ":port" is optional.
            * @param {string} subscriptionKey - The subscription key. If a subscription key is not specified, an authorization token must be set.
            * @returns {SpeechConfig} A speech factory instance.
            */
        static fromHost(hostName: URL, subscriptionKey?: string): SpeechConfig;
        /**
            * Creates an instance of the speech translation config with specified endpoint and subscription key.
            * This method is intended only for users who use a non-standard service endpoint or paramters.
            * Note: The query properties specified in the endpoint URL are not changed, even if they are
            * set by any other APIs. For example, if language is defined in the uri as query parameter
            * "language=de-DE", and also set by the speechRecognitionLanguage property, the language
            * setting in uri takes precedence, and the effective language is "de-DE".
            * Only the properties that are not specified in the endpoint URL can be set by other APIs.
            * Note: To use authorization token with fromEndpoint, pass an empty string to the subscriptionKey in the
            * fromEndpoint method, and then set authorizationToken="token" on the created SpeechConfig instance to
            * use the authorization token.
            * @member SpeechTranslationConfig.fromEndpoint
            * @function
            * @public
            * @param {URL} endpoint - The service endpoint to connect to.
            * @param {string} subscriptionKey - The subscription key.
            * @returns {SpeechTranslationConfig} A speech config instance.
            */
        static fromEndpoint(endpoint: URL, subscriptionKey: string): SpeechTranslationConfig;
        /**
            * Gets/Sets the authorization token.
            * Note: The caller needs to ensure that the authorization token is valid. Before the authorization token
            * expires, the caller needs to refresh it by calling this setter with a new valid token.
            * @member SpeechTranslationConfig.prototype.authorizationToken
            * @function
            * @public
            * @param {string} value - The authorization token.
            */
        abstract set authorizationToken(value: string);
        /**
            * Gets/Sets the speech recognition language.
            * @member SpeechTranslationConfig.prototype.speechRecognitionLanguage
            * @function
            * @public
            * @param {string} value - The authorization token.
            */
        abstract set speechRecognitionLanguage(value: string);
        /**
            * Add a (text) target language to translate into.
            * @member SpeechTranslationConfig.prototype.addTargetLanguage
            * @function
            * @public
            * @param {string} value - The language such as de-DE
            */
        abstract addTargetLanguage(value: string): void;
        /**
            * Gets the (text) target language to translate into.
            * @member SpeechTranslationConfig.prototype.targetLanguages
            * @function
            * @public
            * @param {string} value - The language such as de-DE
            */
        abstract get targetLanguages(): string[];
        /**
            * Gets the selected voice name.
            * @member SpeechTranslationConfig.prototype.voiceName
            * @function
            * @public
            * @returns {string} The voice name.
            */
        abstract get voiceName(): string;
        /**
            * Gets/Sets voice of the translated language, enable voice synthesis output.
            * @member SpeechTranslationConfig.prototype.voiceName
            * @function
            * @public
            * @param {string} value - The name of the voice.
            */
        abstract set voiceName(value: string);
        /**
            * Sets a named property as value
            * @member SpeechTranslationConfig.prototype.setProperty
            * @function
            * @public
            * @param {string} name - The name of the property.
            * @param {string} value - The value.
            */
        abstract setProperty(name: string, value: string): void;
        /**
            * Dispose of associated resources.
            * @member SpeechTranslationConfig.prototype.close
            * @function
            * @public
            */
        abstract close(): void;
}
/**
    * @private
    * @class SpeechTranslationConfigImpl
    */
export class SpeechTranslationConfigImpl extends SpeechTranslationConfig {
        constructor();
        /**
            * Gets/Sets the authorization token.
            * If this is set, subscription key is ignored.
            * User needs to make sure the provided authorization token is valid and not expired.
            * @member SpeechTranslationConfigImpl.prototype.authorizationToken
            * @function
            * @public
            * @param {string} value - The authorization token.
            */
        set authorizationToken(value: string);
        /**
            * Sets the speech recognition language.
            * @member SpeechTranslationConfigImpl.prototype.speechRecognitionLanguage
            * @function
            * @public
            * @param {string} value - The authorization token.
            */
        set speechRecognitionLanguage(value: string);
        /**
            * Gets the speech recognition language.
            * @member SpeechTranslationConfigImpl.prototype.speechRecognitionLanguage
            * @function
            * @public
            * @return {string} The speechRecognitionLanguage.
            */
        get speechRecognitionLanguage(): string;
        /**
            * @member SpeechTranslationConfigImpl.prototype.subscriptionKey
            * @function
            * @public
            */
        get subscriptionKey(): string;
        /**
            * Gets the output format
            * @member SpeechTranslationConfigImpl.prototype.outputFormat
            * @function
            * @public
            */
        get outputFormat(): OutputFormat;
        /**
            * Gets/Sets the output format
            * @member SpeechTranslationConfigImpl.prototype.outputFormat
            * @function
            * @public
            */
        set outputFormat(value: OutputFormat);
        /**
            * Gets the endpoint id.
            * @member SpeechTranslationConfigImpl.prototype.endpointId
            * @function
            * @public
            */
        get endpointId(): string;
        /**
            * Gets/Sets the endpoint id.
            * @member SpeechTranslationConfigImpl.prototype.endpointId
            * @function
            * @public
            */
        set endpointId(value: string);
        /**
            * Add a (text) target language to translate into.
            * @member SpeechTranslationConfigImpl.prototype.addTargetLanguage
            * @function
            * @public
            * @param {string} value - The language such as de-DE
            */
        addTargetLanguage(value: string): void;
        /**
            * Gets the (text) target language to translate into.
            * @member SpeechTranslationConfigImpl.prototype.targetLanguages
            * @function
            * @public
            * @param {string} value - The language such as de-DE
            */
        get targetLanguages(): string[];
        /**
            * Gets the voice name.
            * @member SpeechTranslationConfigImpl.prototype.voiceName
            * @function
            * @public
            */
        get voiceName(): string;
        /**
            * Gets/Sets the voice of the translated language, enable voice synthesis output.
            * @member SpeechTranslationConfigImpl.prototype.voiceName
            * @function
            * @public
            * @param {string} value - The name of the voice.
            */
        set voiceName(value: string);
        /**
            * Provides the region.
            * @member SpeechTranslationConfigImpl.prototype.region
            * @function
            * @public
            * @returns {string} The region.
            */
        get region(): string;
        setProxy(proxyHostName: string, proxyPort: number): void;
        setProxy(proxyHostName: string, proxyPort: number, proxyUserName: string, proxyPassword: string): void;
        /**
            * Gets an arbitrary property value.
            * @member SpeechTranslationConfigImpl.prototype.getProperty
            * @function
            * @public
            * @param {string} name - The name of the property.
            * @param {string} def - The default value of the property in case it is not set.
            * @returns {string} The value of the property.
            */
        getProperty(name: string, def?: string): string;
        /**
            * Gets/Sets an arbitrary property value.
            * @member SpeechTranslationConfigImpl.prototype.setProperty
            * @function
            * @public
            * @param {string} name - The name of the property.
            * @param {string} value - The value of the property.
            */
        setProperty(name: string | PropertyId, value: string): void;
        /**
            * Provides access to custom properties.
            * @member SpeechTranslationConfigImpl.prototype.properties
            * @function
            * @public
            * @returns {PropertyCollection} The properties.
            */
        get properties(): PropertyCollection;
        /**
            * Dispose of associated resources.
            * @member SpeechTranslationConfigImpl.prototype.close
            * @function
            * @public
            */
        close(): void;
        setServiceProperty(name: string, value: string): void;
        setProfanity(profanity: ProfanityOption): void;
        enableAudioLogging(): void;
        requestWordLevelTimestamps(): void;
        enableDictation(): void;
        get speechSynthesisLanguage(): string;
        set speechSynthesisLanguage(language: string);
        get speechSynthesisVoiceName(): string;
        set speechSynthesisVoiceName(voice: string);
        get speechSynthesisOutputFormat(): SpeechSynthesisOutputFormat;
        set speechSynthesisOutputFormat(format: SpeechSynthesisOutputFormat);
}

/**
    * Represents collection of properties and their values.
    * @class PropertyCollection
    */
export class PropertyCollection {
        /**
            * Returns the property value in type String.
            * Currently only String, int and bool are allowed.
            * If the name is not available, the specified defaultValue is returned.
            * @member PropertyCollection.prototype.getProperty
            * @function
            * @public
            * @param {string} key - The parameter name.
            * @param {string | number | boolean} def - The default value which is returned if the parameter
            * is not available in the collection.
            * @returns {string} value of the parameter.
            */
        getProperty(key: PropertyId | string, def?: string | number | boolean): string;
        /**
            * Sets the String value of the parameter specified by name.
            * @member PropertyCollection.prototype.setProperty
            * @function
            * @public
            * @param {string} key - The parameter name.
            * @param {string} value - The value of the parameter.
            */
        setProperty(key: string | PropertyId, value: string): void;
        /**
            * Clones the collection.
            * @member PropertyCollection.prototype.clone
            * @function
            * @public
            * @returns {PropertyCollection} A copy of the collection.
            */
        clone(): PropertyCollection;
        /**
            * Merges this set of properties into another, no overwrites.
            * @member PropertyCollection.prototype.mergeTo
            * @function
            * @public
            * @param {PropertyCollection}  destinationCollection - The collection to merge into.
            */
        mergeTo(destinationCollection: PropertyCollection): void;
        /**
            * Get the keys in Property Collection.
            * @member PropertyCollection.prototype.keys
            * @function
            * @public
            * @returns {string []} Keys in the collection.
            */
        get keys(): string[];
}

/**
    * Defines speech property ids.
    * @class PropertyId
    */
export enum PropertyId {
        /**
            * The Cognitive Services Speech Service subscription Key. If you are using an intent recognizer, you need to
            * specify the LUIS endpoint key for your particular LUIS app. Under normal circumstances, you shouldn't
            * have to use this property directly.
            * Instead, use [[SpeechConfig.fromSubscription]].
            * @member PropertyId.SpeechServiceConnection_Key
            */
        SpeechServiceConnection_Key = 0,
        /**
            * The Cognitive Services Speech Service endpoint (url). Under normal circumstances, you shouldn't
            * have to use this property directly.
            * Instead, use [[SpeechConfig.fromEndpoint]].
            * NOTE: This endpoint is not the same as the endpoint used to obtain an access token.
            * @member PropertyId.SpeechServiceConnection_Endpoint
            */
        SpeechServiceConnection_Endpoint = 1,
        /**
            * The Cognitive Services Speech Service region. Under normal circumstances, you shouldn't have to
            * use this property directly.
            * Instead, use [[SpeechConfig.fromSubscription]], [[SpeechConfig.fromEndpoint]], [[SpeechConfig.fromAuthorizationToken]].
            * @member PropertyId.SpeechServiceConnection_Region
            */
        SpeechServiceConnection_Region = 2,
        /**
            * The Cognitive Services Speech Service authorization token (aka access token). Under normal circumstances,
            * you shouldn't have to use this property directly.
            * Instead, use [[SpeechConfig.fromAuthorizationToken]], [[SpeechRecognizer.authorizationToken]],
            * [[IntentRecognizer.authorizationToken]], [[TranslationRecognizer.authorizationToken]], [[SpeakerRecognizer.authorizationToken]].
            * @member PropertyId.SpeechServiceAuthorization_Token
            */
        SpeechServiceAuthorization_Token = 3,
        /**
            * The Cognitive Services Speech Service authorization type. Currently unused.
            * @member PropertyId.SpeechServiceAuthorization_Type
            */
        SpeechServiceAuthorization_Type = 4,
        /**
            * The Cognitive Services Speech Service endpoint id. Under normal circumstances, you shouldn't
            * have to use this property directly.
            * Instead, use [[SpeechConfig.endpointId]].
            * NOTE: The endpoint id is available in the Speech Portal, listed under Endpoint Details.
            * @member PropertyId.SpeechServiceConnection_EndpointId
            */
        SpeechServiceConnection_EndpointId = 5,
        /**
            * The list of comma separated languages (BCP-47 format) used as target translation languages. Under normal circumstances,
            * you shouldn't have to use this property directly.
            * Instead use [[SpeechTranslationConfig.addTargetLanguage]],
            * [[SpeechTranslationConfig.targetLanguages]], [[TranslationRecognizer.targetLanguages]].
            * @member PropertyId.SpeechServiceConnection_TranslationToLanguages
            */
        SpeechServiceConnection_TranslationToLanguages = 6,
        /**
            * The name of the Cognitive Service Text to Speech Service Voice. Under normal circumstances, you shouldn't have to use this
            * property directly.
            * Instead, use [[SpeechTranslationConfig.voiceName]].
            * NOTE: Valid voice names can be found <a href="https://aka.ms/csspeech/voicenames">here</a>.
            * @member PropertyId.SpeechServiceConnection_TranslationVoice
            */
        SpeechServiceConnection_TranslationVoice = 7,
        /**
            * Translation features.
            * @member PropertyId.SpeechServiceConnection_TranslationFeatures
            */
        SpeechServiceConnection_TranslationFeatures = 8,
        /**
            * The Language Understanding Service Region. Under normal circumstances, you shouldn't have to use this property directly.
            * Instead, use [[LanguageUnderstandingModel]].
            * @member PropertyId.SpeechServiceConnection_IntentRegion
            */
        SpeechServiceConnection_IntentRegion = 9,
        /**
            * The host name of the proxy server used to connect to the Cognitive Services Speech Service. Only relevant in Node.js environments.
            * You shouldn't have to use this property directly.
            * Instead use <see cref="SpeechConfig.SetProxy(string,int,string,string)"/>.
            * Added in version 1.4.0.
            */
        SpeechServiceConnection_ProxyHostName = 10,
        /**
            * The port of the proxy server used to connect to the Cognitive Services Speech Service. Only relevant in Node.js environments.
            * You shouldn't have to use this property directly.
            * Instead use <see cref="SpeechConfig.SetProxy(string,int,string,string)"/>.
            * Added in version 1.4.0.
            */
        SpeechServiceConnection_ProxyPort = 11,
        /**
            * The user name of the proxy server used to connect to the Cognitive Services Speech Service. Only relevant in Node.js environments.
            * You shouldn't have to use this property directly.
            * Instead use <see cref="SpeechConfig.SetProxy(string,int,string,string)"/>.
            * Added in version 1.4.0.
            */
        SpeechServiceConnection_ProxyUserName = 12,
        /**
            * The password of the proxy server used to connect to the Cognitive Services Speech Service. Only relevant in Node.js environments.
            * You shouldn't have to use this property directly.
            * Instead use <see cref="SpeechConfig.SetProxy(string,int,string,string)"/>.
            * Added in version 1.4.0.
            */
        SpeechServiceConnection_ProxyPassword = 13,
        /**
            * The Cognitive Services Speech Service recognition Mode. Can be "INTERACTIVE", "CONVERSATION", "DICTATION".
            * This property is intended to be read-only. The SDK is using it internally.
            * @member PropertyId.SpeechServiceConnection_RecoMode
            */
        SpeechServiceConnection_RecoMode = 14,
        /**
            * The spoken language to be recognized (in BCP-47 format). Under normal circumstances, you shouldn't have to use this property
            * directly.
            * Instead, use [[SpeechConfig.speechRecognitionLanguage]].
            * @member PropertyId.SpeechServiceConnection_RecoLanguage
            */
        SpeechServiceConnection_RecoLanguage = 15,
        /**
            * The session id. This id is a universally unique identifier (aka UUID) representing a specific binding of an audio input stream
            * and the underlying speech recognition instance to which it is bound. Under normal circumstances, you shouldn't have to use this
            * property directly.
            * Instead use [[SessionEventArgs.sessionId]].
            * @member PropertyId.Speech_SessionId
            */
        Speech_SessionId = 16,
        /**
            * The spoken language to be synthesized (e.g. en-US)
            * @member PropertyId.SpeechServiceConnection_SynthLanguage
            */
        SpeechServiceConnection_SynthLanguage = 17,
        /**
            * The name of the TTS voice to be used for speech synthesis
            * @member PropertyId.SpeechServiceConnection_SynthVoice
            */
        SpeechServiceConnection_SynthVoice = 18,
        /**
            * The string to specify TTS output audio format
            * @member PropertyId.SpeechServiceConnection_SynthOutputFormat
            */
        SpeechServiceConnection_SynthOutputFormat = 19,
        /**
            * The list of comma separated languages used as possible source languages
            * Added in version 1.13.0
            * @member PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages
            */
        SpeechServiceConnection_AutoDetectSourceLanguages = 20,
        /**
            * The requested Cognitive Services Speech Service response output format (simple or detailed). Under normal circumstances, you shouldn't have
            * to use this property directly.
            * Instead use [[SpeechConfig.outputFormat]].
            * @member PropertyId.SpeechServiceResponse_RequestDetailedResultTrueFalse
            */
        SpeechServiceResponse_RequestDetailedResultTrueFalse = 21,
        /**
            * The requested Cognitive Services Speech Service response output profanity level. Currently unused.
            * @member PropertyId.SpeechServiceResponse_RequestProfanityFilterTrueFalse
            */
        SpeechServiceResponse_RequestProfanityFilterTrueFalse = 22,
        /**
            * The Cognitive Services Speech Service response output (in JSON format). This property is available on recognition result objects only.
            * @member PropertyId.SpeechServiceResponse_JsonResult
            */
        SpeechServiceResponse_JsonResult = 23,
        /**
            * The Cognitive Services Speech Service error details (in JSON format). Under normal circumstances, you shouldn't have to
            * use this property directly. Instead use [[CancellationDetails.errorDetails]].
            * @member PropertyId.SpeechServiceResponse_JsonErrorDetails
            */
        SpeechServiceResponse_JsonErrorDetails = 24,
        /**
            * The cancellation reason. Currently unused.
            * @member PropertyId.CancellationDetails_Reason
            */
        CancellationDetails_Reason = 25,
        /**
            * The cancellation text. Currently unused.
            * @member PropertyId.CancellationDetails_ReasonText
            */
        CancellationDetails_ReasonText = 26,
        /**
            * The Cancellation detailed text. Currently unused.
            * @member PropertyId.CancellationDetails_ReasonDetailedText
            */
        CancellationDetails_ReasonDetailedText = 27,
        /**
            * The Language Understanding Service response output (in JSON format). Available via [[IntentRecognitionResult]]
            * @member PropertyId.LanguageUnderstandingServiceResponse_JsonResult
            */
        LanguageUnderstandingServiceResponse_JsonResult = 28,
        /**
            * The URL string built from speech configuration.
            * This property is intended to be read-only. The SDK is using it internally.
            * NOTE: Added in version 1.7.0.
            */
        SpeechServiceConnection_Url = 29,
        /**
            * The initial silence timeout value (in milliseconds) used by the service.
            * Added in version 1.7.0
            */
        SpeechServiceConnection_InitialSilenceTimeoutMs = 30,
        /**
            * The end silence timeout value (in milliseconds) used by the service.
            * Added in version 1.7.0
            */
        SpeechServiceConnection_EndSilenceTimeoutMs = 31,
        /**
            * A duration of detected silence, measured in milliseconds, after which speech-to-text will determine a spoken
            * phrase has ended and generate a final Recognized result. Configuring this timeout may be helpful in situations
            * where spoken input is significantly faster or slower than usual and default segmentation behavior consistently
            * yields results that are too long or too short. Segmentation timeout values that are inappropriately high or low
            * can negatively affect speech-to-text accuracy; this property should be carefully configured and the resulting
            * behavior should be thoroughly validated as intended.
            *
            * For more information about timeout configuration that includes discussion of default behaviors, please visit
            * https://aka.ms/csspeech/timeouts.
            *
            * Added in version 1.21.0.
            */
        Speech_SegmentationSilenceTimeoutMs = 32,
        /**
            * A boolean value specifying whether audio logging is enabled in the service or not.
            * Added in version 1.7.0
            */
        SpeechServiceConnection_EnableAudioLogging = 33,
        /**
            * The speech service connection language identifier mode.
            * Can be "AtStart" (the default), or "Continuous". See Language
            * Identification document https://aka.ms/speech/lid?pivots=programming-language-javascript
            * for more details.
            * Added in 1.25.0
            **/
        SpeechServiceConnection_LanguageIdMode = 34,
        /**
            * A string value representing the desired endpoint version to target for Speech Recognition.
            * Added in version 1.21.0
            */
        SpeechServiceConnection_RecognitionEndpointVersion = 35,
        /**
            * The requested Cognitive Services Speech Service response output profanity setting.
            * Allowed values are "masked", "removed", and "raw".
            * Added in version 1.7.0.
            */
        SpeechServiceResponse_ProfanityOption = 36,
        /**
            * A string value specifying which post processing option should be used by service.
            * Allowed values are "TrueText".
            * Added in version 1.7.0
            */
        SpeechServiceResponse_PostProcessingOption = 37,
        /**
            * A boolean value specifying whether to include word-level timestamps in the response result.
            * Added in version 1.7.0
            */
        SpeechServiceResponse_RequestWordLevelTimestamps = 38,
        /**
            * The number of times a word has to be in partial results to be returned.
            * Added in version 1.7.0
            */
        SpeechServiceResponse_StablePartialResultThreshold = 39,
        /**
            * A string value specifying the output format option in the response result. Internal use only.
            * Added in version 1.7.0.
            */
        SpeechServiceResponse_OutputFormatOption = 40,
        /**
            * A boolean value to request for stabilizing translation partial results by omitting words in the end.
            * Added in version 1.7.0.
            */
        SpeechServiceResponse_TranslationRequestStablePartialResult = 41,
        /**
            * A boolean value specifying whether to request WordBoundary events.
            * @member PropertyId.SpeechServiceResponse_RequestWordBoundary
            * Added in version 1.21.0.
            */
        SpeechServiceResponse_RequestWordBoundary = 42,
        /**
            * A boolean value specifying whether to request punctuation boundary in WordBoundary Events. Default is true.
            * @member PropertyId.SpeechServiceResponse_RequestPunctuationBoundary
            * Added in version 1.21.0.
            */
        SpeechServiceResponse_RequestPunctuationBoundary = 43,
        /**
            * A boolean value specifying whether to request sentence boundary in WordBoundary Events. Default is false.
            * @member PropertyId.SpeechServiceResponse_RequestSentenceBoundary
            * Added in version 1.21.0.
            */
        SpeechServiceResponse_RequestSentenceBoundary = 44,
        /**
            * Identifier used to connect to the backend service.
            * @member PropertyId.Conversation_ApplicationId
            */
        Conversation_ApplicationId = 45,
        /**
            * Type of dialog backend to connect to.
            * @member PropertyId.Conversation_DialogType
            */
        Conversation_DialogType = 46,
        /**
            * Silence timeout for listening
            * @member PropertyId.Conversation_Initial_Silence_Timeout
            */
        Conversation_Initial_Silence_Timeout = 47,
        /**
            * From Id to add to speech recognition activities.
            * @member PropertyId.Conversation_From_Id
            */
        Conversation_From_Id = 48,
        /**
            * ConversationId for the session.
            * @member PropertyId.Conversation_Conversation_Id
            */
        Conversation_Conversation_Id = 49,
        /**
            * Comma separated list of custom voice deployment ids.
            * @member PropertyId.Conversation_Custom_Voice_Deployment_Ids
            */
        Conversation_Custom_Voice_Deployment_Ids = 50,
        /**
            * Speech activity template, stamp properties from the template on the activity generated by the service for speech.
            * @member PropertyId.Conversation_Speech_Activity_Template
            * Added in version 1.10.0.
            */
        Conversation_Speech_Activity_Template = 51,
        /**
            * Enables or disables the receipt of turn status messages as obtained on the turnStatusReceived event.
            * @member PropertyId.Conversation_Request_Bot_Status_Messages
            * Added in version 1.15.0.
            */
        Conversation_Request_Bot_Status_Messages = 52,
        /**
            * Specifies the connection ID to be provided in the Agent configuration message, e.g. a Direct Line token for
            * channel authentication.
            * Added in version 1.15.1.
            */
        Conversation_Agent_Connection_Id = 53,
        /**
            * The Cognitive Services Speech Service host (url). Under normal circumstances, you shouldn't have to use this property directly.
            * Instead, use [[SpeechConfig.fromHost]].
            */
        SpeechServiceConnection_Host = 54,
        /**
            * Set the host for service calls to the Conversation Translator REST management and websocket calls.
            */
        ConversationTranslator_Host = 55,
        /**
            * Optionally set the the host's display name.
            * Used when joining a conversation.
            */
        ConversationTranslator_Name = 56,
        /**
            * Optionally set a value for the X-CorrelationId request header.
            * Used for troubleshooting errors in the server logs. It should be a valid guid.
            */
        ConversationTranslator_CorrelationId = 57,
        /**
            * Set the conversation token to be sent to the speech service. This enables the
            * service to service call from the speech service to the Conversation Translator service for relaying
            * recognitions. For internal use.
            */
        ConversationTranslator_Token = 58,
        /**
            * The reference text of the audio for pronunciation evaluation.
            * For this and the following pronunciation assessment parameters, see
            * https://docs.microsoft.com/azure/cognitive-services/speech-service/rest-speech-to-text#pronunciation-assessment-parameters for details.
            * Under normal circumstances, you shouldn't have to use this property directly.
            * Added in version 1.15.0
            */
        PronunciationAssessment_ReferenceText = 59,
        /**
            * The point system for pronunciation score calibration (FivePoint or HundredMark).
            * Under normal circumstances, you shouldn't have to use this property directly.
            * Added in version 1.15.0
            */
        PronunciationAssessment_GradingSystem = 60,
        /**
            * The pronunciation evaluation granularity (Phoneme, Word, or FullText).
            * Under normal circumstances, you shouldn't have to use this property directly.
            * Added in version 1.15.0
            */
        PronunciationAssessment_Granularity = 61,
        /**
            * Defines if enable miscue calculation.
            * With this enabled, the pronounced words will be compared to the reference text,
            * and will be marked with omission/insertion based on the comparison. The default setting is False.
            * Under normal circumstances, you shouldn't have to use this property directly.
            * Added in version 1.15.0
            */
        PronunciationAssessment_EnableMiscue = 62,
        /**
            * The json string of pronunciation assessment parameters
            * Under normal circumstances, you shouldn't have to use this property directly.
            * Added in version 1.15.0
            */
        PronunciationAssessment_Json = 63,
        /**
            * Pronunciation assessment parameters.
            * This property is intended to be read-only. The SDK is using it internally.
            * Added in version 1.15.0
            */
        PronunciationAssessment_Params = 64,
        /**
            * Version of Speaker Recognition API to use.
            * Added in version 1.18.0
            */
        SpeakerRecognition_Api_Version = 65
}

/**
    * Defines the base class Recognizer which mainly contains common event handlers.
    * @class Recognizer
    */
export abstract class Recognizer {
        protected audioConfig: AudioConfig;
        protected privReco: ServiceRecognizerBase;
        protected privProperties: PropertyCollection;
        /**
            * Creates and initializes an instance of a Recognizer
            * @constructor
            * @param {AudioConfig} audioInput - An optional audio input stream associated with the recognizer
            */
        protected constructor(audioConfig: AudioConfig, properties: PropertyCollection, connectionFactory: IConnectionFactory);
        /**
            * Defines event handler for session started events.
            * @member Recognizer.prototype.sessionStarted
            * @function
            * @public
            */
        sessionStarted: (sender: Recognizer, event: SessionEventArgs) => void;
        /**
            * Defines event handler for session stopped events.
            * @member Recognizer.prototype.sessionStopped
            * @function
            * @public
            */
        sessionStopped: (sender: Recognizer, event: SessionEventArgs) => void;
        /**
            * Defines event handler for speech started events.
            * @member Recognizer.prototype.speechStartDetected
            * @function
            * @public
            */
        speechStartDetected: (sender: Recognizer, event: RecognitionEventArgs) => void;
        /**
            * Defines event handler for speech stopped events.
            * @member Recognizer.prototype.speechEndDetected
            * @function
            * @public
            */
        speechEndDetected: (sender: Recognizer, event: RecognitionEventArgs) => void;
        /**
            * Dispose of associated resources.
            * @member Recognizer.prototype.close
            * @function
            * @public
            */
        close(cb?: () => void, errorCb?: (error: string) => void): void;
        /**
            * @Internal
            * Internal data member to support fromRecognizer* pattern methods on other classes.
            * Do not use externally, object returned will change without warning or notice.
            */
        get internalData(): object;
        /**
            * This method performs cleanup of resources.
            * The Boolean parameter disposing indicates whether the method is called
            * from Dispose (if disposing is true) or from the finalizer (if disposing is false).
            * Derived classes should override this method to dispose resource if needed.
            * @member Recognizer.prototype.dispose
            * @function
            * @public
            * @param {boolean} disposing - Flag to request disposal.
            */
        protected dispose(disposing: boolean): Promise<void>;
        /**
            * This method returns the current state of the telemetry setting.
            * @member Recognizer.prototype.telemetryEnabled
            * @function
            * @public
            * @returns true if the telemetry is enabled, false otherwise.
            */
        static get telemetryEnabled(): boolean;
        /**
            * This method globally enables or disables telemetry.
            * @member Recognizer.prototype.enableTelemetry
            * @function
            * @public
            * @param enabled - Global setting for telemetry collection.
            * If set to true, telemetry information like microphone errors,
            * recognition errors are collected and sent to Microsoft.
            * If set to false, no telemetry is sent to Microsoft.
            */
        static enableTelemetry(enabled: boolean): void;
        protected abstract createRecognizerConfig(speechConfig: SpeechServiceConfig): RecognizerConfig;
        protected abstract createServiceRecognizer(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioConfig: AudioConfig, recognizerConfig: RecognizerConfig): ServiceRecognizerBase;
        protected implCommonRecognizerSetup(): void;
        protected recognizeOnceAsyncImpl(recognitionMode: RecognitionMode): Promise<SpeechRecognitionResult>;
        protected startContinuousRecognitionAsyncImpl(recognitionMode: RecognitionMode): Promise<void>;
        protected stopContinuousRecognitionAsyncImpl(): Promise<void>;
        protected implRecognizerStop(): Promise<void>;
        protected static getAuthFromProperties(properties: PropertyCollection): IAuthentication;
}

/**
    * Performs speech recognition from microphone, file, or other audio input streams, and gets transcribed text as result.
    * @class SpeechRecognizer
    */
export class SpeechRecognizer extends Recognizer {
        /**
            * SpeechRecognizer constructor.
            * @constructor
            * @param {SpeechConfig} speechConfig - an set of initial properties for this recognizer
            * @param {AudioConfig} audioConfig - An optional audio configuration associated with the recognizer
            */
        constructor(speechConfig: SpeechConfig, audioConfig?: AudioConfig);
        /**
            * SpeechRecognizer constructor.
            * @constructor
            * @param {SpeechConfig} speechConfig - an set of initial properties for this recognizer
            * @param {AutoDetectSourceLanguageConfig} autoDetectSourceLanguageConfig - An source language detection configuration associated with the recognizer
            * @param {AudioConfig} audioConfig - An optional audio configuration associated with the recognizer
            */
        static FromConfig(speechConfig: SpeechConfig, autoDetectSourceLanguageConfig: AutoDetectSourceLanguageConfig, audioConfig?: AudioConfig): SpeechRecognizer;
        /**
            * The event recognizing signals that an intermediate recognition result is received.
            * @member SpeechRecognizer.prototype.recognizing
            * @function
            * @public
            */
        recognizing: (sender: Recognizer, event: SpeechRecognitionEventArgs) => void;
        /**
            * The event recognized signals that a final recognition result is received.
            * @member SpeechRecognizer.prototype.recognized
            * @function
            * @public
            */
        recognized: (sender: Recognizer, event: SpeechRecognitionEventArgs) => void;
        /**
            * The event canceled signals that an error occurred during recognition.
            * @member SpeechRecognizer.prototype.canceled
            * @function
            * @public
            */
        canceled: (sender: Recognizer, event: SpeechRecognitionCanceledEventArgs) => void;
        /**
            * Gets the endpoint id of a customized speech model that is used for speech recognition.
            * @member SpeechRecognizer.prototype.endpointId
            * @function
            * @public
            * @returns {string} the endpoint id of a customized speech model that is used for speech recognition.
            */
        get endpointId(): string;
        /**
            * Gets the authorization token used to communicate with the service.
            * @member SpeechRecognizer.prototype.authorizationToken
            * @function
            * @public
            * @returns {string} Authorization token.
            */
        get authorizationToken(): string;
        /**
            * Gets/Sets the authorization token used to communicate with the service.
            * @member SpeechRecognizer.prototype.authorizationToken
            * @function
            * @public
            * @param {string} token - Authorization token.
            */
        set authorizationToken(token: string);
        /**
            * Gets the spoken language of recognition.
            * @member SpeechRecognizer.prototype.speechRecognitionLanguage
            * @function
            * @public
            * @returns {string} The spoken language of recognition.
            */
        get speechRecognitionLanguage(): string;
        /**
            * Gets the output format of recognition.
            * @member SpeechRecognizer.prototype.outputFormat
            * @function
            * @public
            * @returns {OutputFormat} The output format of recognition.
            */
        get outputFormat(): OutputFormat;
        /**
            * The collection of properties and their values defined for this SpeechRecognizer.
            * @member SpeechRecognizer.prototype.properties
            * @function
            * @public
            * @returns {PropertyCollection} The collection of properties and their values defined for this SpeechRecognizer.
            */
        get properties(): PropertyCollection;
        /**
            * Starts speech recognition, and stops after the first utterance is recognized.
            * The task returns the recognition text as result.
            * Note: RecognizeOnceAsync() returns when the first utterance has been recognized,
            * so it is suitable only for single shot recognition
            * like command or query. For long-running recognition, use StartContinuousRecognitionAsync() instead.
            * @member SpeechRecognizer.prototype.recognizeOnceAsync
            * @function
            * @public
            * @param cb - Callback that received the SpeechRecognitionResult.
            * @param err - Callback invoked in case of an error.
            */
        recognizeOnceAsync(cb?: (e: SpeechRecognitionResult) => void, err?: (e: string) => void): void;
        /**
            * Starts speech recognition, until stopContinuousRecognitionAsync() is called.
            * User must subscribe to events to receive recognition results.
            * @member SpeechRecognizer.prototype.startContinuousRecognitionAsync
            * @function
            * @public
            * @param cb - Callback invoked once the recognition has started.
            * @param err - Callback invoked in case of an error.
            */
        startContinuousRecognitionAsync(cb?: () => void, err?: (e: string) => void): void;
        /**
            * Stops continuous speech recognition.
            * @member SpeechRecognizer.prototype.stopContinuousRecognitionAsync
            * @function
            * @public
            * @param cb - Callback invoked once the recognition has stopped.
            * @param err - Callback invoked in case of an error.
            */
        stopContinuousRecognitionAsync(cb?: () => void, err?: (e: string) => void): void;
        /**
            * Starts speech recognition with keyword spotting, until
            * stopKeywordRecognitionAsync() is called.
            * User must subscribe to events to receive recognition results.
            * Note: Key word spotting functionality is only available on the
            * Speech Devices SDK. This functionality is currently not included in the SDK itself.
            * @member SpeechRecognizer.prototype.startKeywordRecognitionAsync
            * @function
            * @public
            * @param {KeywordRecognitionModel} model The keyword recognition model that
            * specifies the keyword to be recognized.
            * @param cb - Callback invoked once the recognition has started.
            * @param err - Callback invoked in case of an error.
            */
        startKeywordRecognitionAsync(model: KeywordRecognitionModel, cb?: () => void, err?: (e: string) => void): void;
        /**
            * Stops continuous speech recognition.
            * Note: Key word spotting functionality is only available on the
            * Speech Devices SDK. This functionality is currently not included in the SDK itself.
            * @member SpeechRecognizer.prototype.stopKeywordRecognitionAsync
            * @function
            * @public
            * @param cb - Callback invoked once the recognition has stopped.
            * @param err - Callback invoked in case of an error.
            */
        stopKeywordRecognitionAsync(cb?: () => void): void;
        /**
            * closes all external resources held by an instance of this class.
            * @member SpeechRecognizer.prototype.close
            * @function
            * @public
            */
        close(cb?: () => void, errorCb?: (error: string) => void): void;
        /**
            * Disposes any resources held by the object.
            * @member SpeechRecognizer.prototype.dispose
            * @function
            * @public
            * @param {boolean} disposing - true if disposing the object.
            */
        protected dispose(disposing: boolean): Promise<void>;
        protected createRecognizerConfig(speechConfig: SpeechServiceConfig): RecognizerConfig;
        protected createServiceRecognizer(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioConfig: AudioConfig, recognizerConfig: RecognizerConfig): ServiceRecognizerBase;
}

/**
    * Intent recognizer.
    * @class
    */
export class IntentRecognizer extends Recognizer {
        /**
            * Initializes an instance of the IntentRecognizer.
            * @constructor
            * @param {SpeechConfig} speechConfig - The set of configuration properties.
            * @param {AudioConfig} audioConfig - An optional audio input config associated with the recognizer
            */
        constructor(speechConfig: SpeechConfig, audioConfig?: AudioConfig);
        /**
            * The event recognizing signals that an intermediate recognition result is received.
            * @member IntentRecognizer.prototype.recognizing
            * @function
            * @public
            */
        recognizing: (sender: IntentRecognizer, event: IntentRecognitionEventArgs) => void;
        /**
            * The event recognized signals that a final recognition result is received.
            * @member IntentRecognizer.prototype.recognized
            * @function
            * @public
            */
        recognized: (sender: IntentRecognizer, event: IntentRecognitionEventArgs) => void;
        /**
            * The event canceled signals that an error occurred during recognition.
            * @member IntentRecognizer.prototype.canceled
            * @function
            * @public
            */
        canceled: (sender: IntentRecognizer, event: IntentRecognitionCanceledEventArgs) => void;
        /**
            * Gets the spoken language of recognition.
            * @member IntentRecognizer.prototype.speechRecognitionLanguage
            * @function
            * @public
            * @returns {string} the spoken language of recognition.
            */
        get speechRecognitionLanguage(): string;
        /**
            * Gets the authorization token used to communicate with the service.
            * @member IntentRecognizer.prototype.authorizationToken
            * @function
            * @public
            * @returns {string} Authorization token.
            */
        get authorizationToken(): string;
        /**
            * Gets/Sets the authorization token used to communicate with the service.
            * Note: Please use a token derived from your LanguageUnderstanding subscription key for the Intent recognizer.
            * @member IntentRecognizer.prototype.authorizationToken
            * @function
            * @public
            * @param {string} value - Authorization token.
            */
        set authorizationToken(value: string);
        /**
            * The collection of properties and their values defined for this IntentRecognizer.
            * @member IntentRecognizer.prototype.properties
            * @function
            * @public
            * @returns {PropertyCollection} The collection of properties and their
            * values defined for this IntentRecognizer.
            */
        get properties(): PropertyCollection;
        /**
            * Starts intent recognition, and stops after the first utterance is recognized.
            * The task returns the recognition text and intent as result.
            * Note: RecognizeOnceAsync() returns when the first utterance has been recognized,
            * so it is suitable only for single shot recognition like command or query.
            * For long-running recognition, use StartContinuousRecognitionAsync() instead.
            * @member IntentRecognizer.prototype.recognizeOnceAsync
            * @function
            * @public
            * @param cb - Callback that received the recognition has finished with an IntentRecognitionResult.
            * @param err - Callback invoked in case of an error.
            */
        recognizeOnceAsync(cb?: (e: IntentRecognitionResult) => void, err?: (e: string) => void): void;
        /**
            * Starts speech recognition, until stopContinuousRecognitionAsync() is called.
            * User must subscribe to events to receive recognition results.
            * @member IntentRecognizer.prototype.startContinuousRecognitionAsync
            * @function
            * @public
            * @param cb - Callback invoked once the recognition has started.
            * @param err - Callback invoked in case of an error.
            */
        startContinuousRecognitionAsync(cb?: () => void, err?: (e: string) => void): void;
        /**
            * Stops continuous intent recognition.
            * @member IntentRecognizer.prototype.stopContinuousRecognitionAsync
            * @function
            * @public
            * @param cb - Callback invoked once the recognition has stopped.
            * @param err - Callback invoked in case of an error.
            */
        stopContinuousRecognitionAsync(cb?: () => void, err?: (e: string) => void): void;
        /**
            * Starts speech recognition with keyword spotting, until stopKeywordRecognitionAsync() is called.
            * User must subscribe to events to receive recognition results.
            * Note: Key word spotting functionality is only available on the Speech Devices SDK.
            * This functionality is currently not included in the SDK itself.
            * @member IntentRecognizer.prototype.startKeywordRecognitionAsync
            * @function
            * @public
            * @param {KeywordRecognitionModel} model - The keyword recognition model that specifies the keyword to be recognized.
            * @param cb - Callback invoked once the recognition has started.
            * @param err - Callback invoked in case of an error.
            */
        startKeywordRecognitionAsync(model: KeywordRecognitionModel, cb?: () => void, err?: (e: string) => void): void;
        /**
            * Stops continuous speech recognition.
            * Note: Key word spotting functionality is only available on the Speech Devices SDK.
            * This functionality is currently not included in the SDK itself.
            * @member IntentRecognizer.prototype.stopKeywordRecognitionAsync
            * @function
            * @public
            * @param cb - Callback invoked once the recognition has stopped.
            * @param err - Callback invoked in case of an error.
            */
        stopKeywordRecognitionAsync(cb?: () => void, err?: (e: string) => void): void;
        /**
            * Adds a phrase that should be recognized as intent.
            * @member IntentRecognizer.prototype.addIntent
            * @function
            * @public
            * @param {string} intentId - A String that represents the identifier of the intent to be recognized.
            * @param {string} phrase - A String that specifies the phrase representing the intent.
            */
        addIntent(simplePhrase: string, intentId?: string): void;
        /**
            * Adds an intent from Language Understanding service for recognition.
            * @member IntentRecognizer.prototype.addIntentWithLanguageModel
            * @function
            * @public
            * @param {string} intentId - A String that represents the identifier of the intent
            * to be recognized. Ignored if intentName is empty.
            * @param {string} model - The intent model from Language Understanding service.
            * @param {string} intentName - The intent name defined in the intent model. If it
            * is empty, all intent names defined in the model will be added.
            */
        addIntentWithLanguageModel(intentId: string, model: LanguageUnderstandingModel, intentName?: string): void;
        /**
            * @summary Adds all intents from the specified Language Understanding Model.
            * @member IntentRecognizer.prototype.addAllIntents
            * @function
            * @public
            * @function
            * @public
            * @param {LanguageUnderstandingModel} model - The language understanding model containing the intents.
            * @param {string} intentId - A custom id String to be returned in the IntentRecognitionResult's getIntentId() method.
            */
        addAllIntents(model: LanguageUnderstandingModel, intentId?: string): void;
        /**
            * closes all external resources held by an instance of this class.
            * @member IntentRecognizer.prototype.close
            * @function
            * @public
            */
        close(cb?: () => void, errorCb?: (error: string) => void): void;
        protected createRecognizerConfig(speechConfig: SpeechServiceConfig): RecognizerConfig;
        protected createServiceRecognizer(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioConfig: AudioConfig, recognizerConfig: RecognizerConfig): ServiceRecognizerBase;
        protected dispose(disposing: boolean): Promise<void>;
}

/**
    * Output format
    * @class VoiceProfileType
    */
export enum VoiceProfileType {
        /**
            * Text independent speaker identification
            * @member VoiceProfileType.TextIndependentIdentification
            */
        TextIndependentIdentification = 0,
        /**
            * Text dependent speaker verification
            * @member VoiceProfileType.TextDependentVerification
            */
        TextDependentVerification = 1,
        /**
            * Text independent speaker verification
            * @member VoiceProfileType.TextIndependentVerification
            */
        TextIndependentVerification = 2
}

/**
    * Translation recognizer
    * @class TranslationRecognizer
    */
export class TranslationRecognizer extends Recognizer {
        /**
            * The event recognizing signals that an intermediate recognition result is received.
            * @member TranslationRecognizer.prototype.recognizing
            * @function
            * @public
            */
        recognizing: (sender: TranslationRecognizer, event: TranslationRecognitionEventArgs) => void;
        /**
            * The event recognized signals that a final recognition result is received.
            * @member TranslationRecognizer.prototype.recognized
            * @function
            * @public
            */
        recognized: (sender: TranslationRecognizer, event: TranslationRecognitionEventArgs) => void;
        /**
            * The event canceled signals that an error occurred during recognition.
            * @member TranslationRecognizer.prototype.canceled
            * @function
            * @public
            */
        canceled: (sender: TranslationRecognizer, event: TranslationRecognitionCanceledEventArgs) => void;
        /**
            * The event synthesizing signals that a translation synthesis result is received.
            * @member TranslationRecognizer.prototype.synthesizing
            * @function
            * @public
            */
        synthesizing: (sender: TranslationRecognizer, event: TranslationSynthesisEventArgs) => void;
        /**
            * Initializes an instance of the TranslationRecognizer.
            * @constructor
            * @param {SpeechTranslationConfig} speechConfig - Set of properties to configure this recognizer.
            * @param {AudioConfig} audioConfig - An optional audio config associated with the recognizer
            * @param {IConnectionFactory} connectionFactory - An optional connection factory to use to generate the endpoint URIs, headers to set, etc...
            */
        constructor(speechConfig: SpeechTranslationConfig, audioConfig?: AudioConfig, connectionFactory?: IConnectionFactory);
        /**
            * Gets the language name that was set when the recognizer was created.
            * @member TranslationRecognizer.prototype.speechRecognitionLanguage
            * @function
            * @public
            * @returns {string} Gets the language name that was set when the recognizer was created.
            */
        get speechRecognitionLanguage(): string;
        /**
            * Gets target languages for translation that were set when the recognizer was created.
            * The language is specified in BCP-47 format. The translation will provide translated text for each of language.
            * @member TranslationRecognizer.prototype.targetLanguages
            * @function
            * @public
            * @returns {string[]} Gets target languages for translation that were set when the recognizer was created.
            */
        get targetLanguages(): string[];
        /**
            * Gets the name of output voice.
            * @member TranslationRecognizer.prototype.voiceName
            * @function
            * @public
            * @returns {string} the name of output voice.
            */
        get voiceName(): string;
        /**
            * The collection of properties and their values defined for this TranslationRecognizer.
            * @member TranslationRecognizer.prototype.properties
            * @function
            * @public
            * @returns {PropertyCollection} The collection of properties and their values defined for this TranslationRecognizer.
            */
        get properties(): PropertyCollection;
        /**
            * Gets the authorization token used to communicate with the service.
            * @member TranslationRecognizer.prototype.authorizationToken
            * @function
            * @public
            * @returns {string} Authorization token.
            */
        get authorizationToken(): string;
        /**
            * Gets/Sets the authorization token used to communicate with the service.
            * @member TranslationRecognizer.prototype.authorizationToken
            * @function
            * @public
            * @param {string} value - Authorization token.
            */
        set authorizationToken(value: string);
        /**
            * Starts recognition and translation, and stops after the first utterance is recognized.
            * The task returns the translation text as result.
            * Note: recognizeOnceAsync returns when the first utterance has been recognized, so it is suitable only
            * for single shot recognition like command or query. For long-running recognition,
            * use startContinuousRecognitionAsync() instead.
            * @member TranslationRecognizer.prototype.recognizeOnceAsync
            * @function
            * @public
            * @param cb - Callback that received the result when the translation has completed.
            * @param err - Callback invoked in case of an error.
            */
        recognizeOnceAsync(cb?: (e: TranslationRecognitionResult) => void, err?: (e: string) => void): void;
        /**
            * Starts recognition and translation, until stopContinuousRecognitionAsync() is called.
            * User must subscribe to events to receive translation results.
            * @member TranslationRecognizer.prototype.startContinuousRecognitionAsync
            * @function
            * @public
            * @param cb - Callback that received the translation has started.
            * @param err - Callback invoked in case of an error.
            */
        startContinuousRecognitionAsync(cb?: () => void, err?: (e: string) => void): void;
        /**
            * Stops continuous recognition and translation.
            * @member TranslationRecognizer.prototype.stopContinuousRecognitionAsync
            * @function
            * @public
            * @param cb - Callback that received the translation has stopped.
            * @param err - Callback invoked in case of an error.
            */
        stopContinuousRecognitionAsync(cb?: () => void, err?: (e: string) => void): void;
        /**
            * dynamically remove a language from list of target language
            * (can be used while recognition is ongoing)
            * @member TranslationRecognizer.prototype.removeTargetLanguage
            * @function
            * @param lang - language to be removed
            * @public
            */
        removeTargetLanguage(lang: string): void;
        /**
            * dynamically add a language to list of target language
            * (can be used while recognition is ongoing)
            * @member TranslationRecognizer.prototype.addTargetLanguage
            * @function
            * @param lang - language to be added
            * @public
            */
        addTargetLanguage(lang: string): void;
        /**
            * closes all external resources held by an instance of this class.
            * @member TranslationRecognizer.prototype.close
            * @function
            * @public
            */
        close(cb?: () => void, errorCb?: (error: string) => void): void;
        /**
            * handles ConnectionEstablishedEvent for conversation translation scenarios.
            * @member TranslationRecognizer.prototype.onConnection
            * @function
            * @public
            */
        onConnection(): void;
        /**
            * handles disconnection events for conversation translation scenarios.
            * @member TranslationRecognizer.prototype.onDisconnection
            * @function
            * @public
            */
        onDisconnection(): Promise<void>;
        protected dispose(disposing: boolean): Promise<void>;
        protected createRecognizerConfig(speechConfig: SpeechServiceConfig): RecognizerConfig;
        protected createServiceRecognizer(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioConfig: AudioConfig, recognizerConfig: RecognizerConfig): ServiceRecognizerBase;
}

/**
    * Represents collection of parameters and their values.
    * @class Translations
    */
export class Translations {
        /**
            * Get the languages in the object in a String array.
            * @member Translations.prototype.languages
            * @function
            * @public
            * @returns {string[]} languages in translations object.
            */
        get languages(): string[];
        /**
            * Returns the parameter value in type String. The parameter must have the same type as String.
            * Currently only String, int and bool are allowed.
            * If the name is not available, the specified defaultValue is returned.
            * @member Translations.prototype.get
            * @function
            * @public
            * @param {string} key - The parameter name.
            * @param {string} def - The default value which is returned if the parameter is not available in the collection.
            * @returns {string} value of the parameter.
            */
        get(key: string, def?: string): string;
        /**
            * Sets the String value of the parameter specified by name.
            * @member Translations.prototype.set
            * @function
            * @public
            * @param {string} key - The parameter name.
            * @param {string} value - The value of the parameter.
            */
        set(key: string, value: string): void;
}

/**
    * Defines the possible reasons a recognition result might not be recognized.
    * @class NoMatchReason
    */
export enum NoMatchReason {
        /**
            * Indicates that speech was detected, but not recognized.
            * @member NoMatchReason.NotRecognized
            */
        NotRecognized = 0,
        /**
            * Indicates that the start of the audio stream contained only silence,
            * and the service timed out waiting for speech.
            * @member NoMatchReason.InitialSilenceTimeout
            */
        InitialSilenceTimeout = 1,
        /**
            * Indicates that the start of the audio stream contained only noise,
            * and the service timed out waiting for speech.
            * @member NoMatchReason.InitialBabbleTimeout
            */
        InitialBabbleTimeout = 2
}

/**
    * Contains detailed information for NoMatch recognition results.
    * @class NoMatchDetails
    */
export class NoMatchDetails {
        /**
            * Creates an instance of NoMatchDetails object for the NoMatch SpeechRecognitionResults.
            * @member NoMatchDetails.fromResult
            * @function
            * @public
            * @param {SpeechRecognitionResult | IntentRecognitionResult | TranslationRecognitionResult}
            * result - The recognition result that was not recognized.
            * @returns {NoMatchDetails} The no match details object being created.
            */
        static fromResult(result: SpeechRecognitionResult | IntentRecognitionResult | TranslationRecognitionResult): NoMatchDetails;
        /**
            * The reason the recognition was canceled.
            * @member NoMatchDetails.prototype.reason
            * @function
            * @public
            * @returns {NoMatchReason} Specifies the reason canceled.
            */
        get reason(): NoMatchReason;
}

/**
    * Define payload of speech recognition canceled result events.
    * @class TranslationRecognitionCanceledEventArgs
    */
export class TranslationRecognitionCanceledEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {string} sessionid - The session id.
            * @param {CancellationReason} cancellationReason - The cancellation reason.
            * @param {string} errorDetails - Error details, if provided.
            * @param {TranslationRecognitionResult} result - The result.
            */
        constructor(sessionid: string, cancellationReason: CancellationReason, errorDetails: string, errorCode: CancellationErrorCode, result: TranslationRecognitionResult);
        /**
            * Specifies the recognition result.
            * @member TranslationRecognitionCanceledEventArgs.prototype.result
            * @function
            * @public
            * @returns {TranslationRecognitionResult} the recognition result.
            */
        get result(): TranslationRecognitionResult;
        /**
            * Specifies the session identifier.
            * @member TranslationRecognitionCanceledEventArgs.prototype.sessionId
            * @function
            * @public
            * @returns {string} the session identifier.
            */
        get sessionId(): string;
        /**
            * The reason the recognition was canceled.
            * @member TranslationRecognitionCanceledEventArgs.prototype.reason
            * @function
            * @public
            * @returns {CancellationReason} Specifies the reason canceled.
            */
        get reason(): CancellationReason;
        /**
            * The error code in case of an unsuccessful recognition.
            * Added in version 1.1.0.
            * @return An error code that represents the error reason.
            */
        get errorCode(): CancellationErrorCode;
        /**
            * In case of an unsuccessful recognition, provides details of the occurred error.
            * @member TranslationRecognitionCanceledEventArgs.prototype.errorDetails
            * @function
            * @public
            * @returns {string} A String that represents the error details.
            */
        get errorDetails(): string;
}

/**
    * Define payload of intent recognition canceled result events.
    * @class IntentRecognitionCanceledEventArgs
    */
export class IntentRecognitionCanceledEventArgs extends IntentRecognitionEventArgs implements CancellationEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {CancellationReason} result - The result of the intent recognition.
            * @param {string} offset - The offset.
            * @param {IntentRecognitionResult} sessionId - The session id.
            */
        constructor(reason: CancellationReason, errorDetails: string, errorCode: CancellationErrorCode, result?: IntentRecognitionResult, offset?: number, sessionId?: string);
        /**
            * The reason the recognition was canceled.
            * @member IntentRecognitionCanceledEventArgs.prototype.reason
            * @function
            * @public
            * @returns {CancellationReason} Specifies the reason canceled.
            */
        get reason(): CancellationReason;
        /**
            * The error code in case of an unsuccessful recognition.
            * Added in version 1.1.0.
            * @return An error code that represents the error reason.
            */
        get errorCode(): CancellationErrorCode;
        /**
            * In case of an unsuccessful recognition, provides details of the occurred error.
            * @member IntentRecognitionCanceledEventArgs.prototype.errorDetails
            * @function
            * @public
            * @returns {string} A String that represents the error details.
            */
        get errorDetails(): string;
}

/**
    * Contains detailed information about why a result was canceled.
    * @class CancellationDetailsBase
    */
export class CancellationDetailsBase {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {CancellationReason} reason - The cancellation reason.
            * @param {string} errorDetails - The error details, if provided.
            */
        protected constructor(reason: CancellationReason, errorDetails: string, errorCode: CancellationErrorCode);
        /**
            * The reason the recognition was canceled.
            * @member CancellationDetailsBase.prototype.reason
            * @function
            * @public
            * @returns {CancellationReason} Specifies the reason canceled.
            */
        get reason(): CancellationReason;
        /**
            * In case of an unsuccessful recognition, provides details of the occurred error.
            * @member CancellationDetailsBase.prototype.errorDetails
            * @function
            * @public
            * @returns {string} A String that represents the error details.
            */
        get errorDetails(): string;
        /**
            * The error code in case of an unsuccessful recognition.
            * Added in version 1.1.0.
            * @return An error code that represents the error reason.
            */
        get ErrorCode(): CancellationErrorCode;
}

/**
    * Contains detailed information about why a result was canceled.
    * @class CancellationDetails
    */
export class CancellationDetails extends CancellationDetailsBase {
        /**
            * Creates an instance of CancellationDetails object for the canceled RecognitionResult.
            * @member CancellationDetails.fromResult
            * @function
            * @public
            * @param {RecognitionResult | SpeechSynthesisResult} result - The result that was canceled.
            * @returns {CancellationDetails} The cancellation details object being created.
            */
        static fromResult(result: RecognitionResult | SpeechSynthesisResult): CancellationDetails;
}

/**
    * Defines error code in case that CancellationReason is Error.
    * Added in version 1.1.0.
    */
export enum CancellationErrorCode {
        /**
            * Indicates that no error occurred during speech recognition.
            */
        NoError = 0,
        /**
            * Indicates an authentication error.
            */
        AuthenticationFailure = 1,
        /**
            * Indicates that one or more recognition parameters are invalid.
            */
        BadRequestParameters = 2,
        /**
            * Indicates that the number of parallel requests exceeded the number of allowed
            * concurrent transcriptions for the subscription.
            */
        TooManyRequests = 3,
        /**
            * Indicates a connection error.
            */
        ConnectionFailure = 4,
        /**
            * Indicates a time-out error when waiting for response from service.
            */
        ServiceTimeout = 5,
        /**
            * Indicates that an error is returned by the service.
            */
        ServiceError = 6,
        /**
            * Indicates an unexpected runtime error.
            */
        RuntimeError = 7,
        /**
            * Indicates an quota overrun on existing key.
            */
        Forbidden = 8
}

/**
  * Defines payload for connection events like Connected/Disconnected.
  * Added in version 1.2.0
  */
export class ConnectionEventArgs extends SessionEventArgs {
}

/**
    * Defines payload for any Service message event
    * Added in version 1.9.0
    */
export class ServiceEventArgs extends SessionEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {string} json - json payload of the USP message.
            */
        constructor(json: string, name: string, sessionId?: string);
        get jsonString(): string;
        get eventName(): string;
}

/**
    * Connection is a proxy class for managing connection to the speech service of the specified Recognizer.
    * By default, a Recognizer autonomously manages connection to service when needed.
    * The Connection class provides additional methods for users to explicitly open or close a connection and
    * to subscribe to connection status changes.
    * The use of Connection is optional, and mainly for scenarios where fine tuning of application
    * behavior based on connection status is needed. Users can optionally call Open() to manually set up a connection
    * in advance before starting recognition on the Recognizer associated with this Connection.
    * If the Recognizer needs to connect or disconnect to service, it will
    * setup or shutdown the connection independently. In this case the Connection will be notified by change of connection
    * status via Connected/Disconnected events.
    * Added in version 1.2.1.
    */
export class Connection {
        /**
            * Gets the Connection instance from the specified recognizer.
            * @param recognizer The recognizer associated with the connection.
            * @return The Connection instance of the recognizer.
            */
        static fromRecognizer(recognizer: Recognizer | ConversationTranscriber): Connection;
        /**
            * Gets the Connection instance from the specified synthesizer.
            * @param synthesizer The synthesizer associated with the connection.
            * @return The Connection instance of the synthesizer.
            */
        static fromSynthesizer(synthesizer: SpeechSynthesizer): Connection;
        /**
            * Starts to set up connection to the service.
            * Users can optionally call openConnection() to manually set up a connection in advance before starting recognition on the
            * Recognizer associated with this Connection. After starting recognition, calling Open() will have no effect
            *
            * Note: On return, the connection might not be ready yet. Please subscribe to the Connected event to
            * be notified when the connection is established.
            */
        openConnection(cb?: () => void, err?: (error: string) => void): void;
        /**
            * Closes the connection the service.
            * Users can optionally call closeConnection() to manually shutdown the connection of the associated Recognizer.
            *
            * If closeConnection() is called during recognition, recognition will fail and cancel with an error.
            */
        closeConnection(cb?: () => void, err?: (error: string) => void): void;
        /**
            * Appends a parameter in a message to service.
            * Added in version 1.12.1.
            * @param path The path of the network message.
            * @param propertyName Name of the property
            * @param propertyValue Value of the property. This is a json string.
            */
        setMessageProperty(path: string, propertyName: string, propertyValue: string | object): void;
        /**
            * Sends a message to the speech service.
            * Added in version 1.13.0.
            * @param path The WebSocket path of the message
            * @param payload The payload of the message. This is a json string or a ArrayBuffer.
            * @param success A callback to indicate success.
            * @param error A callback to indicate an error.
            */
        sendMessageAsync(path: string, payload: string | ArrayBuffer, success?: () => void, error?: (error: string) => void): void;
        /**
            * Any message from service that is not being processed by any other top level recognizers.
            *
            * Will be removed in 2.0.
            */
        receivedServiceMessage: (args: ServiceEventArgs) => void;
        /**
            * Any message received from the Speech Service.
            */
        messageReceived: (args: ConnectionMessageEventArgs) => void;
        /**
            * Any message sent to the Speech Service.
            */
        messageSent: (args: ConnectionMessageEventArgs) => void;
        /**
            * The Connected event to indicate that the recognizer is connected to service.
            */
        connected: (args: ConnectionEventArgs) => void;
        /**
            * The Disconnected event to indicate that the recognizer is disconnected from service.
            */
        disconnected: (args: ConnectionEventArgs) => void;
        /**
            * Dispose of associated resources.
            */
        close(): void;
}

/**
    * Allows additions of new phrases to improve speech recognition.
    *
    * Phrases added to the recognizer are effective at the start of the next recognition, or the next time the SpeechSDK must reconnect
    * to the speech service.
    */
export class PhraseListGrammar {
        /**
            * Creates a PhraseListGrammar from a given speech recognizer. Will accept any recognizer that derives from @class Recognizer.
            * @param recognizer The recognizer to add phrase lists to.
            */
        static fromRecognizer(recognizer: Recognizer | ConversationTranscriber): PhraseListGrammar;
        /**
            * Adds a single phrase to the current recognizer.
            * @param phrase Phrase to add.
            */
        addPhrase(phrase: string): void;
        /**
            * Adds multiple phrases to the current recognizer.
            * @param phrases Array of phrases to add.
            */
        addPhrases(phrases: string[]): void;
        /**
            * Clears all phrases added to the current recognizer.
            */
        clear(): void;
}

/**
    * Class that defines base configurations for dialog service connector
    * @class DialogServiceConfig
    */
export abstract class DialogServiceConfig {
        /**
            * Creates an instance of DialogService config.
            * @constructor
            */
        protected constructor();
        /**
            * Sets an arbitrary property.
            * @member DialogServiceConfig.prototype.setProperty
            * @function
            * @public
            * @param {string} name - The name of the property to set.
            * @param {string} value - The new value of the property.
            */
        abstract setProperty(name: string | PropertyId, value: string): void;
        /**
            * Returns the current value of an arbitrary property.
            * @member DialogServiceConfig.prototype.getProperty
            * @function
            * @public
            * @param {string} name - The name of the property to query.
            * @param {string} def - The value to return in case the property is not known.
            * @returns {string} The current value, or provided default, of the given property.
            */
        abstract getProperty(name: string | PropertyId, def?: string): string;
        /**
            * @member DialogServiceConfig.prototype.setServiceProperty
            * @function
            * @public
            * @param {name} The name of the property.
            * @param {value} Value to set.
            * @param {channel} The channel used to pass the specified property to service.
            * @summary Sets a property value that will be passed to service using the specified channel.
            */
        abstract setServiceProperty(name: string, value: string, channel: ServicePropertyChannel): void;
        /**
            * Sets the proxy configuration.
            * Only relevant in Node.js environments.
            * Added in version 1.4.0.
            * @param proxyHostName The host name of the proxy server.
            * @param proxyPort The port number of the proxy server.
            */
        abstract setProxy(proxyHostName: string, proxyPort: number): void;
        /**
            * Sets the proxy configuration.
            * Only relevant in Node.js environments.
            * Added in version 1.4.0.
            * @param proxyHostName The host name of the proxy server, without the protocol scheme (http://)
            * @param porxyPort The port number of the proxy server.
            * @param proxyUserName The user name of the proxy server.
            * @param proxyPassword The password of the proxy server.
            */
        abstract setProxy(proxyHostName: string, proxyPort: number, proxyUserName: string, proxyPassword: string): void;
        /**
            * Returns the configured language.
            * @member DialogServiceConfig.prototype.speechRecognitionLanguage
            * @function
            * @public
            */
        abstract get speechRecognitionLanguage(): string;
        /**
            * Gets/Sets the input language.
            * @member DialogServiceConfig.prototype.speechRecognitionLanguage
            * @function
            * @public
            * @param {string} value - The language to use for recognition.
            */
        abstract set speechRecognitionLanguage(value: string);
        /**
            * Sets the corresponding backend application identifier.
            * @member DialogServiceConfig.prototype.Conversation_ApplicationId
            * @function
            * @public
            * @param {string} value - The application identifier to set.
            */
        set applicationId(value: string);
        static get DialogTypes(): {
                BotFramework: string;
                CustomCommands: string;
        };
}
/**
    * Dialog Service configuration.
    * @class DialogServiceConfigImpl
    */
export class DialogServiceConfigImpl extends DialogServiceConfig {
        /**
            * Creates an instance of dialogService config.
            */
        constructor();
        /**
            * Provides access to custom properties.
            * @member DialogServiceConfigImpl.prototype.properties
            * @function
            * @public
            * @returns {PropertyCollection} The properties.
            */
        get properties(): PropertyCollection;
        /**
            * Gets the speech recognition language.
            * @member DialogServiceConfigImpl.prototype.speechRecognitionLanguage
            * @function
            * @public
            */
        get speechRecognitionLanguage(): string;
        /**
            * Sets the speech recognition language.
            * @member DialogServiceConfigImpl.prototype.speechRecognitionLanguage
            * @function
            * @public
            * @param {string} value - The language to set.
            */
        set speechRecognitionLanguage(value: string);
        get outputFormat(): OutputFormat;
        set outputFormat(value: OutputFormat);
        /**
            * Sets a named property as value
            * @member DialogServiceConfigImpl.prototype.setProperty
            * @function
            * @public
            * @param {PropertyId | string} name - The property to set.
            * @param {string} value - The value.
            */
        setProperty(name: string | PropertyId, value: string): void;
        /**
            * Sets a named property as value
            * @member DialogServiceConfigImpl.prototype.getProperty
            * @function
            * @public
            * @param {PropertyId | string} name - The property to get.
            * @param {string} def - The default value to return in case the property is not known.
            * @returns {string} The current value, or provided default, of the given property.
            */
        getProperty(name: string | PropertyId, def?: string): string;
        /**
            * Sets the proxy configuration.
            * Only relevant in Node.js environments.
            * Added in version 1.4.0.
            * @param proxyHostName The host name of the proxy server, without the protocol scheme (http://)
            * @param proxyPort The port number of the proxy server.
            * @param proxyUserName The user name of the proxy server.
            * @param proxyPassword The password of the proxy server.
            */
        setProxy(proxyHostName: string, proxyPort: number, proxyUserName?: string, proxyPassword?: string): void;
        setServiceProperty(name: string, value: string, channel: ServicePropertyChannel): void;
        /**
            * Dispose of associated resources.
            * @member DialogServiceConfigImpl.prototype.close
            * @function
            * @public
            */
        close(): void;
}

/**
    * Class that defines configurations for the dialog service connector object for using a Bot Framework backend.
    * @class BotFrameworkConfig
    */
export class BotFrameworkConfig extends DialogServiceConfigImpl {
        /**
            * Creates an instance of BotFrameworkConfig.
            */
        constructor();
        /**
            * Creates a bot framework configuration instance with the provided subscription information.
            * @member BotFrameworkConfig.fromSubscription
            * @function
            * @public
            * @param subscription Subscription key associated with the bot
            * @param region The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
            * @param botId Optional. Identifier for using a specific bot within an Azure resource group. Equivalent to the
            * resource name.
            * @returns {BotFrameworkConfig} A new bot framework configuration instance.
            */
        static fromSubscription(subscription: string, region: string, botId?: string): BotFrameworkConfig;
        /**
            * Creates a bot framework configuration instance for the specified authorization token and region.
            * Note: The caller must ensure that an authorization token is valid. Before an authorization token expires, the
            * caller must refresh it by setting the authorizationToken property on the corresponding
            * DialogServiceConnector instance created with this config. The contents of configuration objects are copied
            * when connectors are created, so setting authorizationToken on a DialogServiceConnector will not update the
            * original configuration's authorization token. Create a new configuration instance or set the
            * SpeechServiceAuthorization_Token property to update an existing instance if it will be used to create
            * further DialogServiceConnectors.
            * @member BotFrameworkConfig.fromAuthorizationToken
            * @function
            * @public
            * @param authorizationToken The authorization token associated with the bot
            * @param region The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
            * @param botId Optional. Identifier for using a specific bot within an Azure resource group. Equivalent to the
            * resource name.
            * @returns {BotFrameworkConfig} A new bot framework configuration instance.
            */
        static fromAuthorizationToken(authorizationToken: string, region: string, botId?: string): BotFrameworkConfig;
        /**
            * Creates an instance of a BotFrameworkConfig.
            * This method is intended only for users who use a non-default service host. The standard resource path will be
            * assumed. For services with a non-standard resource path or no path at all, use fromEndpoint instead.
            * Note: Query parameters are not allowed in the host URI and must be set by other APIs.
            * Note: To use an authorization token with fromHost, use fromHost(URL) and then set the AuthorizationToken
            * property on the created BotFrameworkConfig instance.
            * Note: Added in version 1.15.0.
            * @member BotFrameworkConfig.fromHost
            * @function
            * @public
            * @param {URL | string} host - If a URL is provided, the fully-qualified host with protocol (e.g.
            * wss://your.host.com:1234) will be used. If a string is provided, it will be embedded in
            * wss://{host}.convai.speech.azure.us.
            * @param {string} subscriptionKey - The subscription key. If a subscription key is not specified, an authorization
            * token must be set.
            * @param botId Optional. Identifier for using a specific bot within an Azure resource group. Equivalent to the
            * resource name.
            * @returns {BotFrameworkConfig} A new bot framework configuration instance.
            */
        static fromHost(host: URL | string, subscriptionKey?: string, botId?: string): BotFrameworkConfig;
        /**
            * Creates an instance of a BotFrameworkConfig.
            * This method is intended only for users who use a non-standard service endpoint or parameters.
            * Note: The query parameters specified in the endpoint URL are not changed, even if they are set by any other APIs.
            * Note: To use authorization token with fromEndpoint, pass an empty string to the subscriptionKey in the
            * fromEndpoint method, and then set authorizationToken="token" on the created BotFrameworkConfig instance to
            * use the authorization token.
            * Note: Added in version 1.15.0.
            * @member BotFrameworkConfig.fromEndpoint
            * @function
            * @public
            * @param {URL} endpoint - The service endpoint to connect to.
            * @param {string} subscriptionKey - The subscription key. If a subscription key is not specified, an authorization
            * token must be set.
            * @returns {BotFrameworkConfig} - A new bot framework configuration instance using the provided endpoint.
            */
        static fromEndpoint(endpoint: URL, subscriptionKey?: string): BotFrameworkConfig;
}

/**
    * Class that defines configurations for the dialog service connector object for using a CustomCommands backend.
    * @class CustomCommandsConfig
    */
export class CustomCommandsConfig extends DialogServiceConfigImpl {
        /**
            * Creates an instance of CustomCommandsConfig.
            */
        constructor();
        /**
            * Creates an instance of the bot framework config with the specified subscription and region.
            * @member CustomCommandsConfig.fromSubscription
            * @function
            * @public
            * @param applicationId Speech Commands application id.
            * @param subscription Subscription key associated with the bot
            * @param region The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
            * @returns {CustomCommandsConfig} A new bot framework config.
            */
        static fromSubscription(applicationId: string, subscription: string, region: string): CustomCommandsConfig;
        /**
            * Creates an instance of the bot framework config with the specified Speech Commands application id, authorization token and region.
            * Note: The caller needs to ensure that the authorization token is valid. Before the authorization token
            * expires, the caller needs to refresh it by calling this setter with a new valid token.
            * As configuration values are copied when creating a new recognizer, the new token value will not apply to recognizers that have already been created.
            * For recognizers that have been created before, you need to set authorization token of the corresponding recognizer
            * to refresh the token. Otherwise, the recognizers will encounter errors during recognition.
            * @member CustomCommandsConfig.fromAuthorizationToken
            * @function
            * @public
            * @param applicationId Speech Commands application id.
            * @param authorizationToken The authorization token associated with the application.
            * @param region The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
            * @returns {CustomCommandsConfig} A new speech commands config.
            */
        static fromAuthorizationToken(applicationId: string, authorizationToken: string, region: string): CustomCommandsConfig;
        /**
            * Sets the corresponding backend application identifier.
            * @member CustomCommandsConfig.prototype.Conversation_ApplicationId
            * @function
            * @public
            * @param {string} value - The application identifier to set.
            */
        set applicationId(value: string);
        /**
            * Gets the corresponding backend application identifier.
            * @member CustomCommandsConfig.prototype.Conversation_ApplicationId
            * @function
            * @public
            * @param {string} value - The application identifier to get.
            */
        get applicationId(): string;
}

/**
    * Dialog Service Connector
    * @class DialogServiceConnector
    */
export class DialogServiceConnector extends Recognizer {
        /**
            * Initializes an instance of the DialogServiceConnector.
            * @constructor
            * @param {DialogServiceConfig} dialogConfig - Set of properties to configure this recognizer.
            * @param {AudioConfig} audioConfig - An optional audio config associated with the recognizer
            */
        constructor(dialogConfig: DialogServiceConfig, audioConfig?: AudioConfig);
        /**
            * The event recognizing signals that an intermediate recognition result is received.
            * @member DialogServiceConnector.prototype.recognizing
            * @function
            * @public
            */
        recognizing: (sender: DialogServiceConnector, event: SpeechRecognitionEventArgs) => void;
        /**
            * The event recognized signals that a final recognition result is received.
            * @member DialogServiceConfig.prototype.recognized
            * @function
            * @public
            */
        recognized: (sender: DialogServiceConnector, event: SpeechRecognitionEventArgs) => void;
        /**
            * The event canceled signals that an error occurred during recognition.
            * @member DialogServiceConnector.prototype.canceled
            * @function
            * @public
            */
        canceled: (sender: DialogServiceConnector, event: SpeechRecognitionCanceledEventArgs) => void;
        /**
            * The event activityReceived signals that an activity has been received.
            * @member DialogServiceConnector.prototype.activityReceived
            * @function
            * @public
            */
        activityReceived: (sender: DialogServiceConnector, event: ActivityReceivedEventArgs) => void;
        /**
            * The event turnStatusReceived signals that a turn status message has been received. These messages are
            * associated with both an interaction and a conversation. They are used to notify the client in the event
            * of an interaction failure with the dialog backend, e.g. in the event of a network issue, timeout, crash,
            * or other problem.
            * @member DialogServiceConnector.prototype.turnStatusReceived
            * @function
            * @public
            */
        turnStatusReceived: (sender: DialogServiceConnector, event: TurnStatusReceivedEventArgs) => void;
        /**
            * Starts a connection to the service.
            * Users can optionally call connect() to manually set up a connection in advance, before starting interactions.
            *
            * Note: On return, the connection might not be ready yet. Please subscribe to the Connected event to
            * be notified when the connection is established.
            * @member DialogServiceConnector.prototype.connect
            * @function
            * @public
            */
        connect(cb?: () => void, err?: (error: string) => void): void;
        /**
            * Closes the connection the service.
            * Users can optionally call disconnect() to manually shutdown the connection of the associated DialogServiceConnector.
            *
            * If disconnect() is called during a recognition, recognition will fail and cancel with an error.
            */
        disconnect(cb?: () => void, err?: (error: string) => void): void;
        /**
            * Gets the authorization token used to communicate with the service.
            * @member DialogServiceConnector.prototype.authorizationToken
            * @function
            * @public
            * @returns {string} Authorization token.
            */
        get authorizationToken(): string;
        /**
            * Sets the authorization token used to communicate with the service.
            * @member DialogServiceConnector.prototype.authorizationToken
            * @function
            * @public
            * @param {string} token - Authorization token.
            */
        set authorizationToken(token: string);
        /**
            * The collection of properties and their values defined for this DialogServiceConnector.
            * @member DialogServiceConnector.prototype.properties
            * @function
            * @public
            * @returns {PropertyCollection} The collection of properties and their values defined for this DialogServiceConnector.
            */
        get properties(): PropertyCollection;
        /** Gets the template for the activity generated by service from speech.
            * Properties from the template will be stamped on the generated activity.
            * It can be empty
            */
        get speechActivityTemplate(): string;
        /** Sets the template for the activity generated by service from speech.
            * Properties from the template will be stamped on the generated activity.
            * It can be null or empty.
            * Note: it has to be a valid Json object.
            */
        set speechActivityTemplate(speechActivityTemplate: string);
        /**
            * Starts recognition and stops after the first utterance is recognized.
            * @member DialogServiceConnector.prototype.listenOnceAsync
            * @function
            * @public
            * @param cb - Callback that received the result when the reco has completed.
            * @param err - Callback invoked in case of an error.
            */
        listenOnceAsync(cb?: (e: SpeechRecognitionResult) => void, err?: (e: string) => void): void;
        sendActivityAsync(activity: string, cb?: () => void, errCb?: (error: string) => void): void;
        /**
            * closes all external resources held by an instance of this class.
            * @member DialogServiceConnector.prototype.close
            * @function
            * @public
            */
        close(cb?: () => void, err?: (error: string) => void): void;
        protected dispose(disposing: boolean): Promise<void>;
        protected createRecognizerConfig(speechConfig: SpeechServiceConfig): RecognizerConfig;
        protected createServiceRecognizer(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioConfig: AudioConfig, recognizerConfig: RecognizerConfig): ServiceRecognizerBase;
}

/**
    * Defines contents of received message/events.
    * @class ActivityReceivedEventArgs
    */
export class ActivityReceivedEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {any} activity - The activity..
            */
        constructor(activity: any, audioStream?: PullAudioOutputStream);
        /**
            * Gets the received activity
            * @member ActivityReceivedEventArgs.prototype.activity
            * @function
            * @public
            * @returns {any} the received activity.
            */
        get activity(): any;
        get audioStream(): PullAudioOutputStream;
}

/**
    * Defines contents of received message/events.
    * @class TurnStatusReceivedEventArgs
    */
export class TurnStatusReceivedEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {string} turnStatus - The JSON-encoded turn status message.
            */
        constructor(turnStatus: string);
        /**
            * Gets the interaction identifier associated with this turn status event.
            * @member TurnStatusReceivedEventArgs.prototype.interactionId
            * @function
            * @public
            * @returns {any} the received interaction id.
            */
        get interactionId(): any;
        /**
            * Gets the conversation identifier associated with this turn status event.
            * @member TurnStatusReceivedEventArgs.prototype.conversationId
            * @function
            * @public
            * @returns {any} the received conversation id.
            */
        get conversationId(): any;
        /**
            * Gets the received turn status code.
            * @member TurnStatusReceivedEventArgs.prototype.statusCode
            * @function
            * @public
            * @returns {number} the received turn status.
            */
        get statusCode(): number;
}

/**
    * Defines channels used to pass property settings to service.
    * Added in version 1.7.0.
    */
export enum ServicePropertyChannel {
        /**
            * Uses URI query parameter to pass property settings to service.
            */
        UriQueryParameter = 0
}

/**
  * Profanity option.
  * Added in version 1.7.0.
  */
export enum ProfanityOption {
    Masked = 0,
    Removed = 1,
    Raw = 2
}

/**
    * Base audio player class
    * TODO: Plays only PCM for now.
    * @class
    */
export class BaseAudioPlayer {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {AudioStreamFormat} audioFormat audio stream format recognized by the player.
            */
        constructor(audioFormat?: AudioStreamFormat);
        /**
            * play Audio sample
            * @param newAudioData audio data to be played.
            */
        playAudioSample(newAudioData: ArrayBuffer, cb?: () => void, err?: (error: string) => void): void;
        /**
            * stops audio and clears the buffers
            */
        stopAudio(cb?: () => void, err?: (error: string) => void): void;
}

export class ConnectionMessageEventArgs {
        constructor(message: ConnectionMessage);
        /**
            * Gets the <see cref="ConnectionMessage"/> associated with this <see cref="ConnectionMessageEventArgs"/>.
            */
        get message(): ConnectionMessage;
        /**
            * Returns a string that represents the connection message event.
            */
        toString(): string;
}

/**
    * ConnectionMessage represents implementation specific messages sent to and received from
    * the speech service. These messages are provided for debugging purposes and should not
    * be used for production use cases with the Azure Cognitive Services Speech Service.
    * Messages sent to and received from the Speech Service are subject to change without
    * notice. This includes message contents, headers, payloads, ordering, etc.
    * Added in version 1.11.0.
    */
export abstract class ConnectionMessage {
        /**
            * The message path.
            */
        abstract get path(): string;
        /**
            * Checks to see if the ConnectionMessage is a text message.
            * See also IsBinaryMessage().
            */
        abstract get isTextMessage(): boolean;
        /**
            * Checks to see if the ConnectionMessage is a binary message.
            * See also GetBinaryMessage().
            */
        abstract get isBinaryMessage(): boolean;
        /**
            * Gets the text message payload. Typically the text message content-type is
            * application/json. To determine other content-types use
            * Properties.GetProperty("Content-Type").
            */
        abstract get TextMessage(): string;
        /**
            * Gets the binary message payload.
            */
        abstract get binaryMessage(): ArrayBuffer;
        /**
            * A collection of properties and their values defined for this <see cref="ConnectionMessage"/>.
            * Message headers can be accessed via this collection (e.g. "Content-Type").
            */
        abstract get properties(): PropertyCollection;
        /**
            * Returns a string that represents the connection message.
            */
        abstract toString(): string;
}
export class ConnectionMessageImpl {
        constructor(message: IntConnectionMessage);
        /**
            * The message path.
            */
        get path(): string;
        /**
            * Checks to see if the ConnectionMessage is a text message.
            * See also IsBinaryMessage().
            */
        get isTextMessage(): boolean;
        /**
            * Checks to see if the ConnectionMessage is a binary message.
            * See also GetBinaryMessage().
            */
        get isBinaryMessage(): boolean;
        /**
            * Gets the text message payload. Typically the text message content-type is
            * application/json. To determine other content-types use
            * Properties.GetProperty("Content-Type").
            */
        get TextMessage(): string;
        /**
            * Gets the binary message payload.
            */
        get binaryMessage(): ArrayBuffer;
        /**
            * A collection of properties and their values defined for this <see cref="ConnectionMessage"/>.
            * Message headers can be accessed via this collection (e.g. "Content-Type").
            */
        get properties(): PropertyCollection;
        /**
            * Returns a string that represents the connection message.
            */
        toString(): string;
}

/**
    * Defines Voice Profile class for Speaker Recognition
    * @class VoiceProfile
    */
export class VoiceProfile {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {string} profileId - profileId of this Voice Profile.
            * @param {VoiceProfileType} profileType - profileType of this Voice Profile.
            */
        constructor(profileId: string, profileType: VoiceProfileType);
        /**
            * profileId of this Voice Profile instance
            * @member VoiceProfile.prototype.profileId
            * @function
            * @public
            * @returns {string} profileId of this Voice Profile instance.
            */
        get profileId(): string;
        /**
            * profileType of this Voice Profile instance
            * @member VoiceProfile.prototype.profileType
            * @function
            * @public
            * @returns {VoiceProfileType} profile type of this Voice Profile instance.
            */
        get profileType(): VoiceProfileType;
}

export interface EnrollmentResultDetails {
        profileId: string;
        enrollmentsCount: number;
        enrollmentsLengthInSec: number;
        enrollmentsSpeechLengthInSec: number;
        remainingEnrollmentsCount: number;
        remainingEnrollmentsSpeechLengthInSec: number;
        audioLengthInSec: number;
        audioSpeechLengthInSec: number;
        enrollmentStatus: string;
}
export interface EnrollmentResultJSON {
        profileId: string;
        enrollmentsCount: number;
        enrollmentsLengthInSec: string;
        enrollmentsSpeechLengthInSec: string;
        remainingEnrollmentsCount: number;
        remainingEnrollmentsSpeechLengthInSec: string;
        audioLengthInSec: string;
        audioSpeechLengthInSec: string;
        enrollmentStatus: string;
        remainingEnrollments?: number;
        identificationProfileId?: string;
        verificationProfileId?: string;
}
/**
    * Output format
    * @class VoiceProfileEnrollmentResult
    */
export class VoiceProfileEnrollmentResult {
        constructor(reason: ResultReason, json: string, statusText: string);
        get reason(): ResultReason;
        get enrollmentsCount(): number;
        get enrollmentsLengthInSec(): number;
        get properties(): PropertyCollection;
        get enrollmentResultDetails(): EnrollmentResultDetails;
        get errorDetails(): string;
        static FromIdentificationProfileList(json: {
                value: EnrollmentResultJSON[];
        }): VoiceProfileEnrollmentResult[];
        static FromVerificationProfileList(json: {
                value: EnrollmentResultJSON[];
        }): VoiceProfileEnrollmentResult[];
}
/**
    * @class VoiceProfileEnrollmentCancellationDetails
    */
export class VoiceProfileEnrollmentCancellationDetails extends CancellationDetailsBase {
        /**
            * Creates an instance of VoiceProfileEnrollmentCancellationDetails object for the canceled VoiceProfileEnrollmentResult.
            * @member VoiceProfileEnrollmentCancellationDetails.fromResult
            * @function
            * @public
            * @param {VoiceProfileEnrollmentResult} result - The result that was canceled.
            * @returns {VoiceProfileEnrollmentCancellationDetails} The cancellation details object being created.
            */
        static fromResult(result: VoiceProfileEnrollmentResult): VoiceProfileEnrollmentCancellationDetails;
}

/**
    * Output format
    * @class VoiceProfileResult
    */
export class VoiceProfileResult {
        constructor(reason: ResultReason, statusText: string);
        get reason(): ResultReason;
        get properties(): PropertyCollection;
        get errorDetails(): string;
}
/**
    * @class VoiceProfileCancellationDetails
    */
export class VoiceProfileCancellationDetails extends CancellationDetailsBase {
        /**
            * Creates an instance of VoiceProfileCancellationDetails object for the canceled VoiceProfileResult.
            * @member VoiceProfileCancellationDetails.fromResult
            * @function
            * @public
            * @param {VoiceProfileResult} result - The result that was canceled.
            * @returns {VoiceProfileCancellationDetails} The cancellation details object being created.
            */
        static fromResult(result: VoiceProfileResult): VoiceProfileCancellationDetails;
}

/**
  * Output format
  * @class VoiceProfilePhraseResult
  */
export class VoiceProfilePhraseResult extends VoiceProfileResult {
    constructor(reason: ResultReason, statusText: string, json: {
        value: {
            passPhrase?: string;
            activationPhrase?: string;
        }[];
    });
    get phrases(): string[];
}

/**
    * Defines VoiceProfileClient class for Speaker Recognition
    * Handles operations from user for Voice Profile operations (e.g. createProfile, deleteProfile)
    * @class VoiceProfileClient
    */
export class VoiceProfileClient {
        protected privProperties: PropertyCollection;
        /**
            * VoiceProfileClient constructor.
            * @constructor
            * @param {SpeechConfig} speechConfig - An set of initial properties for this synthesizer (authentication key, region, &c)
            */
        constructor(speechConfig: SpeechConfig);
        /**
            * The collection of properties and their values defined for this VoiceProfileClient.
            * @member VoiceProfileClient.prototype.properties
            * @function
            * @public
            * @returns {PropertyCollection} The collection of properties and their values defined for this VoiceProfileClient.
            */
        get properties(): PropertyCollection;
        /**
            * Gets the authorization token used to communicate with the service.
            * @member VoiceProfileClient.prototype.authorizationToken
            * @function
            * @public
            * @returns {string} Authorization token.
            */
        get authorizationToken(): string;
        /**
            * Gets/Sets the authorization token used to communicate with the service.
            * @member VoiceProfileClient.prototype.authorizationToken
            * @function
            * @public
            * @param {string} token - Authorization token.
            */
        set authorizationToken(token: string);
        /**
            * Create a speaker recognition voice profile
            * @member VoiceProfileClient.prototype.createProfileAsync
            * @function
            * @public
            * @async
            * @param {VoiceProfileType} profileType Type of Voice Profile to be created
            * @param {string} lang Language string (locale) for Voice Profile
            * @return {Promise<VoiceProfile>} - Promise of a VoiceProfile.
            */
        createProfileAsync(profileType: VoiceProfileType, lang: string): Promise<VoiceProfile>;
        /**
            * Get current information of a voice profile
            * @member VoiceProfileClient.prototype.retrieveEnrollmentResultAsync
            * @function
            * @public
            * @async
            * @param {VoiceProfile} profile Voice Profile to retrieve info for
            * @return {Promise<VoiceProfileEnrollmentResult>} - Promise of a VoiceProfileEnrollmentResult.
            */
        retrieveEnrollmentResultAsync(profile: VoiceProfile): Promise<VoiceProfileEnrollmentResult>;
        /**
            * Get all voice profiles on account with given voice profile type
            * @member VoiceProfileClient.prototype.getAllProfilesAsync
            * @function
            * @public
            * @async
            * @param {VoiceProfileType} profileType profile type (identification/verification) for which to list profiles
            * @return {Promise<VoiceProfileEnrollmentResult[]>} - Promise of an array of VoiceProfileEnrollmentResults.
            */
        getAllProfilesAsync(profileType: VoiceProfileType): Promise<VoiceProfileEnrollmentResult[]>;
        /**
            * Get valid authorization phrases for voice profile enrollment
            * @member VoiceProfileClient.prototype.getAuthorizationPhrasesAsync
            * @function
            * @public
            * @async
            * @param {VoiceProfileType} profileType Profile Type to get activation phrases for
            * @param {string} lang Language string (locale) for Voice Profile
            */
        getActivationPhrasesAsync(profileType: VoiceProfileType, lang: string): Promise<VoiceProfilePhraseResult>;
        /**
            * Create a speaker recognition voice profile
            * @member VoiceProfileClient.prototype.enrollProfileAsync
            * @function
            * @public
            * @async
            * @param {VoiceProfile} profile Voice Profile to create enrollment for
            * @param {AudioConfig} audioConfig source info from which to create enrollment
            * @return {Promise<VoiceProfileEnrollmentResult>} - Promise of a VoiceProfileEnrollmentResult.
            */
        enrollProfileAsync(profile: VoiceProfile, audioConfig: AudioConfig): Promise<VoiceProfileEnrollmentResult>;
        /**
            * Delete a speaker recognition voice profile
            * @member VoiceProfileClient.prototype.deleteProfileAsync
            * @function
            * @public
            * @async
            * @param {VoiceProfile} profile Voice Profile to be deleted
            * @return {Promise<VoiceProfileResult>} - Promise of a VoiceProfileResult.
            */
        deleteProfileAsync(profile: VoiceProfile): Promise<VoiceProfileResult>;
        /**
            * Remove all enrollments for a speaker recognition voice profile
            * @member VoiceProfileClient.prototype.resetProfileAsync
            * @function
            * @public
            * @async
            * @param {VoiceProfile} profile Voice Profile to be reset
            * @return {Promise<VoiceProfileResult>} - Promise of a VoiceProfileResult.
            */
        resetProfileAsync(profile: VoiceProfile): Promise<VoiceProfileResult>;
        /**
            * Included for compatibility
            * @member VoiceProfileClient.prototype.close
            * @function
            * @public
            */
        close(): void;
        protected implClientSetup(): void;
}

/**
    * Defines SpeakerRecognizer class for Speaker Recognition
    * Handles operations from user for Voice Profile operations (e.g. createProfile, deleteProfile)
    * @class SpeakerRecognizer
    */
export class SpeakerRecognizer {
        protected privProperties: PropertyCollection;
        /**
            * Gets the authorization token used to communicate with the service.
            * @member SpeakerRecognizer.prototype.authorizationToken
            * @function
            * @public
            * @returns {string} Authorization token.
            */
        get authorizationToken(): string;
        /**
            * Gets/Sets the authorization token used to communicate with the service.
            * @member SpeakerRecognizer.prototype.authorizationToken
            * @function
            * @public
            * @param {string} token - Authorization token.
            */
        set authorizationToken(token: string);
        /**
            * The collection of properties and their values defined for this SpeakerRecognizer.
            * @member SpeakerRecognizer.prototype.properties
            * @function
            * @public
            * @returns {PropertyCollection} The collection of properties and their values defined for this SpeakerRecognizer.
            */
        get properties(): PropertyCollection;
        /**
            * SpeakerRecognizer constructor.
            * @constructor
            * @param {SpeechConfig} speechConfig - An set of initial properties for this recognizer (authentication key, region, &c)
            */
        constructor(speechConfig: SpeechConfig, audioConfig: AudioConfig);
        /**
            * Get recognition result for model using given audio
            * @member SpeakerRecognizer.prototype.recognizeOnceAsync
            * @function
            * @public
            * @async
            * @param {SpeakerIdentificationModel} model Model containing Voice Profiles to be identified
            * @param cb - Callback invoked once result is returned.
            * @param err - Callback invoked in case of an error.
            */
        recognizeOnceAsync(model: SpeakerIdentificationModel | SpeakerVerificationModel): Promise<SpeakerRecognitionResult>;
        /**
            * Included for compatibility
            * @member SpeakerRecognizer.prototype.close
            * @function
            * @public
            */
        close(): void;
}

/**
  * Defines SpeakerIdentificationModel class for Speaker Recognition
  * Model contains a set of profiles against which to identify speaker(s)
  * @class SpeakerIdentificationModel
  */
export class SpeakerIdentificationModel {
    static fromProfiles(profiles: VoiceProfile[]): SpeakerIdentificationModel;
    get voiceProfileIds(): string;
}

/**
  * Defines SpeakerVerificationModel class for Speaker Recognition
  * Model contains a profile against which to verify a speaker
  * @class SpeakerVerificationModel
  */
export class SpeakerVerificationModel {
    static fromProfile(profile: VoiceProfile): SpeakerVerificationModel;
    get voiceProfile(): VoiceProfile;
}

/**
    * Language auto detect configuration.
    * @class AutoDetectSourceLanguageConfig
    * Added in version 1.13.0.
    */
export class AutoDetectSourceLanguageConfig {
        /**
            * @member AutoDetectSourceLanguageConfig.fromOpenRange
            * @function
            * @public
            * Only [[SpeechSynthesizer]] supports source language auto detection from open range,
            * for [[Recognizer]], please use AutoDetectSourceLanguageConfig with specific source languages.
            * @return {AutoDetectSourceLanguageConfig} Instance of AutoDetectSourceLanguageConfig
            * @summary Creates an instance of the AutoDetectSourceLanguageConfig with open range.
            */
        static fromOpenRange(): AutoDetectSourceLanguageConfig;
        /**
            * @member AutoDetectSourceLanguageConfig.fromLanguages
            * @function
            * @public
            * @param {string[]} languages Comma-separated string of languages (eg. "en-US,fr-FR") to populate properties of config.
            * @return {AutoDetectSourceLanguageConfig} Instance of AutoDetectSourceLanguageConfig
            * @summary Creates an instance of the AutoDetectSourceLanguageConfig with given languages.
            */
        static fromLanguages(languages: string[]): AutoDetectSourceLanguageConfig;
        /**
            * @member AutoDetectSourceLanguageConfig.fromSourceLanguageConfigs
            * @function
            * @public
            * @param {SourceLanguageConfig[]} configs SourceLanguageConfigs to populate properties of config.
            * @return {AutoDetectSourceLanguageConfig} Instance of AutoDetectSourceLanguageConfig
            * @summary Creates an instance of the AutoDetectSourceLanguageConfig with given SourceLanguageConfigs.
            */
        static fromSourceLanguageConfigs(configs: SourceLanguageConfig[]): AutoDetectSourceLanguageConfig;
        /**
            * @member AutoDetectSourceLanguageConfig.prototype.properties
            * @function
            * @public
            * @return {PropertyCollection} Properties of the config.
            * @summary Gets an auto detected language config properties
            */
        get properties(): PropertyCollection;
        /**
            * @member AutoDetectSourceLanguageConfig.prototype.mode
            * @function
            * @public
            * @param {LanguageIdMode} mode LID mode desired.
            * @summary Sets LID operation to desired mode
            */
        set mode(mode: LanguageIdMode);
}

/**
    * Output format
    * @class AutoDetectSourceLanguageResult
    */
export class AutoDetectSourceLanguageResult {
        /**
            * Creates an instance of AutoDetectSourceLanguageResult object from a SpeechRecognitionResult instance.
            * @member AutoDetectSourceLanguageResult.fromResult
            * @function
            * @public
            * @param {SpeechRecognitionResult} result - The recognition result.
            * @returns {AutoDetectSourceLanguageResult} AutoDetectSourceLanguageResult object being created.
            */
        static fromResult(result: SpeechRecognitionResult): AutoDetectSourceLanguageResult;
        get language(): string;
        get languageDetectionConfidence(): string;
}

/**
    * Source Language configuration.
    * @class SourceLanguageConfig
    */
export class SourceLanguageConfig {
        /**
            * @member SourceLanguageConfig.fromLanguage
            * @function
            * @public
            * @param {string} language language (eg. "en-US") value of config.
            * @param {string?} endpointId endpointId of model bound to given language of config.
            * @return {SourceLanguageConfig} Instance of SourceLanguageConfig
            * @summary Creates an instance of the SourceLanguageConfig with the given language and optional endpointId.
            * Added in version 1.13.0.
            */
        static fromLanguage(language: string, endpointId?: string): SourceLanguageConfig;
        get language(): string;
        get endpointId(): string;
}

export enum SpeakerRecognitionResultType {
        Verify = 0,
        Identify = 1
}
/**
    * Output format
    * @class SpeakerRecognitionResult
    */
export class SpeakerRecognitionResult {
        constructor(resultType: SpeakerRecognitionResultType, data: string, profileId: string, resultReason?: ResultReason);
        get properties(): PropertyCollection;
        get reason(): ResultReason;
        get profileId(): string;
        get errorDetails(): string;
        get score(): number;
}
/**
    * @class SpeakerRecognitionCancellationDetails
    */
export class SpeakerRecognitionCancellationDetails extends CancellationDetailsBase {
        /**
            * Creates an instance of SpeakerRecognitionCancellationDetails object for the canceled SpeakerRecognitionResult
            * @member SpeakerRecognitionCancellationDetails.fromResult
            * @function
            * @public
            * @param {SpeakerRecognitionResult} result - The result that was canceled.
            * @returns {SpeakerRecognitionCancellationDetails} The cancellation details object being created.
            */
        static fromResult(result: SpeakerRecognitionResult): SpeakerRecognitionCancellationDetails;
}

/**
    * Define speech synthesis audio output formats.
    * @enum SpeechSynthesisOutputFormat
    * Updated in version 1.17.0
    */
export enum SpeechSynthesisOutputFormat {
        /**
            * raw-8khz-8bit-mono-mulaw
            * @member SpeechSynthesisOutputFormat.Raw8Khz8BitMonoMULaw,
            */
        Raw8Khz8BitMonoMULaw = 0,
        /**
            * riff-16khz-16kbps-mono-siren
            * @note Unsupported by the service. Do not use this value.
            * @member SpeechSynthesisOutputFormat.Riff16Khz16KbpsMonoSiren
            */
        Riff16Khz16KbpsMonoSiren = 1,
        /**
            * audio-16khz-16kbps-mono-siren
            * @note Unsupported by the service. Do not use this value.
            * @member SpeechSynthesisOutputFormat.Audio16Khz16KbpsMonoSiren
            */
        Audio16Khz16KbpsMonoSiren = 2,
        /**
            * audio-16khz-32kbitrate-mono-mp3
            * @member SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3
            */
        Audio16Khz32KBitRateMonoMp3 = 3,
        /**
            * audio-16khz-128kbitrate-mono-mp3
            * @member SpeechSynthesisOutputFormat.Audio16Khz128KBitRateMonoMp3
            */
        Audio16Khz128KBitRateMonoMp3 = 4,
        /**
            * audio-16khz-64kbitrate-mono-mp3
            * @member SpeechSynthesisOutputFormat.Audio16Khz64KBitRateMonoMp3
            */
        Audio16Khz64KBitRateMonoMp3 = 5,
        /**
            * audio-24khz-48kbitrate-mono-mp3
            * @member SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3
            */
        Audio24Khz48KBitRateMonoMp3 = 6,
        /**
            * audio-24khz-96kbitrate-mono-mp3
            * @member SpeechSynthesisOutputFormat.Audio24Khz96KBitRateMonoMp3
            */
        Audio24Khz96KBitRateMonoMp3 = 7,
        /**
            * audio-24khz-160kbitrate-mono-mp3
            * @member SpeechSynthesisOutputFormat.Audio24Khz160KBitRateMonoMp3
            */
        Audio24Khz160KBitRateMonoMp3 = 8,
        /**
            * raw-16khz-16bit-mono-truesilk
            * @member SpeechSynthesisOutputFormat.Raw16Khz16BitMonoTrueSilk
            */
        Raw16Khz16BitMonoTrueSilk = 9,
        /**
            * riff-16khz-16bit-mono-pcm
            * @member SpeechSynthesisOutputFormat.Riff16Khz16BitMonoPcm
            */
        Riff16Khz16BitMonoPcm = 10,
        /**
            * riff-8khz-16bit-mono-pcm
            * @member SpeechSynthesisOutputFormat.Riff8Khz16BitMonoPcm
            */
        Riff8Khz16BitMonoPcm = 11,
        /**
            * riff-24khz-16bit-mono-pcm
            * @member SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm
            */
        Riff24Khz16BitMonoPcm = 12,
        /**
            * riff-8khz-8bit-mono-mulaw
            * @member SpeechSynthesisOutputFormat.Riff8Khz8BitMonoMULaw
            */
        Riff8Khz8BitMonoMULaw = 13,
        /**
            * raw-16khz-16bit-mono-pcm
            * @member SpeechSynthesisOutputFormat.Raw16Khz16BitMonoPcm
            */
        Raw16Khz16BitMonoPcm = 14,
        /**
            * raw-24khz-16bit-mono-pcm
            * @member SpeechSynthesisOutputFormat.Raw24Khz16BitMonoPcm
            */
        Raw24Khz16BitMonoPcm = 15,
        /**
            * raw-8khz-16bit-mono-pcm
            * @member SpeechSynthesisOutputFormat.Raw8Khz16BitMonoPcm
            */
        Raw8Khz16BitMonoPcm = 16,
        /**
            * ogg-16khz-16bit-mono-opus
            * @member SpeechSynthesisOutputFormat.Ogg16Khz16BitMonoOpus
            */
        Ogg16Khz16BitMonoOpus = 17,
        /**
            * ogg-24khz-16bit-mono-opus
            * @member SpeechSynthesisOutputFormat.Ogg24Khz16BitMonoOpus
            */
        Ogg24Khz16BitMonoOpus = 18,
        /**
            * raw-48khz-16bit-mono-pcm
            * @member SpeechSynthesisOutputFormat.Raw48Khz16BitMonoPcm
            */
        Raw48Khz16BitMonoPcm = 19,
        /**
            * riff-48khz-16bit-mono-pcm
            * @member SpeechSynthesisOutputFormat.Riff48Khz16BitMonoPcm
            */
        Riff48Khz16BitMonoPcm = 20,
        /**
            * audio-48khz-96kbitrate-mono-mp3
            * @member SpeechSynthesisOutputFormat.Audio48Khz96KBitRateMonoMp3
            */
        Audio48Khz96KBitRateMonoMp3 = 21,
        /**
            * audio-48khz-192kbitrate-mono-mp3
            * @member SpeechSynthesisOutputFormat.Audio48Khz192KBitRateMonoMp3
            */
        Audio48Khz192KBitRateMonoMp3 = 22,
        /**
            * ogg-48khz-16bit-mono-opus
            * Added in version 1.16.0
            * @member SpeechSynthesisOutputFormat.Ogg48Khz16BitMonoOpus
            */
        Ogg48Khz16BitMonoOpus = 23,
        /**
            * webm-16khz-16bit-mono-opus
            * Added in version 1.16.0
            * @member SpeechSynthesisOutputFormat.Webm16Khz16BitMonoOpus
            */
        Webm16Khz16BitMonoOpus = 24,
        /**
            * webm-24khz-16bit-mono-opus
            * Added in version 1.16.0
            * @member SpeechSynthesisOutputFormat.Webm24Khz16BitMonoOpus
            */
        Webm24Khz16BitMonoOpus = 25,
        /**
            * raw-24khz-16bit-mono-truesilk
            * Added in version 1.17.0
            * @member SpeechSynthesisOutputFormat.Raw24Khz16BitMonoTrueSilk
            */
        Raw24Khz16BitMonoTrueSilk = 26,
        /**
            * raw-8khz-8bit-mono-alaw
            * Added in version 1.17.0
            * @member SpeechSynthesisOutputFormat.Raw8Khz8BitMonoALaw
            */
        Raw8Khz8BitMonoALaw = 27,
        /**
            * riff-8khz-8bit-mono-alaw
            * Added in version 1.17.0
            * @member SpeechSynthesisOutputFormat.Riff8Khz8BitMonoALaw
            */
        Riff8Khz8BitMonoALaw = 28,
        /**
            * webm-24khz-16bit-24kbps-mono-opus
            * Audio compressed by OPUS codec in a webm container, with bitrate of 24kbps, optimized for IoT scenario.
            * Added in version 1.19.0
            * @member SpeechSynthesisOutputFormat.Webm24Khz16Bit24KbpsMonoOpus
            */
        Webm24Khz16Bit24KbpsMonoOpus = 29,
        /**
            * audio-16khz-16bit-32kbps-mono-opus
            * Audio compressed by OPUS codec without container, with bitrate of 32kbps.
            * Added in version 1.20.0
            * @member SpeechSynthesisOutputFormat.Audio16Khz16Bit32KbpsMonoOpus
            */
        Audio16Khz16Bit32KbpsMonoOpus = 30,
        /**
            * audio-24khz-16bit-48kbps-mono-opus
            * Audio compressed by OPUS codec without container, with bitrate of 48kbps.
            * Added in version 1.20.0
            * @member SpeechSynthesisOutputFormat.Audio24Khz16Bit48KbpsMonoOpus
            */
        Audio24Khz16Bit48KbpsMonoOpus = 31,
        /**
            * audio-24khz-16bit-24kbps-mono-opus
            * Audio compressed by OPUS codec without container, with bitrate of 24kbps.
            * Added in version 1.20.0
            * @member SpeechSynthesisOutputFormat.Audio24Khz16Bit24KbpsMonoOpus
            */
        Audio24Khz16Bit24KbpsMonoOpus = 32,
        /**
            * raw-22050hz-16bit-mono-pcm
            * Raw PCM audio at 22050Hz sampling rate and 16-bit depth.
            * Added in version 1.22.0
            * @member SpeechSynthesisOutputFormat.Raw22050Hz16BitMonoPcm
            */
        Raw22050Hz16BitMonoPcm = 33,
        /**
            * riff-22050hz-16bit-mono-pcm
            * PCM audio at 22050Hz sampling rate and 16-bit depth, with RIFF header.
            * Added in version 1.22.0
            * @member SpeechSynthesisOutputFormat.Riff22050Hz16BitMonoPcm
            */
        Riff22050Hz16BitMonoPcm = 34,
        /**
            * raw-44100hz-16bit-mono-pcm
            * Raw PCM audio at 44100Hz sampling rate and 16-bit depth.
            * Added in version 1.22.0
            * @member SpeechSynthesisOutputFormat.Raw44100Hz16BitMonoPcm
            */
        Raw44100Hz16BitMonoPcm = 35,
        /**
            * riff-44100hz-16bit-mono-pcm
            * PCM audio at 44100Hz sampling rate and 16-bit depth, with RIFF header.
            * Added in version 1.22.0
            * @member SpeechSynthesisOutputFormat.Riff44100Hz16BitMonoPcm
            */
        Riff44100Hz16BitMonoPcm = 36
}

/**
    * Defines the class SpeechSynthesizer for text to speech.
    * Updated in version 1.16.0
    * @class SpeechSynthesizer
    */
export class SpeechSynthesizer {
        protected audioConfig: AudioConfig;
        protected privAdapter: SynthesisAdapterBase;
        protected privRestAdapter: SynthesisRestAdapter;
        protected privProperties: PropertyCollection;
        protected synthesisRequestQueue: Queue<SynthesisRequest>;
        /**
            * Defines event handler for synthesis start events.
            * @member SpeechSynthesizer.prototype.synthesisStarted
            * @function
            * @public
            */
        synthesisStarted: (sender: SpeechSynthesizer, event: SpeechSynthesisEventArgs) => void;
        /**
            * Defines event handler for synthesizing events.
            * @member SpeechSynthesizer.prototype.synthesizing
            * @function
            * @public
            */
        synthesizing: (sender: SpeechSynthesizer, event: SpeechSynthesisEventArgs) => void;
        /**
            * Defines event handler for synthesis completed events.
            * @member SpeechSynthesizer.prototype.synthesisCompleted
            * @function
            * @public
            */
        synthesisCompleted: (sender: SpeechSynthesizer, event: SpeechSynthesisEventArgs) => void;
        /**
            * Defines event handler for synthesis cancelled events.
            * @member SpeechSynthesizer.prototype.SynthesisCanceled
            * @function
            * @public
            */
        SynthesisCanceled: (sender: SpeechSynthesizer, event: SpeechSynthesisEventArgs) => void;
        /**
            * Defines event handler for word boundary events
            * @member SpeechSynthesizer.prototype.wordBoundary
            * @function
            * @public
            */
        wordBoundary: (sender: SpeechSynthesizer, event: SpeechSynthesisWordBoundaryEventArgs) => void;
        /**
            * Defines event handler for bookmark reached events
            * Added in version 1.16.0
            * @member SpeechSynthesizer.prototype.bookmarkReached
            * @function
            * @public
            */
        bookmarkReached: (sender: SpeechSynthesizer, event: SpeechSynthesisBookmarkEventArgs) => void;
        /**
            * Defines event handler for viseme received event
            * Added in version 1.16.0
            * @member SpeechSynthesizer.prototype.visemeReceived
            * @function
            * @public
            */
        visemeReceived: (sender: SpeechSynthesizer, event: SpeechSynthesisVisemeEventArgs) => void;
        /**
            * Gets the authorization token used to communicate with the service.
            * @member SpeechSynthesizer.prototype.authorizationToken
            * @function
            * @public
            * @returns {string} Authorization token.
            */
        get authorizationToken(): string;
        /**
            * Gets/Sets the authorization token used to communicate with the service.
            * @member SpeechSynthesizer.prototype.authorizationToken
            * @function
            * @public
            * @param {string} token - Authorization token.
            */
        set authorizationToken(token: string);
        /**
            * The collection of properties and their values defined for this SpeechSynthesizer.
            * @member SpeechSynthesizer.prototype.properties
            * @function
            * @public
            * @returns {PropertyCollection} The collection of properties and their values defined for this SpeechSynthesizer.
            */
        get properties(): PropertyCollection;
        /**
            * Indicates if auto detect source language is enabled
            * @member SpeechSynthesizer.prototype.properties
            * @function
            * @public
            * @returns {boolean} if auto detect source language is enabled
            */
        get autoDetectSourceLanguage(): boolean;
        /**
            * SpeechSynthesizer constructor.
            * @constructor
            * @param {SpeechConfig} speechConfig - An set of initial properties for this synthesizer.
            * @param {AudioConfig} audioConfig - An optional audio configuration associated with the synthesizer.
            */
        constructor(speechConfig: SpeechConfig, audioConfig?: AudioConfig);
        /**
            * SpeechSynthesizer constructor.
            * @constructor
            * @param {SpeechConfig} speechConfig - an set of initial properties for this synthesizer
            * @param {AutoDetectSourceLanguageConfig} autoDetectSourceLanguageConfig - An source language detection configuration associated with the synthesizer
            * @param {AudioConfig} audioConfig - An optional audio configuration associated with the synthesizer
            */
        static FromConfig(speechConfig: SpeechConfig, autoDetectSourceLanguageConfig: AutoDetectSourceLanguageConfig, audioConfig?: AudioConfig): SpeechSynthesizer;
        buildSsml(text: string): string;
        /**
            * Executes speech synthesis on plain text.
            * The task returns the synthesis result.
            * @member SpeechSynthesizer.prototype.speakTextAsync
            * @function
            * @public
            * @param text - Text to be synthesized.
            * @param cb - Callback that received the SpeechSynthesisResult.
            * @param err - Callback invoked in case of an error.
            * @param stream - AudioOutputStream to receive the synthesized audio.
            */
        speakTextAsync(text: string, cb?: (e: SpeechSynthesisResult) => void, err?: (e: string) => void, stream?: AudioOutputStream | PushAudioOutputStreamCallback | PathLike): void;
        /**
            * Executes speech synthesis on SSML.
            * The task returns the synthesis result.
            * @member SpeechSynthesizer.prototype.speakSsmlAsync
            * @function
            * @public
            * @param ssml - SSML to be synthesized.
            * @param cb - Callback that received the SpeechSynthesisResult.
            * @param err - Callback invoked in case of an error.
            * @param stream - AudioOutputStream to receive the synthesized audio.
            */
        speakSsmlAsync(ssml: string, cb?: (e: SpeechSynthesisResult) => void, err?: (e: string) => void, stream?: AudioOutputStream | PushAudioOutputStreamCallback | PathLike): void;
        /**
            * Get list of synthesis voices available.
            * The task returns the synthesis voice result.
            * @member SpeechSynthesizer.prototype.getVoicesAsync
            * @function
            * @async
            * @public
            * @param locale - Locale of voices in BCP-47 format; if left empty, get all available voices.
            * @return {Promise<SynthesisVoicesResult>} - Promise of a SynthesisVoicesResult.
            */
        getVoicesAsync(locale?: string): Promise<SynthesisVoicesResult>;
        /**
            * Dispose of associated resources.
            * @member SpeechSynthesizer.prototype.close
            * @function
            * @public
            */
        close(cb?: () => void, err?: (error: string) => void): void;
        /**
            * @Internal
            * Do not use externally, object returned will change without warning or notice.
            */
        get internalData(): object;
        /**
            * This method performs cleanup of resources.
            * The Boolean parameter disposing indicates whether the method is called
            * from Dispose (if disposing is true) or from the finalizer (if disposing is false).
            * Derived classes should override this method to dispose resource if needed.
            * @member SpeechSynthesizer.prototype.dispose
            * @function
            * @public
            * @param {boolean} disposing - Flag to request disposal.
            */
        protected dispose(disposing: boolean): Promise<void>;
        protected createSynthesizerConfig(speechConfig: SpeechServiceConfig): SynthesizerConfig;
        protected createSynthesisAdapter(authentication: IAuthentication, connectionFactory: ISynthesisConnectionFactory, audioConfig: AudioConfig, synthesizerConfig: SynthesizerConfig): SynthesisAdapterBase;
        protected implCommonSynthesizeSetup(): void;
        protected speakImpl(text: string, IsSsml: boolean, cb?: (e: SpeechSynthesisResult) => void, err?: (e: string) => void, dataStream?: AudioOutputStream | PushAudioOutputStreamCallback | PathLike): void;
        protected getVoices(locale: string): Promise<SynthesisVoicesResult>;
        protected adapterSpeak(): Promise<void>;
}
export class SynthesisRequest {
        requestId: string;
        text: string;
        isSSML: boolean;
        cb: (e: SpeechSynthesisResult) => void;
        err: (e: string) => void;
        dataStream: IAudioDestination;
        constructor(requestId: string, text: string, isSSML: boolean, cb?: (e: SpeechSynthesisResult) => void, err?: (e: string) => void, dataStream?: IAudioDestination);
}

/**
    * Base class for synthesis results
    * @class SynthesisResult
    * Added in version 1.20.0
    */
export class SynthesisResult {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {string} resultId - The result id.
            * @param {ResultReason} reason - The reason.
            * @param {string} errorDetails - Error details, if provided.
            * @param {PropertyCollection} properties - Additional properties, if provided.
            */
        constructor(resultId?: string, reason?: ResultReason, errorDetails?: string, properties?: PropertyCollection);
        /**
            * Specifies the result identifier.
            * @member SynthesisResult.prototype.resultId
            * @function
            * @public
            * @returns {string} Specifies the result identifier.
            */
        get resultId(): string;
        /**
            * Specifies status of the result.
            * @member SynthesisResult.prototype.reason
            * @function
            * @public
            * @returns {ResultReason} Specifies status of the result.
            */
        get reason(): ResultReason;
        /**
            * In case of an unsuccessful synthesis, provides details of the occurred error.
            * @member SynthesisResult.prototype.errorDetails
            * @function
            * @public
            * @returns {string} a brief description of an error.
            */
        get errorDetails(): string;
        /**
            * The set of properties exposed in the result.
            * @member SynthesisResult.prototype.properties
            * @function
            * @public
            * @returns {PropertyCollection} The set of properties exposed in the result.
            */
        get properties(): PropertyCollection;
}

/**
    * Defines result of speech synthesis.
    * @class SpeechSynthesisResult
    * Added in version 1.11.0
    */
export class SpeechSynthesisResult extends SynthesisResult {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {string} resultId - The result id.
            * @param {ResultReason} reason - The reason.
            * @param {ArrayBuffer} audioData - The synthesized audio binary.
            * @param {string} errorDetails - Error details, if provided.
            * @param {PropertyCollection} properties - Additional properties, if provided.
            * @param {number} audioDuration - The audio duration.
            */
        constructor(resultId?: string, reason?: ResultReason, audioData?: ArrayBuffer, errorDetails?: string, properties?: PropertyCollection, audioDuration?: number);
        /**
            * The synthesized audio data
            * @member SpeechSynthesisResult.prototype.audioData
            * @function
            * @public
            * @returns {ArrayBuffer} The synthesized audio data.
            */
        get audioData(): ArrayBuffer;
        /**
            * The time duration of synthesized audio, in ticks (100 nanoseconds).
            * @member SpeechSynthesisResult.prototype.audioDuration
            * @function
            * @public
            * @returns {number} The time duration of synthesized audio.
            */
        get audioDuration(): number;
}

/**
    * Defines contents of speech synthesis events.
    * @class SpeechSynthesisEventArgs
    * Added in version 1.11.0
    */
export class SpeechSynthesisEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {SpeechSynthesisResult} result - The speech synthesis result.
            */
        constructor(result: SpeechSynthesisResult);
        /**
            * Specifies the synthesis result.
            * @member SpeechSynthesisEventArgs.prototype.result
            * @function
            * @public
            * @returns {SpeechSynthesisResult} the synthesis result.
            */
        get result(): SpeechSynthesisResult;
}

/**
    * Defines contents of speech synthesis word boundary event.
    * @class SpeechSynthesisWordBoundaryEventArgs
    * Added in version 1.11.0
    */
export class SpeechSynthesisWordBoundaryEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {number} audioOffset - The audio offset.
            * @param {number} duration - The audio duration.
            * @param {string} text - The text.
            * @param {number} wordLength - The length of the word.
            * @param {number} textOffset - The text offset.
            * @param {SpeechSynthesisBoundaryType} boundaryType - The boundary type
            */
        constructor(audioOffset: number, duration: number, text: string, wordLength: number, textOffset: number, boundaryType: SpeechSynthesisBoundaryType);
        /**
            * Specifies the audio offset.
            * @member SpeechSynthesisWordBoundaryEventArgs.prototype.audioOffset
            * @function
            * @public
            * @returns {number} the audio offset.
            */
        get audioOffset(): number;
        /**
            * Specifies the duration, in ticks (100 nanoseconds).
            * @member SpeechSynthesisWordBoundaryEventArgs.prototype.duration
            * @function
            * @public
            * @returns {number} Duration in 100 nanosecond increments.
            */
        get duration(): number;
        /**
            * Specifies the text of the word boundary event.
            * @member SpeechSynthesisWordBoundaryEventArgs.prototype.text
            * @function
            * @public
            * @returns {string} the text.
            */
        get text(): string;
        /**
            * Specifies the word length
            * @member SpeechSynthesisWordBoundaryEventArgs.prototype.wordLength
            * @function
            * @public
            * @returns {number} the word length
            */
        get wordLength(): number;
        /**
            * Specifies the text offset.
            * @member SpeechSynthesisWordBoundaryEventArgs.prototype.textOffset
            * @function
            * @public
            * @returns {number} the text offset.
            */
        get textOffset(): number;
        /**
            * Specifies the boundary type.
            * @member SpeechSynthesisWordBoundaryEventArgs.prototype.boundaryType
            * @function
            * @public
            * @returns {SpeechSynthesisBoundaryType} the boundary type.
            */
        get boundaryType(): SpeechSynthesisBoundaryType;
}

/**
    * Defines contents of speech synthesis bookmark event.
    * @class SpeechSynthesisBookmarkEventArgs
    * Added in version 1.16.0
    */
export class SpeechSynthesisBookmarkEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {number} audioOffset - The audio offset.
            * @param {string} text - The bookmark text.
            */
        constructor(audioOffset: number, text: string);
        /**
            * Specifies the audio offset.
            * @member SpeechSynthesisBookmarkEventArgs.prototype.audioOffset
            * @function
            * @public
            * @returns {number} the audio offset.
            */
        get audioOffset(): number;
        /**
            * Specifies the bookmark.
            * @member SpeechSynthesisBookmarkEventArgs.prototype.text
            * @function
            * @public
            * @returns {string} the bookmark text.
            */
        get text(): string;
}

/**
    * Defines contents of speech synthesis viseme event.
    * @class SpeechSynthesisVisemeEventArgs
    * Added in version 1.16.0
    */
export class SpeechSynthesisVisemeEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {number} audioOffset - The audio offset.
            * @param {number} visemeId - The viseme ID.
            * @param {string} animation - The animation, could be in svg or other format.
            */
        constructor(audioOffset: number, visemeId: number, animation: string);
        /**
            * Specifies the audio offset.
            * @member SpeechSynthesisVisemeEventArgs.prototype.audioOffset
            * @function
            * @public
            * @returns {number} the audio offset.
            */
        get audioOffset(): number;
        /**
            * Specifies the viseme ID.
            * @member SpeechSynthesisVisemeEventArgs.prototype.visemeId
            * @function
            * @public
            * @returns {number} the viseme ID.
            */
        get visemeId(): number;
        /**
            * Specifies the animation.
            * @member SpeechSynthesisVisemeEventArgs.prototype.animation
            * @function
            * @public
            * @returns {string} the animation, could be in svg or other format.
            */
        get animation(): string;
}

/**
    * Defines the boundary type of speech synthesis boundary event.
    * @class SpeechSynthesisBoundaryType
    * Added in version 1.21.0
    */
export enum SpeechSynthesisBoundaryType {
        /**
            * Indicates the boundary text is a word.
            * @member SpeechSynthesisBoundaryType.Word
            */
        Word = "WordBoundary",
        /**
            * Indicates the boundary text is a punctuation.
            * @member SpeechSynthesisBoundaryType.Punctuation
            */
        Punctuation = "PunctuationBoundary",
        /**
            * Indicates the boundary text is a sentence.
            * @member SpeechSynthesisBoundaryType.Sentence
            */
        Sentence = "SentenceBoundary"
}

/**
    * Defines result of speech synthesis.
    * @class SynthesisVoicesResult
    * Added in version 1.20.0
    */
export class SynthesisVoicesResult extends SynthesisResult {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param requestId - result id for request.
            * @param json - json payload from endpoint.
            */
        constructor(requestId: string, json: any, errorDetails: string);
        /**
            * The list of voices
            * @member SynthesisVoicesResult.prototype.voices
            * @function
            * @public
            * @returns {VoiceInfo[]} List of synthesized voices.
            */
        get voices(): VoiceInfo[];
}

/**
    * Defines the gender of synthesis voices.
    * Added in version 1.20.0.
    */
export enum SynthesisVoiceGender {
        /** Gender unknown */
        Unknown = 0,
        /** Female voice */
        Female = 1,
        /** Male voice */
        Male = 2
}
export enum SynthesisVoiceType {
        OnlineNeural = 1,
        OnlineStandard = 2,
        OfflineNeural = 3,
        OfflineStandard = 4
}
/**
    * Information about Speech Synthesis voice
    * Added in version 1.20.0.
    * @class VoiceInfo
    */
export class VoiceInfo {
        constructor(json: {
                Name: string;
                LocalName: string;
                ShortName: string;
                Gender: string;
                VoiceType: string;
                Locale: string;
                StyleList: string[];
        });
        get name(): string;
        get locale(): string;
        get shortName(): string;
        get localName(): string;
        get gender(): SynthesisVoiceGender;
        get voiceType(): SynthesisVoiceType;
        get styleList(): string[];
        get voicePath(): string;
}

/**
    * Represents audio player interface to control the audio playback, such as pause, resume, etc.
    * @interface IPlayer
    * Added in version 1.12.0
    */
export interface IPlayer {
        /**
            * Pauses the audio playing
            * @member IPlayer.pause
            * @function
            * @public
            */
        pause(): void;
        /**
            * Resumes the audio playing
            * @member IPlayer.resume
            * @function
            * @public
            */
        resume(cb?: () => void, err?: (error: string) => void): void;
        /**
            * Defines event handler audio playback start event.
            * @member IPlayer.prototype.onAudioStart
            * @function
            * @public
            */
        onAudioStart: (sender: IPlayer) => void;
        /**
            * Defines event handler audio playback end event.
            * @member IPlayer.prototype.onAudioEnd
            * @function
            * @public
            */
        onAudioEnd: (sender: IPlayer) => void;
        /**
            * Gets the current play audio offset.
            * @member IPlayer.prototype.currentTime
            * @function
            * @public
            * @returns {number} The current play audio offset, in second
            */
        currentTime: number;
}

/**
  * Represents the speaker playback audio destination, which only works in browser.
  * Note: the SDK will try to use <a href="https://www.w3.org/TR/media-source/">Media Source Extensions</a> to play audio.
  * Mp3 format has better supports on Microsoft Edge, Chrome and Safari (desktop), so, it's better to specify mp3 format for playback.
  * @class SpeakerAudioDestination
  * Updated in version 1.17.0
  */
export class SpeakerAudioDestination implements IAudioDestination, IPlayer {
    constructor(audioDestinationId?: string);
    id(): string;
    write(buffer: ArrayBuffer, cb?: () => void, err?: (error: string) => void): void;
    close(cb?: () => void, err?: (error: string) => void): void;
    set format(format: AudioStreamFormat);
    get volume(): number;
    set volume(volume: number);
    mute(): void;
    unmute(): void;
    get isClosed(): boolean;
    get currentTime(): number;
    pause(): void;
    resume(cb?: () => void, err?: (error: string) => void): void;
    onAudioStart: (sender: IPlayer) => void;
    onAudioEnd: (sender: IPlayer) => void;
    get internalAudio(): HTMLAudioElement;
}

export interface CancellationEventArgs {
    readonly sessionId: string;
    readonly offset: number;
    readonly reason: CancellationReason;
    readonly errorCode: CancellationErrorCode;
    /**
      * In case of an unsuccessful recognition, provides details of the occurred error.
      * @member CancellationEventArgs.prototype.errorDetails
      * @function
      * @public
      * @returns {string} A String that represents the error details.
      */
    readonly errorDetails: string;
}

/**
  * Defines content of a RecognitionErrorEvent.
  * @class ConversationTranscriptionCanceledEventArgs
  */
export class ConversationTranscriptionCanceledEventArgs extends CancellationEventArgsBase {
}

/**
    * Defines the point system for pronunciation score calibration; default value is FivePoint.
    * Added in version 1.15.0
    * @class PronunciationAssessmentGradingSystem
    */
export enum PronunciationAssessmentGradingSystem {
        /**
            * Five point calibration
            * @member PronunciationAssessmentGradingSystem.FivePoint
            */
        FivePoint = 1,
        /**
            * Hundred mark
            * @member PronunciationAssessmentGradingSystem.HundredMark
            */
        HundredMark = 2
}

/**
    * Defines the pronunciation evaluation granularity; default value is Phoneme.
    * Added in version 1.15.0
    * @class PronunciationAssessmentGranularity
    */
export enum PronunciationAssessmentGranularity {
        /**
            * Shows the score on the full text, word and phoneme level
            * @member PronunciationAssessmentGranularity.Phoneme
            */
        Phoneme = 1,
        /**
            * Shows the score on the full text and word level
            * @member PronunciationAssessmentGranularity.Word
            */
        Word = 2,
        /**
            * Shows the score on the full text level only
            * @member PronunciationAssessmentGranularity.FullText
            */
        FullText = 3
}

/**
    * Pronunciation assessment configuration.
    * @class PronunciationAssessmentConfig
    * Added in version 1.15.0.
    */
export class PronunciationAssessmentConfig {
        /**
            * PronunciationAssessmentConfig constructor.
            * @constructor
            * @param {string} referenceText
            * @param gradingSystem
            * @param granularity
            * @param enableMiscue
            */
        constructor(referenceText: string, gradingSystem?: PronunciationAssessmentGradingSystem, granularity?: PronunciationAssessmentGranularity, enableMiscue?: boolean);
        /**
            * @member PronunciationAssessmentConfig.fromJSON
            * @function
            * @public
            * @param {string} json The json string containing the pronunciation assessment parameters.
            * @return {PronunciationAssessmentConfig} Instance of PronunciationAssessmentConfig
            * @summary Creates an instance of the PronunciationAssessmentConfig from json.
            */
        static fromJSON(json: string): PronunciationAssessmentConfig;
        toJSON(): string;
        applyTo(recognizer: Recognizer): void;
        /**
            * Gets the reference text.
            * @member PronunciationAssessmentConfig.prototype.referenceText
            * @function
            * @public
            * @returns {string} Reference text.
            */
        get referenceText(): string;
        /**
            * Gets/Sets the reference text.
            * @member PronunciationAssessmentConfig.prototype.referenceText
            * @function
            * @public
            * @param {string} referenceText - Reference text.
            */
        set referenceText(referenceText: string);
        /**
            * Sets the phoneme alphabet.
            * The valid values are "SAPI" (default) and "IPA".
            * Added in version 1.20.0
            * @member PronunciationAssessmentConfig.prototype.phonemeAlphabet
            * @function
            * @public
            * @param {string} phonemeAlphabet - Phoneme alphabet.
            */
        set phonemeAlphabet(phonemeAlphabet: string);
        /**
            * Sets the nbest phoneme count
            * Added in version 1.20.0
            * @member PronunciationAssessmentConfig.prototype.nbestPhonemeCount
            * @function
            * @public
            * @param {number} nbestPhonemeCount - NBest phoneme count.
            */
        set nbestPhonemeCount(nbestPhonemeCount: number);
        /**
            * @member PronunciationAssessmentConfig.prototype.properties
            * @function
            * @public
            * @return {PropertyCollection} Properties of the config.
            * @summary Gets a pronunciation assessment config properties
            */
        get properties(): PropertyCollection;
}

interface DetailResult {
        Words: WordResult[];
        PronunciationAssessment: {
                AccuracyScore: number;
                CompletenessScore: number;
                FluencyScore: number;
                PronScore: number;
        };
}
interface WordResult {
        Word: string;
        Phonemes: {
                Phoneme?: string;
                PronunciationAssessment?: {
                        NBestPhonemes: {
                                Phoneme: string;
                        }[];
                };
        }[];
        Syllables: {
                Syllable: string;
        }[];
}
/**
    * Pronunciation assessment results.
    * @class PronunciationAssessmentResult
    * Added in version 1.15.0.
    */
export class PronunciationAssessmentResult {
        /**
            * @member PronunciationAssessmentResult.fromResult
            * @function
            * @public
            * @param {RecognitionResult} result The recognition result.
            * @return {PronunciationAssessmentConfig} Instance of PronunciationAssessmentConfig
            * @summary Creates an instance of the PronunciationAssessmentResult from recognition result.
            */
        static fromResult(result: RecognitionResult): PronunciationAssessmentResult;
        /**
            * Gets the detail result of pronunciation assessment.
            * @member PronunciationAssessmentConfig.prototype.detailResult
            * @function
            * @public
            * @returns {DetailResult} detail result.
            */
        get detailResult(): DetailResult;
        /**
            * The score indicating the pronunciation accuracy of the given speech, which indicates
            * how closely the phonemes match a native speaker's pronunciation.
            * @member PronunciationAssessmentResult.prototype.accuracyScore
            * @function
            * @public
            * @returns {number} Accuracy score.
            */
        get accuracyScore(): number;
        /**
            * The overall score indicating the pronunciation quality of the given speech.
            * This is calculated from AccuracyScore, FluencyScore and CompletenessScore with weight.
            * @member PronunciationAssessmentResult.prototype.pronunciationScore
            * @function
            * @public
            * @returns {number} Pronunciation score.
            */
        get pronunciationScore(): number;
        /**
            * The score indicating the completeness of the given speech by calculating the ratio of pronounced words towards entire input.
            * @member PronunciationAssessmentResult.prototype.completenessScore
            * @function
            * @public
            * @returns {number} Completeness score.
            */
        get completenessScore(): number;
        /**
            * The score indicating the fluency of the given speech.
            * @member PronunciationAssessmentResult.prototype.fluencyScore
            * @function
            * @public
            * @returns {number} Fluency score.
            */
        get fluencyScore(): number;
}
export {};

/**
    * Language Identification mode
    * @class LanguageIdMode
    */
export enum LanguageIdMode {
        /**
            * Detect language at audio start
            * @member LanguageIdMode.AtStart
            */
        AtStart = 0,
        /**
            * Continuously detect language
            * @member LanguageIdMode.Continuous
            */
        Continuous = 1
}

/**
  * Defines diagnostics API for managing console output
  * Added in version 1.21.0
  */
export class Diagnostics {
    static SetLoggingLevel(logLevel: LogLevel): void;
    static SetLogOutputPath(path: string): void;
}

/**
  * Define event severity types for setting logging output.
  * @class LogLevel
  */
export { EventType as LogLevel };

export const OutputFormatPropertyName: string;
export const CancellationErrorCodePropertyName: string;
export const ServicePropertiesPropertyName: string;
export const ForceDictationPropertyName: string;
export const AutoDetectSourceLanguagesOpenRangeOptionName: string;

/**
    * Defines content of a CancellationEvent.
    * @class CancellationEventArgsBase
    */
export class CancellationEventArgsBase extends RecognitionEventArgs implements CancellationEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {CancellationReason} reason - The cancellation reason.
            * @param {string} errorDetails - Error details, if provided.
            * @param {number} offset - The offset.
            * @param {string} sessionId - The session id.
            */
        constructor(reason: CancellationReason, errorDetails: string, errorCode: CancellationErrorCode, offset?: number, sessionId?: string);
        /**
            * The reason the recognition was canceled.
            * @member CancellationEventArgsBase.prototype.reason
            * @function
            * @public
            * @returns {CancellationReason} Specifies the reason canceled.
            */
        get reason(): CancellationReason;
        /**
            * The error code in case of an unsuccessful operation.
            * @return An error code that represents the error reason.
            */
        get errorCode(): CancellationErrorCode;
        /**
            * In case of an unsuccessful operation, provides details of the occurred error.
            * @member CancellationEventArgsBase.prototype.errorDetails
            * @function
            * @public
            * @returns {string} A String that represents the error details.
            */
        get errorDetails(): string;
}

export abstract class Conversation implements IConversation {
        protected constructor();
        abstract get authorizationToken(): string;
        abstract get config(): SpeechTranslationConfig;
        abstract get conversationId(): string;
        abstract get conversationInfo(): ConversationInfo;
        abstract get properties(): PropertyCollection;
        abstract get speechRecognitionLanguage(): string;
        abstract get participants(): Participant[];
        abstract set authorizationToken(value: string);
        abstract get isConnected(): boolean;
        /**
            * Create a conversation
            * @param speechConfig
            * @param cb
            * @param err
            */
        static createConversationAsync(speechConfig: SpeechTranslationConfig, arg2?: string | Callback, arg3?: Callback, arg4?: Callback): Conversation;
        /** Start a conversation. */
        abstract startConversationAsync(cb?: Callback, err?: Callback): void;
        /** Delete a conversation. After this no one will be able to join the conversation. */
        abstract deleteConversationAsync(cb?: Callback, err?: Callback): void;
        /** End a conversation. */
        abstract endConversationAsync(cb?: Callback, err?: Callback): void;
        /** Lock a conversation. This will prevent new participants from joining. */
        abstract lockConversationAsync(cb?: Callback, err?: Callback): void;
        /** Add Participant to Conversation. */
        abstract addParticipantAsync(participant: IParticipant, cb?: Callback, err?: Callback): void;
        /**
            * Mute all other participants in the conversation. After this no other participants will
            * have their speech recognitions broadcast, nor be able to send text messages.
            */
        abstract muteAllParticipantsAsync(cb?: Callback, err?: Callback): void;
        /**
            * Mute a participant.
            * @param userId A user identifier
            */
        abstract muteParticipantAsync(userId: string, cb?: Callback, err?: Callback): void;
        /**
            * Remove a participant from a conversation using the user id, Participant or User object
            * @param userId A user identifier
            */
        abstract removeParticipantAsync(userId: string | IParticipant | IUser, cb?: Callback, err?: Callback): void;
        /** Unlocks a conversation. */
        abstract unlockConversationAsync(cb?: Callback, err?: Callback): void;
        /** Unmute all other participants in the conversation. */
        abstract unmuteAllParticipantsAsync(cb?: Callback, err?: Callback): void;
        /**
            * Unmute a participant.
            * @param userId A user identifier
            */
        abstract unmuteParticipantAsync(userId: string, cb?: Callback, err?: Callback): void;
}
export class ConversationImpl extends Conversation implements IDisposable {
        /**
            * Create a conversation impl
            * @param speechConfig
            * @param {string} id - optional conversationId
            */
        constructor(speechConfig: SpeechTranslationConfig, id?: string);
        get room(): IInternalConversation;
        get connection(): ConversationRecognizer;
        get config(): SpeechTranslationConfig;
        get conversationId(): string;
        get properties(): PropertyCollection;
        get speechRecognitionLanguage(): string;
        get isMutedByHost(): boolean;
        get isConnected(): boolean;
        get participants(): Participant[];
        get me(): Participant;
        get host(): Participant;
        get transcriberRecognizer(): TranscriberRecognizer;
        get conversationInfo(): ConversationInfo;
        get authorizationToken(): string;
        set authorizationToken(value: string);
        set conversationTranslator(conversationTranslator: ConversationTranslator);
        /**
            * Create a new conversation as Host
            * @param cb
            * @param err
            */
        createConversationAsync(cb?: Callback, err?: Callback): void;
        /**
            * Starts a new conversation as host.
            * @param cb
            * @param err
            */
        startConversationAsync(cb?: Callback, err?: Callback): void;
        /**
            * Join a conversation as a participant.
            * @param { IParticipant } participant - participant to add
            * @param cb
            * @param err
            */
        addParticipantAsync(participant: IParticipant, cb?: Callback, err?: Callback): void;
        /**
            * Join a conversation as a participant.
            * @param conversation
            * @param nickname
            * @param lang
            * @param cb
            * @param err
            */
        joinConversationAsync(conversationId: string, nickname: string, lang: string, cb?: Callback, err?: Callback): void;
        /**
            * Deletes a conversation
            * @param cb
            * @param err
            */
        deleteConversationAsync(cb?: Callback, err?: Callback): void;
        deleteConversationImplAsync(): Promise<void>;
        /**
            * Issues a request to close the client websockets
            * @param cb
            * @param err
            */
        endConversationAsync(cb?: Callback, err?: Callback): void;
        endConversationImplAsync(): Promise<void>;
        /**
            * Issues a request to lock the conversation
            * @param cb
            * @param err
            */
        lockConversationAsync(cb?: Callback, err?: Callback): void;
        /**
            * Issues a request to mute the conversation
            * @param cb
            * @param err
            */
        muteAllParticipantsAsync(cb?: Callback, err?: Callback): void;
        /**
            * Issues a request to mute a participant in the conversation
            * @param userId
            * @param cb
            * @param err
            */
        muteParticipantAsync(userId: string, cb?: Callback, err?: Callback): void;
        /**
            * Issues a request to remove a participant from the conversation
            * @param userId
            * @param cb
            * @param err
            */
        removeParticipantAsync(userId: string | IParticipant | IUser, cb?: Callback, err?: Callback): void;
        /**
            * Issues a request to unlock the conversation
            * @param cb
            * @param err
            */
        unlockConversationAsync(cb?: Callback, err?: Callback): void;
        /**
            * Issues a request to unmute all participants in the conversation
            * @param cb
            * @param err
            */
        unmuteAllParticipantsAsync(cb?: Callback, err?: Callback): void;
        /**
            * Issues a request to unmute a participant in the conversation
            * @param userId
            * @param cb
            * @param err
            */
        unmuteParticipantAsync(userId: string, cb?: Callback, err?: Callback): void;
        /**
            * Send a text message
            * @param message
            * @param cb
            * @param err
            */
        sendTextMessageAsync(message: string, cb?: Callback, err?: Callback): void;
        /**
            * Set translated to languages
            * @param {string[]} languages - languages to translate to
            * @param cb
            * @param err
            */
        setTranslatedLanguagesAsync(languages: string[], cb?: Callback, err?: Callback): void;
        /**
            * Change nickname
            * @param {string} nickname - new nickname for the room
            * @param cb
            * @param err
            */
        changeNicknameAsync(nickname: string, cb?: Callback, err?: Callback): void;
        isDisposed(): boolean;
        dispose(): void;
        connectTranscriberRecognizer(recognizer: TranscriberRecognizer): Promise<void>;
        getKeepAlive(): string;
}

export type Callback = (result?: any) => void;
/**
    * Manages conversations.
    * Added in version 1.4.0
    */
export interface IConversation {
        config: SpeechTranslationConfig;
        /**
            * Gets/sets authorization token used to communicate with the service.
            * Note: The caller needs to ensure that the authorization token is valid. Before the authorization token
            * expires, the caller needs to refresh it by calling this setter with a new valid token.
            * Otherwise, the recognizer will encounter errors during recognition.
            */
        authorizationToken: string;
        /** Gets the unique identifier for the current conversation. */
        readonly conversationId: string;
        /** Gets the collection of properties and their values defined for this instance. */
        readonly properties: PropertyCollection;
        /** Gets the language name that is used for recognition. */
        readonly speechRecognitionLanguage: string;
        /** Start a conversation.
            * The host must connect to the websocket within a minute for the conversation to remain open.
            */
        startConversationAsync(cb?: () => void, err?: (e: string) => void): void;
        /** Delete a conversation. After this no one will be able to join the conversation. */
        deleteConversationAsync(cb?: () => void, err?: (e: string) => void): void;
        /** End a conversation. */
        endConversationAsync(cb?: () => void, err?: (e: string) => void): void;
        /** Lock a conversation. This will prevent new participants from joining. */
        lockConversationAsync(cb?: () => void, err?: (e: string) => void): void;
        /**
            * Mute all other participants in the conversation. After this no other participants will
            * have their speech recognitions broadcast, nor be able to send text messages.
            */
        muteAllParticipantsAsync(cb?: () => void, err?: (e: string) => void): void;
        /**
            * Mute a participant.
            * @param userId A user identifier
            */
        muteParticipantAsync(userId: string, cb?: () => void, err?: (e: string) => void): void;
        /**
            * Remove a participant from a conversation using the user id, Participant or User object
            * @param userId A user identifier
            */
        removeParticipantAsync(userId: string | IParticipant | IUser, cb?: () => void, err?: (e: string) => void): void;
        /** Unlocks a conversation. */
        unlockConversationAsync(): void;
        /** Unmute all other participants in the conversation. */
        unmuteAllParticipantsAsync(cb?: () => void, err?: (e: string) => void): void;
        /**
            * Unmute a participant.
            * @param userId A user identifier
            */
        unmuteParticipantAsync(userId: string, cb?: () => void, err?: (e: string) => void): void;
}
export interface ConversationProperties {
        [key: string]: any;
        id?: string;
        attendees?: TranscriptionParticipant[];
        record?: string;
}
export interface ConversationInfo {
        id: string;
        participants: TranscriptionParticipant[];
        conversationProperties: ConversationProperties;
}

export class ConversationCommon {
    protected privAudioConfig: AudioConfig;
    protected privSpeechTranslationConfig: SpeechTranslationConfig;
    constructor(audioConfig?: AudioConfig);
    protected handleCallback(cb: Callback, err: Callback): void;
    protected handleError(error: any, err: Callback): void;
}

export class ConversationExpirationEventArgs extends SessionEventArgs {
    constructor(expirationTime: number, sessionId?: string);
    /** How much longer until the conversation expires (in minutes). */
    get expirationTime(): number;
}

export class ConversationParticipantsChangedEventArgs extends SessionEventArgs {
    constructor(reason: ParticipantChangedReason, participants: IParticipant[], sessionId?: string);
    get reason(): ParticipantChangedReason;
    get participants(): IParticipant[];
}

export class ConversationTranslationCanceledEventArgs extends CancellationEventArgsBase {
}

export class ConversationTranslationEventArgs extends RecognitionEventArgs {
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param {ConversationTranslationResult} result - The translation recognition result.
            * @param {number} offset - The offset.
            * @param {string} sessionId - The session id.
            */
        constructor(result: ConversationTranslationResult, offset?: number, sessionId?: string);
        /**
            * Specifies the recognition result.
            * @returns {ConversationTranslationResult} the recognition result.
            */
        get result(): ConversationTranslationResult;
}

export class ConversationTranslationResult extends TranslationRecognitionResult {
        constructor(participantId: string, translations: Translations, originalLanguage?: string, resultId?: string, reason?: ResultReason, text?: string, duration?: number, offset?: number, errorDetails?: string, json?: string, properties?: PropertyCollection);
        /**
            * The unique identifier for the participant this result is for.
            */
        get participantId(): string;
        /**
            * The original language this result was in.
            */
        get originalLang(): string;
}

export enum SpeechState {
        Inactive = 0,
        Connecting = 1,
        Connected = 2
}
/**
    * Join, leave or connect to a conversation.
    */
export class ConversationTranslator extends ConversationCommon implements IConversationTranslator, IDisposable {
        canceled: (sender: ConversationHandler, event: ConversationTranslationCanceledEventArgs) => void;
        conversationExpiration: (sender: IConversationTranslator, event: ConversationExpirationEventArgs) => void;
        participantsChanged: (sender: IConversationTranslator, event: ConversationParticipantsChangedEventArgs) => void;
        sessionStarted: (sender: ConversationHandler, event: SessionEventArgs) => void;
        sessionStopped: (sender: ConversationHandler, event: SessionEventArgs) => void;
        textMessageReceived: (sender: IConversationTranslator, event: ConversationTranslationEventArgs) => void;
        transcribed: (sender: IConversationTranslator, event: ConversationTranslationEventArgs) => void;
        transcribing: (sender: IConversationTranslator, event: ConversationTranslationEventArgs) => void;
        recognized: (sender: IConversationTranslator, event: TranslationRecognitionEventArgs) => void;
        recognizing: (sender: IConversationTranslator, event: TranslationRecognitionEventArgs) => void;
        constructor(audioConfig?: AudioConfig);
        get properties(): PropertyCollection;
        get speechRecognitionLanguage(): string;
        get participants(): Participant[];
        setServiceProperty(name: string, value: string): void;
        /**
            * Join a conversation. If this is the host, pass in the previously created Conversation object.
            * @param conversation
            * @param nickname
            * @param lang
            * @param cb
            * @param err
            */
        joinConversationAsync(conversation: IConversation, nickname: string, cb?: Callback, err?: Callback): void;
        joinConversationAsync(conversationId: string, nickname: string, lang: string, cb?: Callback, err?: Callback): void;
        /**
            * Leave the conversation
            * @param cb
            * @param err
            */
        leaveConversationAsync(cb?: Callback, err?: Callback): void;
        /**
            * Send a text message
            * @param message
            * @param cb
            * @param err
            */
        sendTextMessageAsync(message: string, cb?: Callback, err?: Callback): void;
        /**
            * Start speaking
            * @param cb
            * @param err
            */
        startTranscribingAsync(cb?: Callback, err?: Callback): void;
        /**
            * Stop speaking
            * @param cb
            * @param err
            */
        stopTranscribingAsync(cb?: Callback, err?: Callback): void;
        isDisposed(): boolean;
        dispose(reason?: string, success?: () => void, err?: (error: string) => void): void;
}

export class ConversationTranscriber implements ConversationTranscriptionHandler {
        /**
            * The event canceled signals that an error occurred during the conversation.
            * @member ConversationTranscriber.prototype.conversationCanceled
            * @function
            * @public
            */
        conversationCanceled: (sender: ConversationHandler, event: CancellationEventArgs) => void;
        /**
            * The event canceled signals that an error occurred during transcription.
            * @member ConversationTranscriber.prototype.canceled
            * @function
            * @public
            */
        canceled: (sender: ConversationHandler, event: CancellationEventArgs) => void;
        /**
            * The event recognized signals that a final conversation transcription result is received.
            * @member ConversationTranscriber.prototype.transcribed
            * @function
            * @public
            */
        transcribed: (sender: ConversationTranscriptionHandler, event: ConversationTranscriptionEventArgs) => void;
        /**
            * The event recognizing signals that an intermediate conversation transcription result is received.
            * @member ConversationTranscriber.prototype.transcribing
            * @function
            * @public
            */
        transcribing: (sender: ConversationTranscriptionHandler, event: ConversationTranscriptionEventArgs) => void;
        /**
            * Defines event handler for session started events.
            * @member ConversationTranscriber.prototype.sessionStarted
            * @function
            * @public
            */
        sessionStarted: (sender: ConversationHandler, event: SessionEventArgs) => void;
        /**
            * Defines event handler for session stopped events.
            * @member ConversationTranscriber.prototype.sessionStopped
            * @function
            * @public
            */
        sessionStopped: (sender: ConversationHandler, event: SessionEventArgs) => void;
        /**
            * Defines event handler for conversation started events.
            * @member ConversationTranscriber.prototype.conversationStarted
            * @function
            * @public
            */
        conversationStarted: (sender: ConversationHandler, event: SessionEventArgs) => void;
        /**
            * Defines event handler for conversation stopped events.
            * @member ConversationTranscriber.prototype.conversationStopped
            * @function
            * @public
            */
        conversationStopped: (sender: ConversationHandler, event: SessionEventArgs) => void;
        protected privAudioConfig: AudioConfig;
        /**
            * ConversationTranscriber constructor.
            * @constructor
            * @param {AudioConfig} audioConfig - An optional audio configuration associated with the recognizer
            */
        constructor(audioConfig?: AudioConfig);
        /**
            * Gets the spoken language of recognition.
            * @member ConversationTranscriber.prototype.speechRecognitionLanguage
            * @function
            * @public
            * @returns {string} The spoken language of recognition.
            */
        get speechRecognitionLanguage(): string;
        /**
            * The collection of properties and their values defined for this ConversationTranscriber.
            * @member ConversationTranscriber.prototype.properties
            * @function
            * @public
            * @returns {PropertyCollection} The collection of properties and their values defined for this ConversationTranscriber.
            */
        get properties(): PropertyCollection;
        /**
            * @Internal
            * Internal data member to support fromRecognizer* pattern methods on other classes.
            * Do not use externally, object returned will change without warning or notice.
            */
        get internalData(): object;
        /**
            * @Deprecated
            * @Obsolete
            * Please use the Connection.fromRecognizer pattern to obtain a connection object
            */
        get connection(): Connection;
        /**
            * Gets the authorization token used to communicate with the service.
            * @member ConversationTranscriber.prototype.authorizationToken
            * @function
            * @public
            * @returns {string} Authorization token.
            */
        get authorizationToken(): string;
        /**
            * Gets/Sets the authorization token used to communicate with the service.
            * @member ConversationTranscriber.prototype.authorizationToken
            * @function
            * @public
            * @param {string} token - Authorization token.
            */
        set authorizationToken(token: string);
        /**
            * @param {Conversation} conversation - conversation to be recognized
            */
        joinConversationAsync(conversation: IConversation, cb?: Callback, err?: Callback): void;
        /**
            * Starts conversation transcription, until stopTranscribingAsync() is called.
            * User must subscribe to events to receive transcription results.
            * @member ConversationTranscriber.prototype.startTranscribingAsync
            * @function
            * @public
            * @param cb - Callback invoked once the transcription has started.
            * @param err - Callback invoked in case of an error.
            */
        startTranscribingAsync(cb?: Callback, err?: Callback): void;
        /**
            * Starts conversation transcription, until stopTranscribingAsync() is called.
            * User must subscribe to events to receive transcription results.
            * @member ConversationTranscriber.prototype.stopTranscribingAsync
            * @function
            * @public
            * @param cb - Callback invoked once the transcription has started.
            * @param err - Callback invoked in case of an error.
            */
        stopTranscribingAsync(cb?: Callback, err?: Callback): void;
        /**
            * Leave the current conversation. After this is called, you will no longer receive any events.
            */
        leaveConversationAsync(cb?: Callback, err?: Callback): void;
        /**
            * closes all external resources held by an instance of this class.
            * @member ConversationTranscriber.prototype.close
            * @function
            * @public
            */
        close(cb?: () => void, errorCb?: (error: string) => void): void;
        /**
            * Disposes any resources held by the object.
            * @member ConversationTranscriber.prototype.dispose
            * @function
            * @public
            * @param {boolean} disposing - true if disposing the object.
            */
        protected dispose(disposing: boolean): Promise<void>;
}

/**
    * Represents a user in a conversation.
    * Added in version 1.4.0
    */
export interface IUser {
        /** Gets the user's ID */
        readonly userId: string;
}
export class User implements IUser {
        constructor(userId: string);
        get userId(): string;
}
export interface VoiceSignature {
        Version: number;
        Tag: string;
        Data: string;
}
export interface TranscriptionParticipant {
        /** The unique identifier for the participant. */
        readonly id: string;
        /** The participant's preferred spoken language. */
        readonly preferredLanguage: string;
        /** The participant's voice signature */
        readonly voice: string;
}
/**
    * Represents a participant in a conversation.
    * Added in version 1.4.0
    */
export interface IParticipant extends TranscriptionParticipant {
        /** Gets the colour of the user's avatar as an HTML hex string (e.g. FF0000 for red). */
        readonly avatar: string;
        /**
            * The participant's display name. Please note that there may be more than one participant
            * with the same name. You can use <see cref="Id"/> property to tell them apart.
            */
        readonly displayName: string;
        /** Gets whether or not this participant is the host. */
        readonly isHost: boolean;
        /** Gets whether or not this participant is muted. */
        readonly isMuted: boolean;
        /** Gets whether or not the participant is using Text To Speech (TTS). */
        readonly isUsingTts: boolean;
        /** Contains properties of the participant. */
        readonly properties: PropertyCollection;
}
export class Participant implements IParticipant {
        constructor(id: string, avatar: string, displayName: string, isHost: boolean, isMuted: boolean, isUsingTts: boolean, preferredLanguage: string, voice?: string);
        get avatar(): string;
        get displayName(): string;
        get id(): string;
        get preferredLanguage(): string;
        get isHost(): boolean;
        get isMuted(): boolean;
        get isUsingTts(): boolean;
        get voice(): string;
        get properties(): PropertyCollection;
        static From(id: string, language: string, voice: string): IParticipant;
}

export enum ParticipantChangedReason {
        /** Participant has joined the conversation. */
        JoinedConversation = 0,
        /** Participant has left the conversation. This could be voluntary, or involuntary
            * (e.g. they are experiencing networking issues).
            */
        LeftConversation = 1,
        /** The participants' state has changed (e.g. they became muted, changed their nickname). */
        Updated = 2
}

export interface ConversationHandler {
        /**
            * Defines event handler for session started events.
            */
        sessionStarted: (sender: ConversationHandler, event: SessionEventArgs) => void;
        /**
            * Defines event handler for session stopped events.
            */
        sessionStopped: (sender: ConversationHandler, event: SessionEventArgs) => void;
        /**
            * Event that signals an error with the conversation transcription, or the end of the audio stream has been reached.
            */
        canceled: (sender: ConversationHandler, event: ConversationTranslationCanceledEventArgs) => void;
        /**
            * Leave the current conversation. After this is called, you will no longer receive any events.
            */
        leaveConversationAsync(cb?: Callback, err?: Callback): void;
        /**
            * Starts sending audio to the conversation service for speech recognition and translation. You
            * should subscribe to the Transcribing, and Transcribed events to receive conversation
            * translation results for yourself, and other participants in the conversation.
            */
        startTranscribingAsync(cb?: Callback, err?: Callback): void;
        /**
            * Stops sending audio to the conversation service. You will still receive Transcribing, and
            * and Transcribed events for other participants in the conversation.
            */
        stopTranscribingAsync(cb?: Callback, err?: Callback): void;
}
/**
    * A conversation translator that enables a connected experience where participants can use their
    * own devices to see everyone else's recognitions and IMs in their own languages. Participants
    * can also speak and send IMs to others.
    */
export interface IConversationTranslator extends ConversationHandler {
        /** Gets the collection of properties and their values defined for this instance. */
        readonly properties: PropertyCollection;
        /** Gets the language name that is used for recognition. */
        readonly speechRecognitionLanguage: string;
        /**
            * Event that signals how many more minutes are left before the conversation expires.
            */
        conversationExpiration: (sender: IConversationTranslator, event: ConversationExpirationEventArgs) => void;
        /**
            * Event that signals participants in the conversation have changed (e.g. a new participant joined).
            */
        participantsChanged: (sender: IConversationTranslator, event: ConversationParticipantsChangedEventArgs) => void;
        /**
            * Event that signals a translated text message from a conversation participant.
            */
        textMessageReceived: (sender: IConversationTranslator, event: ConversationTranslationEventArgs) => void;
        /**
            * The event recognized signals that a final  conversation translation result is received.
            */
        transcribed: (sender: IConversationTranslator, event: ConversationTranslationEventArgs) => void;
        /**
            * The event recognizing signals that an intermediate conversation translation result is received.
            */
        transcribing: (sender: IConversationTranslator, event: ConversationTranslationEventArgs) => void;
        /** Start a conversation. */
        joinConversationAsync(conversation: IConversation, nickname: string, cb?: Callback, err?: Callback): void;
        /**
            * Joins an existing conversation.
            * @param conversationId The unique identifier for the conversation to join.
            * @param nickname The display name to use for the current participant.
            * @param lang The speech language to use for the current participant.
            */
        joinConversationAsync(conversationId: string, nickname: string, lang: string, cb?: Callback, err?: Callback): void;
        /**
            * Sends an instant message to all participants in the conversation. This instant message
            * will be translated into each participant's text language.
            * @param message
            */
        sendTextMessageAsync(message: string, cb?: Callback, err?: Callback): void;
}
/**
    * A conversation transcriber that enables a connected experience where conversations can
    * logged with each participant recognized.
    */
export interface ConversationTranscriptionHandler extends ConversationHandler {
        /**
            * The event recognized signals that a final conversation translation result is received.
            */
        transcribed: (sender: ConversationTranscriptionHandler, event: ConversationTranscriptionEventArgs) => void;
        /**
            * The event recognizing signals that an intermediate conversation translation result is received.
            */
        transcribing: (sender: ConversationTranscriptionHandler, event: ConversationTranscriptionEventArgs) => void;
        /**
            * Joins an existing conversation.
            * @param conversation The conversation to join.
            */
        joinConversationAsync(conversation: IConversation, cb?: Callback, err?: Callback): void;
}

/**
    * @class
    */
export class CognitiveSubscriptionKeyAuthentication implements IAuthentication {
        /**
            * Creates and initializes an instance of the CognitiveSubscriptionKeyAuthentication class.
            * @constructor
            * @param {string} subscriptionKey - The subscription key
            */
        constructor(subscriptionKey: string);
        /**
            * Fetches the subscription key.
            * @member
            * @function
            * @public
            * @param {string} authFetchEventId - The id to fetch.
            */
        fetch(authFetchEventId: string): Promise<AuthInfo>;
        /**
            * Fetches the subscription key.
            * @member
            * @function
            * @public
            * @param {string} authFetchEventId - The id to fetch.
            */
        fetchOnExpiry(authFetchEventId: string): Promise<AuthInfo>;
}

export class CognitiveTokenAuthentication implements IAuthentication {
    constructor(fetchCallback: (authFetchEventId: string) => Promise<string>, fetchOnExpiryCallback: (authFetchEventId: string) => Promise<string>);
    fetch(authFetchEventId: string): Promise<AuthInfo>;
    fetchOnExpiry(authFetchEventId: string): Promise<AuthInfo>;
}

export interface IAuthentication {
    fetch(authFetchEventId: string): Promise<AuthInfo>;
    fetchOnExpiry(authFetchEventId: string): Promise<AuthInfo>;
}
export class AuthInfo {
    constructor(headerName: string, token: string);
    get headerName(): string;
    get token(): string;
}

export interface IConnectionFactory {
    create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
}

export interface ISynthesisConnectionFactory {
    create(config: SynthesizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
}

export class IntentConnectionFactory extends ConnectionFactoryBase {
    create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
}

export class SpeechRecognitionEvent extends PlatformEvent {
    constructor(eventName: string, requestId: string, sessionId: string, eventType?: EventType);
    get requestId(): string;
    get sessionId(): string;
}
export class RecognitionTriggeredEvent extends SpeechRecognitionEvent {
    constructor(requestId: string, sessionId: string, audioSourceId: string, audioNodeId: string);
    get audioSourceId(): string;
    get audioNodeId(): string;
}
export class ListeningStartedEvent extends SpeechRecognitionEvent {
    constructor(requestId: string, sessionId: string, audioSourceId: string, audioNodeId: string);
    get audioSourceId(): string;
    get audioNodeId(): string;
}
export class ConnectingToServiceEvent extends SpeechRecognitionEvent {
    constructor(requestId: string, authFetchEventid: string, sessionId: string);
    get authFetchEventid(): string;
}
export class RecognitionStartedEvent extends SpeechRecognitionEvent {
    constructor(requestId: string, audioSourceId: string, audioNodeId: string, authFetchEventId: string, sessionId: string);
    get audioSourceId(): string;
    get audioNodeId(): string;
    get authFetchEventId(): string;
}
export enum RecognitionCompletionStatus {
    Success = 0,
    AudioSourceError = 1,
    AudioSourceTimeout = 2,
    AuthTokenFetchError = 3,
    AuthTokenFetchTimeout = 4,
    UnAuthorized = 5,
    ConnectTimeout = 6,
    ConnectError = 7,
    ClientRecognitionActivityTimeout = 8,
    UnknownError = 9
}
export class RecognitionEndedEvent extends SpeechRecognitionEvent {
    constructor(requestId: string, audioSourceId: string, audioNodeId: string, authFetchEventId: string, sessionId: string, serviceTag: string, status: RecognitionCompletionStatus, error: string);
    get audioSourceId(): string;
    get audioNodeId(): string;
    get authFetchEventId(): string;
    get serviceTag(): string;
    get status(): RecognitionCompletionStatus;
    get error(): string;
}

export abstract class ServiceRecognizerBase implements IDisposable {
    protected privSpeechContext: SpeechContext;
    protected privRequestSession: RequestSession;
    protected privConnectionId: string;
    protected privRecognizerConfig: RecognizerConfig;
    protected privRecognizer: Recognizer;
    protected privSuccessCallback: (e: SpeechRecognitionResult) => void;
    protected privErrorCallback: (e: string) => void;
    constructor(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioSource: IAudioSource, recognizerConfig: RecognizerConfig, recognizer: Recognizer);
    get audioSource(): IAudioSource;
    get speechContext(): SpeechContext;
    get dynamicGrammar(): DynamicGrammarBuilder;
    get agentConfig(): AgentConfig;
    set conversationTranslatorToken(token: string);
    set authentication(auth: IAuthentication);
    isDisposed(): boolean;
    dispose(reason?: string): Promise<void>;
    get connectionEvents(): EventSource<ConnectionEvent>;
    get serviceEvents(): EventSource<ServiceEvent>;
    get recognitionMode(): RecognitionMode;
    protected recognizeOverride: (recoMode: RecognitionMode, sc: (e: SpeechRecognitionResult) => void, ec: (e: string) => void) => Promise<void>;
    recognize(recoMode: RecognitionMode, successCallback: (e: SpeechRecognitionResult) => void, errorCallBack: (e: string) => void): Promise<void>;
    stopRecognizing(): Promise<void>;
    connect(): Promise<void>;
    connectAsync(cb?: Callback, err?: Callback): void;
    protected disconnectOverride: () => Promise<void>;
    disconnect(): Promise<void>;
    static telemetryData: (json: string) => void;
    static telemetryDataEnabled: boolean;
    sendMessage(message: string): Promise<void>;
    sendNetworkMessage(path: string, payload: string | ArrayBuffer): Promise<void>;
    set activityTemplate(messagePayload: string);
    get activityTemplate(): string;
    protected abstract processTypeSpecificMessages(connectionMessage: SpeechConnectionMessage, successCallback?: (e: SpeechRecognitionResult) => void, errorCallBack?: (e: string) => void): Promise<boolean>;
    protected sendTelemetryData(): Promise<void>;
    protected abstract cancelRecognition(sessionId: string, requestId: string, cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): void;
    protected cancelRecognitionLocal(cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): Promise<void>;
    protected receiveMessageOverride: () => Promise<void>;
    protected receiveMessage(): Promise<void>;
    protected sendSpeechContext(connection: IConnection, generateNewRequestId: boolean): Promise<void>;
    protected sendPrePayloadJSONOverride: (connection: IConnection) => Promise<void>;
    protected sendPrePayloadJSON(connection: IConnection, generateNewRequestId?: boolean): Promise<void>;
    protected sendWaveHeader(connection: IConnection): Promise<void>;
    protected postConnectImplOverride: (connection: Promise<IConnection>) => Promise<IConnection>;
    protected connectImpl(): Promise<IConnection>;
    protected configConnectionOverride: (connection: IConnection) => Promise<IConnection>;
    protected handleSpeechPhraseMessage: (textBody: string) => Promise<void>;
    protected handleSpeechHypothesisMessage: (textBody: string) => void;
    protected sendSpeechServiceConfig(connection: IConnection, requestSession: RequestSession, SpeechServiceConfigJson: string): Promise<void>;
    protected fetchConnection(): Promise<IConnection>;
    protected sendAudio(audioStreamNode: IAudioStreamNode): Promise<void>;
}

export class ConversationServiceRecognizer extends ServiceRecognizerBase {
    constructor(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioSource: IAudioSource, recognizerConfig: RecognizerConfig, recognizer: Recognizer);
    protected processTypeSpecificMessages(connectionMessage: SpeechConnectionMessage): Promise<boolean>;
    protected handleRecognizedCallback(result: SpeechRecognitionResult, offset: number, sessionId: string): void;
    protected handleRecognizingCallback(result: SpeechRecognitionResult, duration: number, sessionId: string): void;
    protected processSpeechMessages(connectionMessage: SpeechConnectionMessage): Promise<boolean>;
    protected cancelRecognition(sessionId: string, requestId: string, cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): void;
    protected handleSpeechPhrase(textBody: string): Promise<void>;
    protected handleSpeechHypothesis(textBody: string): void;
}

export enum RecognitionMode {
    Interactive = 0,
    Conversation = 1,
    Dictation = 2
}
export enum SpeechResultFormat {
    Simple = 0,
    Detailed = 1
}
export class RecognizerConfig {
    constructor(speechServiceConfig: SpeechServiceConfig, parameters: PropertyCollection);
    get parameters(): PropertyCollection;
    get recognitionMode(): RecognitionMode;
    set recognitionMode(value: RecognitionMode);
    get SpeechServiceConfig(): SpeechServiceConfig;
    get recognitionActivityTimeout(): number;
    get isContinuousRecognition(): boolean;
    get languageIdMode(): string;
    get autoDetectSourceLanguages(): string;
    get recognitionEndpointVersion(): string;
    get sourceLanguageModels(): {
        language: string;
        endpoint: string;
    }[];
    get maxRetryCount(): number;
}
export class SpeechServiceConfig {
    constructor(context: Context);
    serialize(): string;
    get Context(): Context;
    get Recognition(): string;
    set Recognition(value: string);
}
export class Context {
    system: System;
    os: OS;
    audio: ISpeechConfigAudio;
    constructor(os: OS);
}
export class System {
    name: string;
    version: string;
    build: string;
    lang: string;
    constructor();
}
export class OS {
    platform: string;
    name: string;
    version: string;
    constructor(platform: string, name: string, version: string);
}
export class Device {
    manufacturer: string;
    model: string;
    version: string;
    constructor(manufacturer: string, model: string, version: string);
}
export interface ISpeechConfigAudio {
    source?: ISpeechConfigAudioDevice;
    playback?: ISpeechConfigAudioDevice;
}
export interface ISpeechConfigAudioDevice {
    manufacturer: string;
    model: string;
    connectivity: connectivity;
    type: type;
    samplerate: number;
    bitspersample: number;
    channelcount: number;
}
export enum connectivity {
    Bluetooth = "Bluetooth",
    Wired = "Wired",
    WiFi = "WiFi",
    Cellular = "Cellular",
    InBuilt = "InBuilt",
    Unknown = "Unknown"
}
export enum type {
    Phone = "Phone",
    Speaker = "Speaker",
    Car = "Car",
    Headset = "Headset",
    Thermostat = "Thermostat",
    Microphones = "Microphones",
    Deskphone = "Deskphone",
    RemoteControl = "RemoteControl",
    Unknown = "Unknown",
    File = "File",
    Stream = "Stream"
}

export interface ITranslations {
    TranslationStatus: TranslationStatus;
    Translations: ITranslation[];
    FailureReason: string;
}
export interface ITranslation {
    Language: string;
    Text?: string;
    DisplayText?: string;
}
export interface ISpeechEndDetectedResult {
    Offset?: number;
}
export interface ITurnStart {
    context: ITurnStartContext;
}
export interface ITurnStartContext {
    serviceTag: string;
}
export interface IResultErrorDetails {
    errorText: string;
    recogSate: RecognitionCompletionStatus;
}

export class WebsocketMessageFormatter implements IWebsocketMessageFormatter {
    toConnectionMessage(message: RawWebsocketMessage): Promise<ConnectionMessage>;
    fromConnectionMessage(message: ConnectionMessage): Promise<RawWebsocketMessage>;
}

export class SpeechConnectionFactory extends ConnectionFactoryBase {
    create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
}

export class TranscriberConnectionFactory extends ConnectionFactoryBase {
    create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
    setQueryParams(queryParams: IStringDictionary<string>, config: RecognizerConfig, endpointUrl: string): void;
}

export class TranslationConnectionFactory extends ConnectionFactoryBase {
    create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
    getEndpointUrl(config: RecognizerConfig, returnRegionPlaceholder?: boolean): string;
    setQueryParams(queryParams: IStringDictionary<string>, config: RecognizerConfig, endpointUrl: string): void;
}

export class SpeechSynthesisConnectionFactory implements ISynthesisConnectionFactory {
    create(config: SynthesizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
}

export class EnumTranslation {
    static implTranslateRecognitionResult(recognitionStatus: RecognitionStatus): ResultReason;
    static implTranslateCancelResult(recognitionStatus: RecognitionStatus): CancellationReason;
    static implTranslateCancelErrorCode(recognitionStatus: RecognitionStatus): CancellationErrorCode;
    static implTranslateErrorDetails(cancellationErrorCode: CancellationErrorCode): string;
}

/**
    * @class SynthesisStatus
    * @private
    */
export enum SynthesisStatus {
        /**
            * The response contains valid audio data.
            * @member SynthesisStatus.Success
            */
        Success = 0,
        /**
            * Indicates the end of audio data. No valid audio data is included in the message.
            * @member SynthesisStatus.SynthesisEnd
            */
        SynthesisEnd = 1,
        /**
            * Indicates an error occurred during synthesis data processing.
            * @member SynthesisStatus.Error
            */
        Error = 2
}
export enum RecognitionStatus {
        Success = 0,
        NoMatch = 1,
        InitialSilenceTimeout = 2,
        BabbleTimeout = 3,
        Error = 4,
        EndOfDictation = 5,
        TooManyRequests = 6,
        BadRequest = 7,
        Forbidden = 8
}

export interface ITranslationSynthesisEnd {
    SynthesisStatus: SynthesisStatus;
    FailureReason: string;
}
export class TranslationSynthesisEnd implements ITranslationSynthesisEnd {
    static fromJSON(json: string): TranslationSynthesisEnd;
    get SynthesisStatus(): SynthesisStatus;
    get FailureReason(): string;
}

export interface ITranslationHypothesis {
    Duration: number;
    Offset: number;
    Text: string;
    Translation: ITranslations;
}
export class TranslationHypothesis implements ITranslationHypothesis {
    static fromJSON(json: string): TranslationHypothesis;
    get Duration(): number;
    get Offset(): number;
    get Text(): string;
    get Translation(): ITranslations;
}

export interface ITranslationPhrase {
    RecognitionStatus: RecognitionStatus;
    Offset: number;
    Duration: number;
    Translation?: ITranslations;
    Text: string;
    DisplayText?: string;
}
export class TranslationPhrase implements ITranslationPhrase {
    static fromJSON(json: string): TranslationPhrase;
    static fromTranslationResponse(translationResponse: {
        SpeechPhrase: ITranslationPhrase;
    }): TranslationPhrase;
    get RecognitionStatus(): RecognitionStatus;
    get Offset(): number;
    get Duration(): number;
    get Text(): string;
    get Translation(): ITranslations;
}

export class TranslationServiceRecognizer extends ConversationServiceRecognizer {
    constructor(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioSource: IAudioSource, recognizerConfig: RecognizerConfig, translationRecognizer: TranslationRecognizer);
    protected processTypeSpecificMessages(connectionMessage: SpeechConnectionMessage): Promise<boolean>;
    protected cancelRecognition(sessionId: string, requestId: string, cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): void;
    protected handleRecognizingCallback(result: SpeechRecognitionResult, duration: number, sessionId: string): void;
    protected handleRecognizedCallback(result: SpeechRecognitionResult, offset: number, sessionId: string): void;
}

export interface ISpeechDetected {
    Offset: number;
}
export class SpeechDetected implements ISpeechDetected {
    static fromJSON(json: string): SpeechDetected;
    get Offset(): number;
}

export interface ISpeechHypothesis {
    Text: string;
    Offset: number;
    Duration: number;
    PrimaryLanguage?: IPrimaryLanguage;
    SpeakerId?: string;
}
export class SpeechHypothesis implements ISpeechHypothesis {
    static fromJSON(json: string): SpeechHypothesis;
    get Text(): string;
    get Offset(): number;
    get Duration(): number;
    get Language(): string;
    get LanguageDetectionConfidence(): string;
    get SpeakerId(): string;
}

export interface ISpeechKeyword {
    Status: string;
    Text: string;
    Offset: number;
    Duration: number;
}
export class SpeechKeyword implements ISpeechKeyword {
    static fromJSON(json: string): SpeechKeyword;
    get Status(): string;
    get Text(): string;
    get Offset(): number;
    get Duration(): number;
}

export class SpeechServiceRecognizer extends ServiceRecognizerBase {
    constructor(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioSource: IAudioSource, recognizerConfig: RecognizerConfig, speechRecognizer: SpeechRecognizer);
    protected processTypeSpecificMessages(connectionMessage: SpeechConnectionMessage): Promise<boolean>;
    protected cancelRecognition(sessionId: string, requestId: string, cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): void;
}

export class TranscriptionServiceRecognizer extends ConversationServiceRecognizer {
    constructor(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioSource: IAudioSource, recognizerConfig: RecognizerConfig, transcriber: TranscriberRecognizer);
    sendSpeechEventAsync(info: ConversationInfo, command: string): Promise<void>;
    protected processTypeSpecificMessages(connectionMessage: SpeechConnectionMessage): Promise<boolean>;
    protected handleRecognizedCallback(result: SpeechRecognitionResult, offset: number, sessionId: string): void;
    protected handleRecognizingCallback(result: SpeechRecognitionResult, duration: number, sessionId: string): void;
    protected cancelRecognition(sessionId: string, requestId: string, cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): void;
    protected sendTranscriptionStartJSON(connection: IConnection): Promise<void>;
    protected sendSpeechEvent(connection: IConnection, payload: {
        [id: string]: any;
    }): Promise<void>;
}

export interface IDetailedSpeechPhrase {
    RecognitionStatus: RecognitionStatus;
    NBest: IPhrase[];
    Duration?: number;
    Offset?: number;
    PrimaryLanguage?: IPrimaryLanguage;
    DisplayText?: string;
    SpeakerId?: string;
}
export interface IPhrase {
    Confidence?: number;
    Lexical: string;
    ITN: string;
    MaskedITN: string;
    Display?: string;
    DisplayText?: string;
    Words?: IWord[];
}
export interface IWord {
    Word: string;
    Offset: number;
    Duration: number;
}
export class DetailedSpeechPhrase implements IDetailedSpeechPhrase {
    static fromJSON(json: string): DetailedSpeechPhrase;
    getJsonWithCorrectedOffsets(baseOffset: number): string;
    get RecognitionStatus(): RecognitionStatus;
    get NBest(): IPhrase[];
    get Duration(): number;
    get Offset(): number;
    get Language(): string;
    get LanguageDetectionConfidence(): string;
    get Text(): string;
    get SpeakerId(): string;
}

export interface ISimpleSpeechPhrase {
    RecognitionStatus: RecognitionStatus;
    DisplayText: string;
    Offset?: number;
    Duration?: number;
    PrimaryLanguage?: IPrimaryLanguage;
    SpeakerId?: string;
}
export interface IPrimaryLanguage {
    Language: string;
    Confidence: string;
}
export class SimpleSpeechPhrase implements ISimpleSpeechPhrase {
    static fromJSON(json: string): SimpleSpeechPhrase;
    get RecognitionStatus(): RecognitionStatus;
    get DisplayText(): string;
    get Offset(): number;
    get Duration(): number;
    get Language(): string;
    get LanguageDetectionConfidence(): string;
    get SpeakerId(): string;
}

/**
    * @class AddedLmIntent
    */
export class AddedLmIntent {
        modelImpl: LanguageUnderstandingModelImpl;
        intentName: string;
        /**
            * Creates and initializes an instance of this class.
            * @constructor
            * @param modelImpl - The model.
            * @param intentName - The intent name.
            */
        constructor(modelImpl: LanguageUnderstandingModelImpl, intentName: string);
}

export class IntentServiceRecognizer extends ServiceRecognizerBase {
    constructor(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioSource: IAudioSource, recognizerConfig: RecognizerConfig, recognizer: IntentRecognizer);
    setIntents(addedIntents: {
        [id: string]: AddedLmIntent;
    }, umbrellaIntent: AddedLmIntent): void;
    protected processTypeSpecificMessages(connectionMessage: SpeechConnectionMessage): Promise<boolean>;
    protected cancelRecognition(sessionId: string, requestId: string, cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): void;
}

export interface IIntentResponse {
    query?: string;
    topScoringIntent?: ISingleIntent;
    entities?: IIntentEntity[];
}
export interface IIntentEntity {
    entity: string;
    type: string;
    startIndex: number;
    endIndex: number;
    score: number;
}
export interface ISingleIntent {
    intent: string;
    score: number;
}
export class IntentResponse implements IIntentResponse {
    static fromJSON(json: string): IntentResponse;
    get query(): string;
    get topScoringIntent(): ISingleIntent;
    get entities(): IIntentEntity[];
}

export class RequestSession {
    constructor(audioSourceId: string);
    get sessionId(): string;
    get requestId(): string;
    get audioNodeId(): string;
    get turnCompletionPromise(): Promise<void>;
    get isSpeechEnded(): boolean;
    get isRecognizing(): boolean;
    get currentTurnAudioOffset(): number;
    get recogNumber(): number;
    get numConnectionAttempts(): number;
    get bytesSent(): number;
    listenForServiceTelemetry(eventSource: IEventSource<PlatformEvent>): void;
    startNewRecognition(): void;
    onAudioSourceAttachCompleted(audioNode: ReplayableAudioNode, isError: boolean): Promise<void>;
    onPreConnectionStart(authFetchEventId: string, connectionId: string): void;
    onAuthCompleted(isError: boolean): Promise<void>;
    onConnectionEstablishCompleted(statusCode: number, reason?: string): Promise<void>;
    onServiceTurnEndResponse(continuousRecognition: boolean): Promise<void>;
    onSpeechContext(): void;
    onServiceTurnStartResponse(): void;
    onHypothesis(offset: number): void;
    onPhraseRecognized(offset: number): void;
    onServiceRecognized(offset: number): void;
    onAudioSent(bytesSent: number): void;
    onRetryConnection(): void;
    dispose(): Promise<void>;
    getTelemetry(): string;
    onStopRecognizing(): Promise<void>;
    onSpeechEnded(): void;
    protected onEvent(event: SpeechRecognitionEvent): void;
}

interface Context {
        [section: string]: any;
}
/**
    * Represents the JSON used in the speech.context message sent to the speech service.
    * The dynamic grammar is always refreshed from the encapsulated dynamic grammar object.
    */
export class SpeechContext {
        constructor(dynamicGrammar: DynamicGrammarBuilder);
        /**
            * Adds a section to the speech.context object.
            * @param sectionName Name of the section to add.
            * @param value JSON serializable object that represents the value.
            */
        setSection(sectionName: string, value: string | Context): void;
        /**
            * @Internal
            * This is only used by pronunciation assessment config.
            * Do not use externally, object returned will change without warning or notice.
            */
        setPronunciationAssessmentParams(params: string): void;
        setWordLevelTimings(): void;
        toJSON(): string;
}
export {};

/**
  * Responsible for building the object to be sent to the speech service to support dynamic grammars.
  * @class DynamicGrammarBuilder
  */
export class DynamicGrammarBuilder {
    addPhrase(phrase: string | string[]): void;
    clearPhrases(): void;
    addReferenceGrammar(grammar: string | string[]): void;
    clearGrammars(): void;
    generateGrammarObject(): IDynamicGrammar;
}

/**
    * Top level grammar node
    */
export interface IDynamicGrammar {
        ReferenceGrammars?: string[];
        Groups?: IDynamicGrammarGroup[];
}
/**
    * Group of Dynamic Grammar items of a common type.
    */
export interface IDynamicGrammarGroup {
        Type: string;
        Name?: string;
        SubstringMatch?: string;
        Items: IDynamicGrammarPeople[] | IDynamicGrammarGeneric[];
}
export interface IDynamicGrammarPeople {
        Name: string;
        First?: string;
        Middle?: string;
        Last?: string;
        Synonyms?: string[];
        Weight?: number;
}
/**
    * Generic phrase based dynamic grammars
    */
export interface IDynamicGrammarGeneric {
        Text: string;
        Synonyms?: string[];
        Weight?: number;
}

export class DialogServiceAdapter extends ServiceRecognizerBase {
    constructor(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioSource: IAudioSource, recognizerConfig: RecognizerConfig, dialogServiceConnector: DialogServiceConnector);
    sendMessage(message: string): Promise<void>;
    protected privDisconnect(): Promise<void>;
    protected processTypeSpecificMessages(connectionMessage: SpeechConnectionMessage): Promise<boolean>;
    protected cancelRecognition(sessionId: string, requestId: string, cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): Promise<void>;
    protected listenOnce(recoMode: RecognitionMode, successCallback: (e: SpeechRecognitionResult) => void, errorCallback: (e: string) => void): Promise<void>;
}

/**
    * Represents the JSON used in the agent.config message sent to the speech service.
    */
export class AgentConfig {
        toJsonString(): string;
        get(): IAgentConfig;
        /**
            * Setter for the agent.config object.
            * @param value a JSON serializable object.
            */
        set(value: IAgentConfig): void;
}
export interface IAgentConfig {
        botInfo: {
                commType: string;
                connectionId: string;
                conversationId: string;
                fromId: string;
                commandsCulture: string;
                ttsAudioFormat: string;
        };
        version: number;
}

export enum MetadataType {
    WordBoundary = "WordBoundary",
    Bookmark = "Bookmark",
    Viseme = "Viseme",
    SentenceBoundary = "SentenceBoundary",
    SessionEnd = "SessionEnd"
}
export interface ISynthesisMetadata {
    Type: MetadataType;
    Data: {
        Offset: number;
        Duration: number;
        text: {
            Text: string;
            Length: number;
            BoundaryType: SpeechSynthesisBoundaryType;
        };
        Bookmark: string;
        VisemeId: number;
        AnimationChunk: string;
        IsLastAnimation: boolean;
    };
}
export interface ISynthesisAudioMetadata {
    Metadata: ISynthesisMetadata[];
}
export class SynthesisAudioMetadata implements ISynthesisAudioMetadata {
    static fromJSON(json: string): SynthesisAudioMetadata;
    get Metadata(): ISynthesisMetadata[];
}

export interface ISynthesisResponseContext {
        serviceTag: string;
}
export interface ISynthesisResponseAudio {
        type: string;
        streamId: string;
}
export interface ISynthesisResponse {
        context: ISynthesisResponseContext;
        audio: ISynthesisResponseAudio;
}
export class SynthesisTurn {
        get requestId(): string;
        get streamId(): string;
        set streamId(value: string);
        get audioOutputFormat(): AudioOutputFormatImpl;
        set audioOutputFormat(format: AudioOutputFormatImpl);
        get turnCompletionPromise(): Promise<void>;
        get isSynthesisEnded(): boolean;
        get isSynthesizing(): boolean;
        get currentTextOffset(): number;
        get currentSentenceOffset(): number;
        get bytesReceived(): number;
        get audioDuration(): number;
        constructor();
        getAllReceivedAudio(): Promise<ArrayBuffer>;
        getAllReceivedAudioWithHeader(): Promise<ArrayBuffer>;
        startNewSynthesis(requestId: string, rawText: string, isSSML: boolean, audioDestination?: IAudioDestination): void;
        onPreConnectionStart(authFetchEventId: string): void;
        onAuthCompleted(isError: boolean): void;
        onConnectionEstablishCompleted(statusCode: number): void;
        onServiceResponseMessage(responseJson: string): void;
        onServiceTurnEndResponse(): void;
        onServiceTurnStartResponse(): void;
        onAudioChunkReceived(data: ArrayBuffer): void;
        onTextBoundaryEvent(metadata: ISynthesisMetadata): void;
        onVisemeMetadataReceived(metadata: ISynthesisMetadata): void;
        onSessionEnd(metadata: ISynthesisMetadata): void;
        dispose(): void;
        onStopSynthesizing(): void;
        /**
            * Gets the viseme animation string (merged from animation chunk), and clears the internal
            * partial animation.
            */
        getAndClearVisemeAnimation(): string;
        protected onEvent(event: SpeechSynthesisEvent): void;
}

export class SynthesisAdapterBase implements IDisposable {
    protected privSynthesisTurn: SynthesisTurn;
    protected privConnectionId: string;
    protected privSynthesizerConfig: SynthesizerConfig;
    protected privSpeechSynthesizer: SpeechSynthesizer;
    protected privSuccessCallback: (e: SpeechSynthesisResult) => void;
    protected privErrorCallback: (e: string) => void;
    get synthesisContext(): SynthesisContext;
    get agentConfig(): AgentConfig;
    get connectionEvents(): EventSource<ConnectionEvent>;
    get serviceEvents(): EventSource<ServiceEvent>;
    protected speakOverride: (ssml: string, requestId: string, sc: (e: SpeechSynthesisResult) => void, ec: (e: string) => void) => void;
    static telemetryData: (json: string) => void;
    static telemetryDataEnabled: boolean;
    set activityTemplate(messagePayload: string);
    get activityTemplate(): string;
    protected receiveMessageOverride: () => void;
    protected connectImplOverride: (isUnAuthorized: boolean) => void;
    protected configConnectionOverride: (connection: IConnection) => Promise<IConnection>;
    set audioOutputFormat(format: AudioOutputFormatImpl);
    constructor(authentication: IAuthentication, connectionFactory: ISynthesisConnectionFactory, synthesizerConfig: SynthesizerConfig, speechSynthesizer: SpeechSynthesizer, audioDestination: IAudioDestination);
    static addHeader(audio: ArrayBuffer, format: AudioOutputFormatImpl): ArrayBuffer;
    isDisposed(): boolean;
    dispose(reason?: string): Promise<void>;
    connect(): Promise<void>;
    sendNetworkMessage(path: string, payload: string | ArrayBuffer): Promise<void>;
    Speak(text: string, isSSML: boolean, requestId: string, successCallback: (e: SpeechSynthesisResult) => void, errorCallBack: (e: string) => void, audioDestination: IAudioDestination): Promise<void>;
    protected cancelSynthesis(requestId: string, cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): void;
    protected cancelSynthesisLocal(cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): void;
    protected processTypeSpecificMessages(connectionMessage: SpeechConnectionMessage): boolean;
    protected receiveMessage(): Promise<void>;
    protected sendSynthesisContext(connection: IConnection): Promise<void>;
    protected connectImpl(isUnAuthorized?: boolean): Promise<IConnection>;
    protected sendSpeechServiceConfig(connection: IConnection, SpeechServiceConfigJson: string): Promise<void>;
    protected sendSsmlMessage(connection: IConnection, ssml: string, requestId: string): Promise<void>;
}

/**
    * Implements methods for speaker recognition classes, sending requests to endpoint
    * and parsing response into expected format
    * @class SynthesisRestAdapter
    */
export class SynthesisRestAdapter {
        constructor(config: SynthesizerConfig, authentication: IAuthentication);
        /**
            * Sends list voices request to endpoint.
            * @function
            * @public
            * @param connectionId - guid for connectionId
            * @returns {Promise<IRestResponse>} rest response to status request
            */
        getVoicesList(connectionId: string): Promise<IRestResponse>;
}

export enum SynthesisServiceType {
    Standard = 0,
    Custom = 1
}
export class SynthesizerConfig {
    constructor(speechServiceConfig: SpeechServiceConfig, parameters: PropertyCollection);
    get parameters(): PropertyCollection;
    get synthesisServiceType(): SynthesisServiceType;
    set synthesisServiceType(value: SynthesisServiceType);
    get SpeechServiceConfig(): SpeechServiceConfig;
}

/**
    * Represents the JSON used in the synthesis.context message sent to the speech service.
    * The dynamic grammar is always refreshed from the encapsulated dynamic grammar object.
    */
export class SynthesisContext {
        constructor(speechSynthesizer: SpeechSynthesizer);
        /**
            * Adds a section to the synthesis.context object.
            * @param sectionName Name of the section to add.
            * @param value JSON serializable object that represents the value.
            */
        setSection(sectionName: string, value: string | object): void;
        /**
            * Sets the audio output format for synthesis context generation.
            * @param format {AudioOutputFormatImpl} the output format
            */
        set audioOutputFormat(format: AudioOutputFormatImpl);
        toJSON(): string;
}

export class SpeakerRecognitionConfig {
    constructor(context: Context, parameters: PropertyCollection);
    get parameters(): PropertyCollection;
    get Context(): Context;
}

/**
    * Implements methods for speaker recognition classes, sending requests to endpoint
    * and parsing response into expected format
    * @class SpeakerIdMessageAdapter
    */
export class SpeakerIdMessageAdapter {
        constructor(config: SpeakerRecognitionConfig);
        /**
            * Sends create profile request to endpoint.
            * @function
            * @param {VoiceProfileType} profileType - type of voice profile to create.
            * @param {string} lang - language/locale of voice profile
            * @public
            * @returns {Promise<IRestResponse>} promised rest response containing id of created profile.
            */
        createProfile(profileType: VoiceProfileType, lang: string): Promise<IRestResponse>;
        /**
            * Sends create enrollment request to endpoint.
            * @function
            * @param {VoiceProfile} profileType - voice profile for which to create new enrollment.
            * @param {IAudioSource} audioSource - audioSource from which to pull data to send
            * @public
            * @returns {Promise<IRestResponse>} rest response to enrollment request.
            */
        createEnrollment(profile: VoiceProfile, audioSource: IAudioSource): Promise<IRestResponse>;
        /**
            * Sends verification request to endpoint.
            * @function
            * @param {SpeakerVerificationModel} model - voice model to verify against.
            * @param {IAudioSource} audioSource - audioSource from which to pull data to send
            * @public
            * @returns {Promise<IRestResponse>} rest response to enrollment request.
            */
        verifySpeaker(model: SpeakerVerificationModel, audioSource: IAudioSource): Promise<IRestResponse>;
        /**
            * Sends identification request to endpoint.
            * @function
            * @param {SpeakerIdentificationModel} model - voice profiles against which to identify.
            * @param {IAudioSource} audioSource - audioSource from which to pull data to send
            * @public
            * @returns {Promise<IRestResponse>} rest response to enrollment request.
            */
        identifySpeaker(model: SpeakerIdentificationModel, audioSource: IAudioSource): Promise<IRestResponse>;
        /**
            * Sends profile status request to endpoint.
            * @function
            * @param {VoiceProfile} profile - voice profile to check.
            * @public
            * @returns {Promise<IRestResponse>} rest response to status request
            */
        getProfileStatus(profile: VoiceProfile): Promise<IRestResponse>;
        /**
            * Sends get all profiles request to endpoint.
            * @function
            * @param {VoiceProfileType} profileType - type of profiles to return list of
            * @public
            * @returns {Promise<IRestResponse>} promised rest response containing all profiles
            */
        getProfiles(profileType: VoiceProfileType): Promise<IRestResponse>;
        /**
            * Sends get activation/auth phrases request to endpoint.
            * @function
            * @param {VoiceProfileType} profileType - type of profiles to return phrases for
            * @param {string} lang - language/locale of voice profile
            * @public
            * @returns {Promise<IRestResponse>} promised rest response containing list of valid phrases
            */
        getPhrases(profileType: VoiceProfileType, lang: string): Promise<IRestResponse>;
        /**
            * Sends delete profile request to endpoint.
            * @function
            * @param {VoiceProfile} profile - voice profile to delete.
            * @public
            * @returns {Promise<IRestResponse>} rest response to deletion request
            */
        deleteProfile(profile: VoiceProfile): Promise<IRestResponse>;
        /**
            * Sends reset profile request to endpoint.
            * @function
            * @param {VoiceProfile} profile - voice profile to reset enrollments for.
            * @public
            * @returns {Promise<IRestResponse>} rest response to reset request
            */
        resetProfile(profile: VoiceProfile): Promise<IRestResponse>;
}

export class AudioSourceEvent extends PlatformEvent {
    constructor(eventName: string, audioSourceId: string, eventType?: EventType);
    get audioSourceId(): string;
}
export class AudioSourceInitializingEvent extends AudioSourceEvent {
    constructor(audioSourceId: string);
}
export class AudioSourceReadyEvent extends AudioSourceEvent {
    constructor(audioSourceId: string);
}
export class AudioSourceOffEvent extends AudioSourceEvent {
    constructor(audioSourceId: string);
}
export class AudioSourceErrorEvent extends AudioSourceEvent {
    constructor(audioSourceId: string, error: string);
    get error(): string;
}
export class AudioStreamNodeEvent extends AudioSourceEvent {
    constructor(eventName: string, audioSourceId: string, audioNodeId: string);
    get audioNodeId(): string;
}
export class AudioStreamNodeAttachingEvent extends AudioStreamNodeEvent {
    constructor(audioSourceId: string, audioNodeId: string);
}
export class AudioStreamNodeAttachedEvent extends AudioStreamNodeEvent {
    constructor(audioSourceId: string, audioNodeId: string);
}
export class AudioStreamNodeDetachedEvent extends AudioStreamNodeEvent {
    constructor(audioSourceId: string, audioNodeId: string);
}
export class AudioStreamNodeErrorEvent extends AudioStreamNodeEvent {
    constructor(audioSourceId: string, audioNodeId: string, error: string);
    get error(): string;
}

export class ServiceEvent extends PlatformEvent {
    constructor(eventName: string, jsonstring: string, eventType?: EventType);
    get jsonString(): string;
}
export class ConnectionEvent extends PlatformEvent {
    constructor(eventName: string, connectionId: string, eventType?: EventType);
    get connectionId(): string;
}
export class ConnectionStartEvent extends ConnectionEvent {
    constructor(connectionId: string, uri: string, headers?: IStringDictionary<string>);
    get uri(): string;
    get headers(): IStringDictionary<string>;
}
export class ConnectionEstablishedEvent extends ConnectionEvent {
    constructor(connectionId: string);
}
export class ConnectionClosedEvent extends ConnectionEvent {
    constructor(connectionId: string, statusCode: number, reason: string);
    get reason(): string;
    get statusCode(): number;
}
export class ConnectionErrorEvent extends ConnectionEvent {
    constructor(connectionId: string, message: string, type: string);
    get message(): string;
    get type(): string;
}
export class ConnectionEstablishErrorEvent extends ConnectionEvent {
    constructor(connectionId: string, statuscode: number, reason: string);
    get reason(): string;
    get statusCode(): number;
}
export class ConnectionMessageReceivedEvent extends ConnectionEvent {
    constructor(connectionId: string, networkReceivedTimeISO: string, message: ConnectionMessage);
    get networkReceivedTime(): string;
    get message(): ConnectionMessage;
}
export class ConnectionMessageSentEvent extends ConnectionEvent {
    constructor(connectionId: string, networkSentTimeISO: string, message: ConnectionMessage);
    get networkSentTime(): string;
    get message(): ConnectionMessage;
}

export enum MessageType {
    Text = 0,
    Binary = 1
}
export class ConnectionMessage {
    constructor(messageType: MessageType, body: any, headers?: IStringDictionary<string>, id?: string);
    get messageType(): MessageType;
    get headers(): IStringDictionary<string>;
    get body(): any;
    get textBody(): string;
    get binaryBody(): ArrayBuffer;
    get id(): string;
}

export class ConnectionOpenResponse {
    constructor(statusCode: number, reason: string);
    get statusCode(): number;
    get reason(): string;
}

export class DialogEvent extends PlatformEvent {
    constructor(eventName: string, eventType?: EventType);
}
export class SendingAgentContextMessageEvent extends DialogEvent {
    constructor(agentConfig: AgentConfig);
    get agentConfig(): AgentConfig;
}

/**
    * The error that is thrown when an argument passed in is null.
    *
    * @export
    * @class ArgumentNullError
    * @extends {Error}
    */
export class ArgumentNullError extends Error {
        /**
            * Creates an instance of ArgumentNullError.
            *
            * @param {string} argumentName - Name of the argument that is null
            *
            * @memberOf ArgumentNullError
            */
        constructor(argumentName: string);
}
/**
    * The error that is thrown when an invalid operation is performed in the code.
    *
    * @export
    * @class InvalidOperationError
    * @extends {Error}
    */
export class InvalidOperationError extends Error {
        /**
            * Creates an instance of InvalidOperationError.
            *
            * @param {string} error - The error
            *
            * @memberOf InvalidOperationError
            */
        constructor(error: string);
}
/**
    * The error that is thrown when an object is disposed.
    *
    * @export
    * @class ObjectDisposedError
    * @extends {Error}
    */
export class ObjectDisposedError extends Error {
        /**
            * Creates an instance of ObjectDisposedError.
            *
            * @param {string} objectName - The object that is disposed
            * @param {string} error - The error
            *
            * @memberOf ObjectDisposedError
            */
        constructor(objectName: string, error?: string);
}

export class Events {
    static setEventSource(eventSource: IEventSource<PlatformEvent>): void;
    static get instance(): IEventSource<PlatformEvent>;
}

export class EventSource<TEvent extends PlatformEvent> implements IEventSource<TEvent> {
    constructor(metadata?: IStringDictionary<string>);
    onEvent(event: TEvent): void;
    attach(onEventCallback: (event: TEvent) => void): IDetachable;
    attachListener(listener: IEventListener<TEvent>): IDetachable;
    attachConsoleListener(listener: IEventListener<TEvent>): IDetachable;
    isDisposed(): boolean;
    dispose(): void;
    get metadata(): IStringDictionary<string>;
}

const createGuid: () => string;
const createNoDashGuid: () => string;
export { createGuid, createNoDashGuid };

export interface IAudioSource {
    id(): string;
    turnOn(): Promise<void>;
    attach(audioNodeId: string): Promise<IAudioStreamNode>;
    detach(audioNodeId: string): void;
    turnOff(): Promise<void>;
    events: EventSource<AudioSourceEvent>;
    format: Promise<AudioStreamFormatImpl>;
    deviceInfo: Promise<ISpeechConfigAudioDevice>;
    blob: Promise<Blob | Buffer>;
    setProperty?(name: string, value: string): void;
    getProperty?(name: string, def?: string): string;
}
export interface IAudioStreamNode extends IDetachable {
    id(): string;
    read(): Promise<IStreamChunk<ArrayBuffer>>;
}

export enum ConnectionState {
    None = 0,
    Connected = 1,
    Connecting = 2,
    Disconnected = 3
}
export interface IConnection {
    id: string;
    state(): ConnectionState;
    open(): Promise<ConnectionOpenResponse>;
    send(message: ConnectionMessage): Promise<void>;
    read(): Promise<ConnectionMessage>;
    events: EventSource<ConnectionEvent>;
    dispose(disposing?: string): Promise<void>;
}

export interface IDetachable {
    detach(): Promise<void>;
}

export interface IStringDictionary<TValue> {
    [propName: string]: TValue;
}
export interface INumberDictionary<TValue> extends Object {
    [propName: number]: TValue;
}

/**
    * @export
    * @interface IDisposable
    */
export interface IDisposable {
        /**
            * @returns {boolean}
            *
            * @memberOf IDisposable
            */
        isDisposed(): boolean;
        /**
            * Performs cleanup operations on this instance
            *
            * @param {string} [reason] - optional reason for disposing the instance.
            * This will be used to throw errors when a operations are performed on the disposed object.
            *
            * @memberOf IDisposable
            */
        dispose(reason?: string): void;
}

export interface IEventListener<TEvent extends PlatformEvent> {
    onEvent(e: TEvent): void;
}
export interface IEventSource<TEvent extends PlatformEvent> extends IDisposable {
    metadata: IStringDictionary<string>;
    onEvent(e: TEvent): void;
    attach(onEventCallback: (event: TEvent) => void): IDetachable;
    attachListener(listener: IEventListener<TEvent>): IDetachable;
    attachConsoleListener(listener: IEventListener<TEvent>): IDetachable;
}

export interface IErrorMessages {
    authInvalidSubscriptionKey: string;
    authInvalidSubscriptionRegion: string;
    invalidArgs: string;
    invalidCreateJoinConversationResponse: string;
    invalidParticipantRequest: string;
    permissionDeniedConnect: string;
    permissionDeniedConversation: string;
    permissionDeniedParticipant: string;
    permissionDeniedSend: string;
    permissionDeniedStart: string;
}

export interface ITimer {
        /**
            * start timer
            *
            * @param {number} delay
            * @param {(...args: any[]) => any} successCallback
            * @returns {*}
            *
            * @memberOf ITimer
            */
        start(): void;
        /**
            * stops timer
            *
            * @param {*} timerId
            *
            * @memberOf ITimer
            */
        stop(): void;
}

export interface IWebsocketMessageFormatter {
    toConnectionMessage(message: RawWebsocketMessage): Promise<ConnectionMessage>;
    fromConnectionMessage(message: ConnectionMessage): Promise<RawWebsocketMessage>;
}

export interface IList<TItem> extends IDisposable {
    get(itemIndex: number): TItem;
    first(): TItem;
    last(): TItem;
    add(item: TItem): void;
    insertAt(index: number, item: TItem): void;
    removeFirst(): TItem;
    removeLast(): TItem;
    removeAt(index: number): TItem;
    remove(index: number, count: number): TItem[];
    clear(): void;
    length(): number;
    onAdded(addedCallback: () => void): IDetachable;
    onRemoved(removedCallback: () => void): IDetachable;
    onDisposed(disposedCallback: () => void): IDetachable;
    join(seperator?: string): string;
    toArray(): TItem[];
    any(callback?: (item: TItem, index: number) => boolean): boolean;
    all(callback: (item: TItem) => boolean): boolean;
    forEach(callback: (item: TItem, index: number) => void): void;
    select<T2>(callback: (item: TItem, index: number) => T2): List<T2>;
    where(callback: (item: TItem, index: number) => boolean): List<TItem>;
    orderBy(compareFn: (a: TItem, b: TItem) => number): List<TItem>;
    orderByDesc(compareFn: (a: TItem, b: TItem) => number): List<TItem>;
    clone(): List<TItem>;
    concat(list: List<TItem>): List<TItem>;
    concatArray(array: TItem[]): List<TItem>;
}
export class List<TItem> implements IList<TItem> {
    constructor(list?: TItem[]);
    get(itemIndex: number): TItem;
    first(): TItem;
    last(): TItem;
    add(item: TItem): void;
    insertAt(index: number, item: TItem): void;
    removeFirst(): TItem;
    removeLast(): TItem;
    removeAt(index: number): TItem;
    remove(index: number, count: number): TItem[];
    clear(): void;
    length(): number;
    onAdded(addedCallback: () => void): IDetachable;
    onRemoved(removedCallback: () => void): IDetachable;
    onDisposed(disposedCallback: () => void): IDetachable;
    join(seperator?: string): string;
    toArray(): TItem[];
    any(callback?: (item: TItem, index: number) => boolean): boolean;
    all(callback: (item: TItem) => boolean): boolean;
    forEach(callback: (item: TItem, index: number) => void): void;
    select<T2>(callback: (item: TItem, index: number) => T2): List<T2>;
    where(callback: (item: TItem, index: number) => boolean): List<TItem>;
    orderBy(compareFn: (a: TItem, b: TItem) => number): List<TItem>;
    orderByDesc(compareFn: (a: TItem, b: TItem) => number): List<TItem>;
    clone(): List<TItem>;
    concat(list: List<TItem>): List<TItem>;
    concatArray(array: TItem[]): List<TItem>;
    isDisposed(): boolean;
    dispose(reason?: string): void;
}

export enum EventType {
    Debug = 0,
    Info = 1,
    Warning = 2,
    Error = 3,
    None = 4
}
export class PlatformEvent {
    constructor(eventName: string, eventType: EventType);
    get name(): string;
    get eventId(): string;
    get eventTime(): string;
    get eventType(): EventType;
    get metadata(): IStringDictionary<string>;
}

export enum PromiseState {
    None = 0,
    Resolved = 1,
    Rejected = 2
}
export interface IDeferred<T> {
    readonly promise: Promise<T>;
    resolve(result: T): IDeferred<T>;
    reject(error: string): IDeferred<T>;
}
export class PromiseResult<T> {
    protected privIsCompleted: boolean;
    protected privIsError: boolean;
    protected privError: string;
    protected privResult: T;
    constructor(promiseResultEventSource: PromiseResultEventSource<T>);
    get isCompleted(): boolean;
    get isError(): boolean;
    get error(): string;
    get result(): T;
    throwIfError: () => void;
}
export class PromiseResultEventSource<T> {
    setResult: (result: T) => void;
    setError: (error: string) => void;
    on: (onSetResult: (result: T) => void, onSetError: (error: string) => void) => void;
}
export class Deferred<T> implements IDeferred<T> {
    constructor();
    get promise(): Promise<T>;
    resolve: (result: T | Promise<T>) => Deferred<T>;
    reject: (error: string) => Deferred<T>;
}
export class Sink<T> {
    constructor();
    get state(): PromiseState;
    get result(): PromiseResult<T>;
    resolve(result: T): void;
    reject(error: string): void;
    on(successCallback: (result: T) => void, errorCallback: (error: string) => void): void;
}
export function marshalPromiseToCallbacks<T>(promise: Promise<T>, cb?: (value: T) => void, err?: (error: string) => void): void;

export interface IQueue<TItem> extends IDisposable {
    enqueue(item: TItem): void;
    enqueueFromPromise(promise: Promise<TItem>): void;
    dequeue(): Promise<TItem>;
    peek(): Promise<TItem>;
    length(): number;
}
export class Queue<TItem> implements IQueue<TItem> {
    constructor(list?: List<TItem>);
    enqueue(item: TItem): void;
    enqueueFromPromise(promise: Promise<TItem>): void;
    dequeue(): Promise<TItem>;
    peek(): Promise<TItem>;
    length(): number;
    isDisposed(): boolean;
    drainAndDispose(pendingItemProcessor: (pendingItemInQueue: TItem) => void, reason?: string): Promise<void>;
    dispose(reason?: string): Promise<void>;
}

export class RawWebsocketMessage {
    constructor(messageType: MessageType, payload: any, id?: string);
    get messageType(): MessageType;
    get payload(): any;
    get textContent(): string;
    get binaryContent(): ArrayBuffer;
    get id(): string;
}

export class RiffPcmEncoder {
    constructor(actualSampleRate: number, desiredSampleRate: number);
    encode(actualAudioFrame: Float32Array): ArrayBuffer;
}

export interface IStreamChunk<TBuffer> {
    isEnd: boolean;
    buffer: TBuffer;
    timeReceived: number;
}
export class Stream<TBuffer> {
    constructor(streamId?: string);
    get isClosed(): boolean;
    get isReadEnded(): boolean;
    get id(): string;
    close(): void;
    writeStreamChunk(streamChunk: IStreamChunk<TBuffer>): void;
    read(): Promise<IStreamChunk<TBuffer>>;
    readEnded(): void;
}

/**
    * Defines translation status.
    * @class TranslationStatus
    */
export enum TranslationStatus {
        /**
            * @member TranslationStatus.Success
            */
        Success = 0,
        /**
            * @member TranslationStatus.Error
            */
        Error = 1
}

export class ChunkedArrayBufferStream extends Stream<ArrayBuffer> {
    constructor(targetChunkSize: number, streamId?: string);
    writeStreamChunk(chunk: IStreamChunk<ArrayBuffer>): void;
    close(): void;
}

export interface IAudioDestination {
    id(): string;
    write(buffer: ArrayBuffer): void;
    format: AudioStreamFormat;
    close(cb?: () => void, err?: (error: string) => void): void;
}

interface IWorkerTimers {
    clearTimeout: (timerId: number) => void;
    setTimeout: (func: () => any, delay: number) => number;
}
export class Timeout {
    static clearTimeout: IWorkerTimers["clearTimeout"];
    static setTimeout: IWorkerTimers["setTimeout"];
    static load(): any;
    static timers: () => IWorkerTimers;
}
export {};

export class OCSPEvent extends PlatformEvent {
    constructor(eventName: string, eventType: EventType, signature: string);
}
export class OCSPMemoryCacheHitEvent extends OCSPEvent {
    constructor(signature: string);
}
export class OCSPCacheMissEvent extends OCSPEvent {
    constructor(signature: string);
}
export class OCSPDiskCacheHitEvent extends OCSPEvent {
    constructor(signature: string);
}
export class OCSPCacheUpdateNeededEvent extends OCSPEvent {
    constructor(signature: string);
}
export class OCSPMemoryCacheStoreEvent extends OCSPEvent {
    constructor(signature: string);
}
export class OCSPDiskCacheStoreEvent extends OCSPEvent {
    constructor(signature: string);
}
export class OCSPCacheUpdateCompleteEvent extends OCSPEvent {
    constructor(signature: string);
}
export class OCSPStapleReceivedEvent extends OCSPEvent {
    constructor();
}
export class OCSPWSUpgradeStartedEvent extends OCSPEvent {
    constructor(serialNumber: string);
}
export class OCSPCacheEntryExpiredEvent extends OCSPEvent {
    constructor(serialNumber: string, expireTime: number);
}
export class OCSPCacheEntryNeedsRefreshEvent extends OCSPEvent {
    constructor(serialNumber: string, startTime: number, expireTime: number);
}
export class OCSPCacheHitEvent extends OCSPEvent {
    constructor(serialNumber: string, startTime: number, expireTime: number);
}
export class OCSPVerificationFailedEvent extends OCSPEvent {
    constructor(serialNumber: string, error: string);
}
export class OCSPCacheFetchErrorEvent extends OCSPEvent {
    constructor(serialNumber: string, error: string);
}
export class OCSPResponseRetrievedEvent extends OCSPEvent {
    constructor(serialNumber: string);
}
export class OCSPCacheUpdateErrorEvent extends OCSPEvent {
    constructor(serialNumber: string, error: string);
}

export class BackgroundEvent extends PlatformEvent {
    constructor(error: string);
    get error(): string;
}

export abstract class ConnectionFactoryBase implements IConnectionFactory {
    static getHostSuffix(region: string): string;
    abstract create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
    protected setCommonUrlParams(config: RecognizerConfig, queryParams: IStringDictionary<string>, endpoint: string): void;
    protected setUrlParameter(propId: PropertyId, parameterName: string, config: RecognizerConfig, queryParams: IStringDictionary<string>, endpoint: string): void;
}

export class SpeechConnectionMessage extends ConnectionMessage {
    constructor(messageType: MessageType, path: string, requestId: string, contentType: string, body: any, streamId?: string, additionalHeaders?: IStringDictionary<string>, id?: string);
    get path(): string;
    get requestId(): string;
    get contentType(): string;
    get streamId(): string;
    get additionalHeaders(): IStringDictionary<string>;
    static fromConnectionMessage(message: ConnectionMessage): SpeechConnectionMessage;
}

export class ConversationManager {
        constructor();
        /**
            * Make a POST request to the Conversation Manager service endpoint to create or join a conversation.
            * @param args
            * @param conversationCode
            * @param callback
            * @param errorCallback
            */
        createOrJoin(args: PropertyCollection, conversationCode: string, cb?: (c: any) => void, err?: (e: string) => void): void;
        /**
            * Make a DELETE request to the Conversation Manager service endpoint to leave the conversation.
            * @param args
            * @param sessionToken
            * @param callback
            */
        leave(args: PropertyCollection, sessionToken: string): Promise<void>;
}

export class ConversationConnectionConfig extends RestConfigBase {
    static get host(): string;
    static get apiVersion(): string;
    static get clientAppId(): string;
    static get defaultLanguageCode(): string;
    static get restPath(): string;
    static get webSocketPath(): string;
    static get transcriptionEventKeys(): string[];
}

export class ConversationRecognizerFactory {
        static fromConfig(conversation: IConversation, speechConfig: SpeechTranslationConfig, audioConfig?: AudioConfig): ConversationRecognizer;
}
/**
    * Sends messages to the Conversation Translator websocket and listens for incoming events containing websocket messages.
    * Based off the recognizers in the SDK folder.
    */
export class ConversationTranslatorRecognizer extends Recognizer implements ConversationRecognizer {
        constructor(conversation: IConversation, speechConfig: SpeechTranslationConfig, audioConfig?: AudioConfig);
        canceled: (sender: ConversationRecognizer, event: ConversationTranslationCanceledEventArgs) => void;
        conversationExpiration: (sender: ConversationRecognizer, event: ConversationExpirationEventArgs) => void;
        lockRoomCommandReceived: (sender: ConversationRecognizer, event: LockRoomEventArgs) => void;
        muteAllCommandReceived: (sender: ConversationRecognizer, event: MuteAllEventArgs) => void;
        participantJoinCommandReceived: (sender: ConversationRecognizer, event: ParticipantEventArgs) => void;
        participantLeaveCommandReceived: (sender: ConversationRecognizer, event: ParticipantEventArgs) => void;
        participantUpdateCommandReceived: (sender: ConversationRecognizer, event: ParticipantAttributeEventArgs) => void;
        connectionOpened: (sender: ConversationRecognizer, event: SessionEventArgs) => void;
        connectionClosed: (sender: ConversationRecognizer, event: SessionEventArgs) => void;
        translationReceived: (sender: ConversationRecognizer, event: ConversationReceivedTranslationEventArgs) => void;
        participantsListReceived: (sender: ConversationRecognizer, event: ParticipantsListEventArgs) => void;
        participantsChanged: (sender: ConversationRecognizer, event: ConversationParticipantsChangedEventArgs) => void;
        set connected(cb: (e: ConnectionEventArgs) => void);
        set disconnected(cb: (e: ConnectionEventArgs) => void);
        /**
            * Return the speech language used by the recognizer
            */
        get speechRecognitionLanguage(): string;
        /**
            * Return the properties for the recognizer
            */
        get properties(): PropertyCollection;
        isDisposed(): boolean;
        /**
            * Connect to the recognizer
            * @param token
            */
        connect(token: string, cb?: () => void, err?: (e: string) => void): void;
        /**
            * Disconnect from the recognizer
            */
        disconnect(cb?: () => void, err?: (e: string) => void): void;
        /**
            * Send the mute all participants command to the websocket
            * @param conversationId
            * @param participantId
            * @param isMuted
            */
        sendRequest(command: string, cb?: () => void, err?: (e: string) => void): void;
        /**
            * Close and dispose the recognizer
            */
        close(): Promise<void>;
        /**
            * Dispose the recognizer
            * @param disposing
            */
        protected dispose(disposing: boolean): Promise<void>;
        /**
            * Create the config for the recognizer
            * @param speechConfig
            */
        protected createRecognizerConfig(speechConfig: SpeechServiceConfig): RecognizerConfig;
        /**
            * Create the service recognizer.
            * The audio source is redundnant here but is required by the implementation.
            * @param authentication
            * @param connectionFactory
            * @param audioConfig
            * @param recognizerConfig
            */
        protected createServiceRecognizer(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioConfig: AudioConfig, recognizerConfig: RecognizerConfig): ServiceRecognizerBase;
}

export class TranscriberRecognizer extends Recognizer {
        recognizing: (sender: Recognizer, event: SpeechRecognitionEventArgs) => void;
        recognized: (sender: Recognizer, event: SpeechRecognitionEventArgs) => void;
        canceled: (sender: Recognizer, event: CancellationEventArgs) => void;
        /**
            * TranscriberRecognizer constructor.
            * @constructor
            * @param {SpeechTranslationConfig} speechTranslationConfig - Non-audio configuration associated with the recognizer
            * @param {AudioConfig} audioConfig - An audio configuration associated with the recognizer
            */
        constructor(speechTranslationConfig: SpeechTranslationConfig, audioConfig: AudioConfig);
        get speechRecognitionLanguage(): string;
        get properties(): PropertyCollection;
        get authorizationToken(): string;
        set authorizationToken(token: string);
        set conversation(c: Conversation);
        getConversationInfo(): ConversationInfo;
        startContinuousRecognitionAsync(cb?: () => void, err?: (e: string) => void): void;
        stopContinuousRecognitionAsync(cb?: () => void, err?: (e: string) => void): void;
        close(): Promise<void>;
        pushConversationEvent(conversationInfo: ConversationInfo, command: string): Promise<void>;
        enforceAudioGating(): Promise<void>;
        connectCallbacks(transcriber: ConversationTranscriber): void;
        disconnectCallbacks(): void;
        /**
            * Disposes any resources held by the object.
            * @member ConversationTranscriber.prototype.dispose
            * @function
            * @public
            * @param {boolean} disposing - true if disposing the object.
            */
        protected dispose(disposing: boolean): Promise<void>;
        protected createRecognizerConfig(speechConfig: SpeechServiceConfig): RecognizerConfig;
        protected createServiceRecognizer(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioConfig: AudioConfig, recognizerConfig: RecognizerConfig): ServiceRecognizerBase;
}

export class MuteAllEventArgs extends SessionEventArgs {
    constructor(isMuted: boolean, sessionId?: string);
    get isMuted(): boolean;
}
export class LockRoomEventArgs extends SessionEventArgs {
    constructor(isLocked: boolean, sessionId?: string);
    get isMuted(): boolean;
}
export class ParticipantEventArgs extends SessionEventArgs {
    constructor(participant: IInternalParticipant, sessionId?: string);
    get participant(): IInternalParticipant;
}
export class ParticipantAttributeEventArgs extends SessionEventArgs {
    constructor(participantId: string, key: string, value: boolean | number | string | string[], sessionId?: string);
    get value(): boolean | number | string | string[];
    get key(): string;
    get id(): string;
}
export class ParticipantsListEventArgs extends SessionEventArgs {
    constructor(conversationId: string, token: string, translateTo: string[], profanityFilter: string, roomProfanityFilter: string, isRoomLocked: boolean, isMuteAll: boolean, participants: IInternalParticipant[], sessionId?: string);
    get sessionToken(): string;
    get conversationId(): string;
    get translateTo(): string[];
    get profanityFilter(): string;
    get roomProfanityFilter(): string;
    get isRoomLocked(): boolean;
    get isMuteAll(): boolean;
    get participants(): IInternalParticipant[];
}
export class ConversationReceivedTranslationEventArgs {
    constructor(command: string, payload: ConversationTranslationResult, sessionId?: string);
    get payload(): ConversationTranslationResult;
    get command(): string;
    get sessionId(): string;
}

/**
    * Internal conversation data
    */
export interface IInternalConversation {
        cognitiveSpeechAuthToken: string;
        cognitiveSpeechRegion: string;
        participantId: string;
        name: string;
        description: string;
        speechModel: string;
        modalities: number;
        isApproved: boolean;
        isMuted: boolean;
        roomId: string;
        avatar: string;
        token: string;
        correlationId: string;
        requestId: string;
        isHost: boolean;
}
/**
    * The user who is participating in the conversation.
    */
export interface IInternalParticipant {
        avatar?: string;
        displayName?: string;
        id?: string;
        isHost?: boolean;
        isMuted?: boolean;
        isUsingTts?: boolean;
        profanity?: boolean;
        preferredLanguage?: string;
        translateToLanguages?: string[];
        voice?: string;
}
/** Users participating in the conversation */
export class InternalParticipants {
        participants: IInternalParticipant[];
        meId?: string;
        constructor(participants?: IInternalParticipant[], meId?: string);
        /**
            * Add or update a participant
            * @param value
            */
        addOrUpdateParticipant(value: IInternalParticipant): IInternalParticipant;
        /**
            * Find the participant's position in the participants list.
            * @param id
            */
        getParticipantIndex(id: string): number;
        /**
            * Find the participant by id.
            * @param id
            */
        getParticipant(id: string): IInternalParticipant;
        /**
            * Remove a participant from the participants list.
            */
        deleteParticipant(id: string): void;
        /**
            * Helper to return the conversation host.
            */
        get host(): IInternalParticipant;
        /**
            * Helper to return the current user.
            */
        get me(): IInternalParticipant;
}
/**
    * Recognizer for handling Conversation Translator websocket messages
    */
export interface ConversationRecognizer {
        isDisposed(): boolean;
        sendRequest: (command: string, cb?: () => void, err?: (e: string) => void) => void;
        cancelSpeech?: () => Promise<void>;
        close?: () => Promise<void>;
        conversationExpiration?: (sender: ConversationRecognizer, event: ConversationExpirationEventArgs) => void;
        connected?: (e: ConnectionEventArgs) => void;
        disconnected?: (e: ConnectionEventArgs) => void;
        canceled?: (sender: ConversationRecognizer, event: ConversationTranslationCanceledEventArgs) => void;
        connectionOpened?: (sender: ConversationRecognizer, event: SessionEventArgs) => void;
        connectionClosed?: (sender: ConversationRecognizer, event: SessionEventArgs) => void;
        participantsListReceived?: (sender: ConversationRecognizer, event: ParticipantsListEventArgs) => void;
        translationReceived?: (sender: ConversationRecognizer, event: ConversationReceivedTranslationEventArgs) => void;
        lockRoomCommandReceived?: (sender: ConversationRecognizer, event: LockRoomEventArgs) => void;
        muteAllCommandReceived?: (sender: ConversationRecognizer, event: MuteAllEventArgs) => void;
        participantJoinCommandReceived?: (sender: ConversationRecognizer, event: ParticipantEventArgs) => void;
        participantLeaveCommandReceived?: (sender: ConversationRecognizer, event: ParticipantEventArgs) => void;
        participantUpdateCommandReceived?: (sender: ConversationRecognizer, event: ParticipantAttributeEventArgs) => void;
        connect?: (token: string, cb?: () => void, err?: (e: string) => void) => void;
}
/**
    * Error message returned from the Conversation Translator websocket
    */
export interface IConversationResponseErrorMessage {
        code: string;
        message: string;
}
/**
    * Error returned from the Conversation Translator websocket
    */
export interface IConversationResponseError {
        error: IConversationResponseErrorMessage;
}
/**
    * Base message command
    */
export interface IClientMessage {
        type: any;
}
/**
    * Command message
    */
export interface ICommandMessage extends IClientMessage {
        command?: string;
}
/**
    * Text message command
    */
export interface IInstantMessageCommand extends ICommandMessage {
        roomId: string;
        nickname?: string;
        participantId: string;
        text: string;
}
/**
    * Lock command
    */
export interface ILockConversationCommand extends ICommandMessage {
        id?: string;
        nickname?: string;
        participantId: string;
        roomid: string;
        value: boolean;
}
/**
    * Mute all command
    */
export interface IMuteAllCommand extends ICommandMessage {
        roomid: string;
        nickname?: string;
        participantId: string;
        value: boolean;
        id?: string;
}
/**
    * Mute participant command
    */
export interface IMuteCommand extends ICommandMessage {
        roomid: string;
        nickname?: string;
        participantId: string;
        value: boolean;
        id?: string;
}
/**
    * Remove participant command
    */
export interface IEjectParticipantCommand extends ICommandMessage {
        roomid: string;
        participantId: string;
}
/**
    * Change nickname command
    */
export interface IChangeNicknameCommand extends ICommandMessage {
        roomid: string;
        participantId: string;
        nickname: string;
        value: string;
}
/**
    * List of command message types
    */
export const ConversationTranslatorMessageTypes: {
        command: string;
        final: string;
        info: string;
        instantMessage: string;
        keepAlive: string;
        partial: string;
        participantCommand: string;
        translatedMessage: string;
};
/**
    * List of command types
    */
export const ConversationTranslatorCommandTypes: {
        changeNickname: string;
        disconnectSession: string;
        ejectParticipant: string;
        instant_message: string;
        joinSession: string;
        leaveSession: string;
        participantList: string;
        roomExpirationWarning: string;
        setLockState: string;
        setMute: string;
        setMuteAll: string;
        setProfanityFiltering: string;
        setTranslateToLanguages: string;
        setUseTTS: string;
};
/**
    * HTTP response helper
    */
export interface IResponse {
        ok: boolean;
        status: number;
        statusText: string;
        data: string;
        json: <T>() => T;
        headers: string;
}

/**
    * @private
    * @class AudioOutputFormatImpl
    * Updated in version 1.17.0
    */
export class AudioOutputFormatImpl extends AudioStreamFormatImpl {
        static SpeechSynthesisOutputFormatToString: INumberDictionary<string>;
        /**
            * Creates an instance with the given values.
            * @constructor
            * @param formatTag
            * @param {number} channels - Number of channels.
            * @param {number} samplesPerSec - Samples per second.
            * @param {number} avgBytesPerSec - Average bytes per second.
            * @param {number} blockAlign - Block alignment.
            * @param {number} bitsPerSample - Bits per sample.
            * @param {string} audioFormatString - Audio format string
            * @param {string} requestAudioFormatString - Audio format string sent to service.
            * @param {boolean} hasHeader - If the format has header or not.
            */
        constructor(formatTag: AudioFormatTag, channels: number, samplesPerSec: number, avgBytesPerSec: number, blockAlign: number, bitsPerSample: number, audioFormatString: string, requestAudioFormatString: string, hasHeader: boolean);
        static fromSpeechSynthesisOutputFormat(speechSynthesisOutputFormat?: SpeechSynthesisOutputFormat): AudioOutputFormatImpl;
        static fromSpeechSynthesisOutputFormatString(speechSynthesisOutputFormatString: string): AudioOutputFormatImpl;
        static getDefaultOutputFormat(): AudioOutputFormatImpl;
        /**
            * The format tag of the audio
            * @AudioFormatTag AudioOutputFormatImpl.prototype.formatTag
            * @function
            * @public
            */
        formatTag: AudioFormatTag;
        /**
            * Specifies if this audio output format has a header
            * @boolean AudioOutputFormatImpl.prototype.hasHeader
            * @function
            * @public
            */
        get hasHeader(): boolean;
        /**
            * Specifies the header of this format
            * @ArrayBuffer AudioOutputFormatImpl.prototype.header
            * @function
            * @public
            */
        get header(): ArrayBuffer;
        /**
            * Updates the header based on the audio length
            * @member AudioOutputFormatImpl.updateHeader
            * @function
            * @public
            * @param {number} audioLength - the audio length
            */
        updateHeader(audioLength: number): void;
        /**
            * Specifies the audio format string to be sent to the service
            * @string AudioOutputFormatImpl.prototype.requestAudioFormatString
            * @function
            * @public
            */
        get requestAudioFormatString(): string;
}

export class SpeechSynthesisEvent extends PlatformEvent {
    constructor(eventName: string, requestId: string, eventType?: EventType);
    get requestId(): string;
}
export class SynthesisTriggeredEvent extends SpeechSynthesisEvent {
    constructor(requestId: string, sessionAudioDestinationId: string, turnAudioDestinationId: string);
    get audioSessionDestinationId(): string;
    get audioTurnDestinationId(): string;
}
export class ConnectingToSynthesisServiceEvent extends SpeechSynthesisEvent {
    constructor(requestId: string, authFetchEventId: string);
    get authFetchEventId(): string;
}
export class SynthesisStartedEvent extends SpeechSynthesisEvent {
    constructor(requestId: string, authFetchEventId: string);
    get authFetchEventId(): string;
}

export class ConsoleLoggingListener implements IEventListener<PlatformEvent> {
    constructor(logLevelFilter?: LogLevel);
    set logPath(path: fs.PathLike);
    onEvent(event: PlatformEvent): void;
}

export interface IRecorder {
    record(context: AudioContext, mediaStream: MediaStream, outputStream: Stream<ArrayBuffer>): void;
    releaseMediaResources(context: AudioContext): void;
    setWorkletUrl(url: string): void;
}

export const AudioWorkletSourceURLPropertyName = "MICROPHONE-WorkletSourceUrl";
export class MicAudioSource implements IAudioSource {
    constructor(privRecorder: IRecorder, deviceId?: string, audioSourceId?: string, mediaStream?: MediaStream);
    get format(): Promise<AudioStreamFormatImpl>;
    get blob(): Promise<Blob>;
    turnOn(): Promise<void>;
    id(): string;
    attach(audioNodeId: string): Promise<IAudioStreamNode>;
    detach(audioNodeId: string): void;
    turnOff(): Promise<void>;
    get events(): EventSource<AudioSourceEvent>;
    get deviceInfo(): Promise<ISpeechConfigAudioDevice>;
    setProperty(name: string, value: string): void;
}

export class FileAudioSource implements IAudioSource {
    constructor(file: File | Buffer, filename?: string, audioSourceId?: string);
    get format(): Promise<AudioStreamFormatImpl>;
    get blob(): Promise<Blob | Buffer>;
    turnOn(): Promise<void>;
    id(): string;
    attach(audioNodeId: string): Promise<IAudioStreamNode>;
    detach(audioNodeId: string): void;
    turnOff(): Promise<void>;
    get events(): EventSource<AudioSourceEvent>;
    get deviceInfo(): Promise<ISpeechConfigAudioDevice>;
}

export class PcmRecorder implements IRecorder {
    constructor(stopInputOnRelease: boolean);
    record(context: AudioContext, mediaStream: MediaStream, outputStream: Stream<ArrayBuffer>): void;
    releaseMediaResources(context: AudioContext): void;
    setWorkletUrl(url: string): void;
}

export class WebsocketConnection implements IConnection {
    constructor(uri: string, queryParameters: IStringDictionary<string>, headers: IStringDictionary<string>, messageFormatter: IWebsocketMessageFormatter, proxyInfo: ProxyInfo, enableCompression?: boolean, connectionId?: string);
    dispose(): Promise<void>;
    isDisposed(): boolean;
    get id(): string;
    get uri(): string;
    state(): ConnectionState;
    open(): Promise<ConnectionOpenResponse>;
    send(message: ConnectionMessage): Promise<void>;
    read(): Promise<ConnectionMessage>;
    get events(): EventSource<ConnectionEvent>;
}

export class WebsocketMessageAdapter {
    static forceNpmWebSocket: boolean;
    constructor(uri: string, connectionId: string, messageFormatter: IWebsocketMessageFormatter, proxyInfo: ProxyInfo, headers: {
        [key: string]: string;
    }, enableCompression: boolean);
    get state(): ConnectionState;
    open(): Promise<ConnectionOpenResponse>;
    send(message: ConnectionMessage): Promise<void>;
    read(): Promise<ConnectionMessage>;
    close(reason?: string): Promise<void>;
    get events(): EventSource<ConnectionEvent>;
}

export class ReplayableAudioNode implements IAudioStreamNode {
    constructor(audioSource: IAudioStreamNode, bytesPerSecond: number);
    id(): string;
    read(): Promise<IStreamChunk<ArrayBuffer>>;
    detach(): Promise<void>;
    replay(): void;
    shrinkBuffers(offset: number): void;
    findTimeAtOffset(offset: number): number;
}

export class ProxyInfo {
    static fromParameters(parameters: PropertyCollection): ProxyInfo;
    static fromRecognizerConfig(config: RecognizerConfig): ProxyInfo;
    get HostName(): string;
    get Port(): number;
    get UserName(): string;
    get Password(): string;
}

export enum RestRequestType {
    Get = "GET",
    Post = "POST",
    Delete = "DELETE",
    File = "file"
}
export interface IRestResponse {
    ok: boolean;
    status: number;
    statusText: string;
    data: string;
    json: any;
    headers: string;
}
export class RestMessageAdapter {
    constructor(configParams: IRequestOptions);
    static extractHeaderValue(headerKey: string, headers: string): string;
    set options(configParams: IRequestOptions);
    setHeaders(key: string, value: string): void;
    request(method: RestRequestType, uri: string, queryParams?: {
        [key: string]: any;
    }, body?: any, binaryBody?: Blob | Buffer): Promise<IRestResponse>;
}

/**
  * HTTP request helper
  */
export interface IRequestOptions {
    headers?: {
        [key: string]: string;
    };
    ignoreCache?: boolean;
    timeout?: number;
}
export interface IRestParams {
    apiVersion: string;
    authorization: string;
    clientAppId: string;
    contentTypeKey: string;
    correlationId: string;
    languageCode: string;
    nickname: string;
    profanity: string;
    requestId: string;
    roomId: string;
    sessionToken: string;
    subscriptionKey: string;
    subscriptionRegion: string;
    token: string;
}
export class RestConfigBase {
    static get requestOptions(): IRequestOptions;
    static get configParams(): IRestParams;
    static get restErrors(): IErrorMessages;
}

