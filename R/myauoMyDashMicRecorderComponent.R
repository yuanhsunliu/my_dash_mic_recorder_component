# AUTO GENERATED FILE - DO NOT EDIT

#' @export
myauoMyDashMicRecorderComponent <- function(id=NULL, audio=NULL, backgroundColor=NULL, record=NULL, recorderParams=NULL, strokeColor=NULL, value=NULL) {
    
    props <- list(id=id, audio=audio, backgroundColor=backgroundColor, record=record, recorderParams=recorderParams, strokeColor=strokeColor, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'MyDashMicRecorderComponent',
        namespace = 'my_dash_mic_recorder_component',
        propNames = c('id', 'audio', 'backgroundColor', 'record', 'recorderParams', 'strokeColor', 'value'),
        package = 'myDashMicRecorderComponent'
        )

    structure(component, class = c('dash_component', 'list'))
}
