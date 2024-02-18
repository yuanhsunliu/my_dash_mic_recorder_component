import React from 'react';
import PropTypes from 'prop-types';
import { MyDashMicRecorderComponent as RealComponent } from '../LazyLoader';

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
const MyDashMicRecorderComponent = (props) => {
    return (
        <React.Suspense fallback={null}>
            <RealComponent {...props}/>
        </React.Suspense>
    );
};

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

export default MyDashMicRecorderComponent;

export const defaultProps = MyDashMicRecorderComponent.defaultProps;
export const propTypes = MyDashMicRecorderComponent.propTypes;
