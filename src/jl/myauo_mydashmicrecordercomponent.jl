# AUTO GENERATED FILE - DO NOT EDIT

export myauo_mydashmicrecordercomponent

"""
    myauo_mydashmicrecordercomponent(;kwargs...)

A MyDashMicRecorderComponent component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `audio` (Dict; optional): The value displayed in the input.
- `backgroundColor` (String; optional): The value displayed in the input.
- `record` (Bool; optional): The value displayed in the input.
- `recorderParams` (Dict; optional): The value displayed in the input.
- `strokeColor` (String; optional): The value displayed in the input.
- `value` (Dict; optional): The value displayed in the input.
"""
function myauo_mydashmicrecordercomponent(; kwargs...)
        available_props = Symbol[:id, :audio, :backgroundColor, :record, :recorderParams, :strokeColor, :value]
        wild_props = Symbol[]
        return Component("myauo_mydashmicrecordercomponent", "MyDashMicRecorderComponent", "my_dash_mic_recorder_component", available_props, wild_props; kwargs...)
end

