import base64

import dash
import dash_mantine_components as dmc
import dash_bootstrap_components as dbc
from dash.exceptions import PreventUpdate
import numpy as np
import io
import soundfile as sf

import my_dash_mic_recorder_component
from dash import Dash, callback, html, Input, Output, State

app = Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP, dbc.icons.FONT_AWESOME])

roundbutton = {
    "border": None,
    "borderRadius": "50%",
    "padding": 0,
    "backgroundColor": "#818181",
    "color": "white",
    "textAlign": "center",
    "display": "block",
    "fontSize": 20,
    "height": 40,
    "width": 40,
    "margin": 20,
}


app.layout = html.Div([
    dmc.Card(
        children=[
            dmc.CardSection([
                dmc.Text(
                    "Stop",
                    color="red",
                    id="status-show",
                    className='d-flex justify-content-center blink_me fw-bolder fs-4',
                    style={
                        "position": "relative",
                        "top": "15px"
                    }
                ),
                my_dash_mic_recorder_component.MyDashMicRecorderComponent(
                    id='input',
                    record=False,
                    strokeColor='#096EB0',
                    backgroundColor='#333333',
                    recorderParams={
                        'echoCancellation': True,
                        'autoGainControl': True,
                        'noiseSuppression': True,
                        'channelCount': 1
                    }
                ),
            ]),
            html.Div(
                children=
                [
                    html.Div(" ", style={
                        "width": "80px"
                    }),
                    dmc.Button(
                        children=[
                            html.I(
                                id='mic-icon',
                                className="fa-solid fa-microphone",
                                style={
                                    "fontSize": '28px',
                                    "marginLeft": "3px",
                                    "color": "#FFFFFF"
                                }
                            )
                        ],
                        id="on-off-toggle",
                        n_clicks=0,
                        style=roundbutton),
                    dmc.Button(
                        children=[
                            html.I(
                                id='wave-save-icon',
                                className="fas fa-save",
                                style={
                                    "fontSize": '28px',
                                    "marginLeft": "3px",
                                    "color": "#FFFFFF"
                                }
                            )
                        ],
                        id="save-toggle",
                        n_clicks=0,
                        style=roundbutton)
                ],
                className="mb-1 d-flex justify-content-between",
                style={
                    "position": "relative",
                    "top": "-20px"
                }
            ),
            dmc.CardSection(
                children=[
                    html.Audio(id='audio-player', controls=True, hidden=True),
                ],
                className='d-flex justify-content-center mb-1',
                style={
                    "position": "relative",
                    "top": "-20px"
                }
            ),
        ],
        shadow="xs",
        withBorder=True,
        radius="md",
        style={
            "width": 550,
            "height": 280,
            "backgroundColor": "#333333"
        }
    )
])


@callback(Output('status-show', 'children', allow_duplicate=True),
          Output('audio-player', 'src'),
          Input('save-toggle', 'n_clicks'),
          State('input', 'audio'),
          prevent_initial_call=True
          )
def save_audio(n_clicks, audio):
    try:
        with open('tests/my.wav', mode='wb+') as f:
            f.write(base64.b64decode(audio['base64']))

        with open('tests/my.wav', "rb") as f:
            encoded_content = (base64.b64encode(f.read())).decode('ascii')

        audio_src = f"data:audio/wav;base64,{audio['base64']}"
        return "saved audio", audio_src
    except Exception as e:
        print(e)


@callback(Output('status-show', 'children', allow_duplicate=True),
          Input('input', 'audio'),
          prevent_initial_call=True
          )
def get_voice(audio):
    # global audio_samples
    # audio_samples = list(audio.values())
    # audio_array = np.array(audio_samples)

    # try:
    #     # with sf.SoundFile('tests/my.wav', mode='w+', samplerate=16000, channels=1) as wfile:
    #     #     wfile.seek(0, sf.SEEK_END)
    #     #     wfile.write(audio_array)
    #     # audio_array.astype(np.float32).tofile("tests/my.wav")
    # except Exception as e:
    #     print(e)
    return "receive audio"


@callback(Output('status-show', 'children'),
          Output('input', 'record'),
          Output('audio-player', 'hidden'),
          Output('audio-player', 'src', allow_duplicate=True),
          Output('on-off-toggle', 'n_clicks'),
          Output('mic-icon', 'style'),
          Output('mic-icon', 'className'),
          Input('on-off-toggle', 'n_clicks'),
          Input('input', 'value'),
          prevent_initial_call=True
          )
def switch_recorder(n_clicks, audio):
    # print('switch_recorder', audio)
    mic_style = {
        "fontSize": '36px',
        "marginLeft": "3px",
        "color": "#FFFFFF"
    }
    if n_clicks == 1:
        mic_style['color'] = "#F83B19"
        return 'Recording', True, True, None, 1, mic_style, "fa-solid fa-microphone"
    elif n_clicks in [0, 2]:
        mic_style['color'] = "#FFFFFF"
        a_src = None
        if audio:
            a_src = audio['blobURL']
        else:
            a_src = dash.no_update
        return 'Stop', False, False, a_src, 0, mic_style, "fa-solid fa-microphone"
    else:
        raise PreventUpdate


if __name__ == '__main__':
    app.run_server(debug=True)
