# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class MyDashMicRecorderComponent(Component):
    """A MyDashMicRecorderComponent component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- audio (dict; optional):
    The value displayed in the input.

- backgroundColor (string; optional):
    The value displayed in the input.

- record (boolean; optional):
    The value displayed in the input.

- recorderParams (dict; optional):
    The value displayed in the input.

- strokeColor (string; optional):
    The value displayed in the input.

- value (dict; optional):
    The value displayed in the input."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'my_dash_mic_recorder_component'
    _type = 'MyDashMicRecorderComponent'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, value=Component.UNDEFINED, audio=Component.UNDEFINED, record=Component.UNDEFINED, backgroundColor=Component.UNDEFINED, strokeColor=Component.UNDEFINED, recorderParams=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'audio', 'backgroundColor', 'record', 'recorderParams', 'strokeColor', 'value']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'audio', 'backgroundColor', 'record', 'recorderParams', 'strokeColor', 'value']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(MyDashMicRecorderComponent, self).__init__(**args)
