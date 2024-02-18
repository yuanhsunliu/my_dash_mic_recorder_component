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
//        this.props.setProps({audio: recordedBlob})
    }

    async onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
        let local_props = this.props;

        let reader = new FileReader();

        // 读取Blob对象
        reader.readAsArrayBuffer(recordedBlob['blob']);

        // 当读取完成时，转换为Float32Array
        reader.onload = function() {
          let buffer = reader.result;
          var incomingData = new Uint8Array(buffer); // create a uint8 view on the ArrayBuffer
          var i, l = incomingData.length; // length, we need this for the loop
          var outputData = new Float32Array(incomingData.length); // create the Float32Array for output
          for (i = 0; i < l; i++) {
              outputData[i] = (incomingData[i] - 128) / 128.0; // convert audio to float
          }

          // 在这里可以使用float32Array进行其他操作
          local_props.setProps({audio: outputData})
        };

        this.props.setProps({value: recordedBlob})
    }

    render() {
        const {id, record, setProps, backgroundColor, strokeColor} = this.props;

        return (
            <div id={id}>
                <ReactMic
                  record={this.props.record}
                  className="sound-wave"
                  height={100}
                  width={640}
                  mimeType='audio/mp3'
                  onStop={this.onStop}
                  onData={this.onData}
                  strokeColor={strokeColor}
                  backgroundColor={backgroundColor} />
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
};
