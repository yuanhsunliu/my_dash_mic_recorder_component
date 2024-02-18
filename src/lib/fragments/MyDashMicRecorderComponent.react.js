import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ReactMic } from 'react-mic';

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default class MyDashMicRecorderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          record: false,
        }

        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onData = this.onData.bind(this);
    }

    startRecording = () => {
        this.setState({ record: true });
    }

    stopRecording = () => {
        this.setState({ record: false });
    }

    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    async onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);

        let local_props = this.props;
        let reader = new FileReader();
        // 当读取完成时，转换为Float32Array
        reader.onloadend = function() {
          let buffer = reader.result;
          let base64 = buffer.split(',')[1];

          // 在这里可以使用float32Array进行其他操作
          local_props.setProps({audio: {'base64': base64}})
        };
        reader.readAsDataURL(recordedBlob['blob']);

        this.props.setProps({value: recordedBlob})
    }

    render() {
        const {id, record, setProps, backgroundColor, strokeColor, recorderParams} = this.props;

        return (
            <div id={id}>
                <ReactMic
                  record={this.props.record}
                  className="sound-wave"
                  height={100}
                  width={640}
                  mimeType='audio/wav'
                  audioBitsPerSecond={128000}
                  bufferSize={2048}
                  sampleRate={44100}
                  onStop={this.onStop}
                  onData={this.onData}
                  strokeColor={strokeColor}
                  backgroundColor={backgroundColor}
                  recorderParams={recorderParams} />
            </div>
        );
    }
}

MyDashMicRecorderComponent.defaultProps = {};

MyDashMicRecorderComponent.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * The value displayed in the input.
     */
    value: PropTypes.object,

    /**
     * The value displayed in the input.
     */
    audio: PropTypes.object,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,

    /**
     * The value displayed in the input.
     */
    record: PropTypes.bool,

    /**
     * The value displayed in the input.
     */
    backgroundColor: PropTypes.string,

    /**
     * The value displayed in the input.
     */
    strokeColor: PropTypes.string,

    /**
     * The value displayed in the input.
     */
    recorderParams: PropTypes.object
};
