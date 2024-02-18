
module MyDashMicRecorderComponent
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.1"

include("jl/myauo_mydashmicrecordercomponent.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "my_dash_mic_recorder_component",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "async-MyDashMicRecorderComponent.js",
    external_url = "https://unpkg.com/my_dash_mic_recorder_component@0.0.1/my_dash_mic_recorder_component/async-MyDashMicRecorderComponent.js",
    dynamic = nothing,
    async = :true,
    type = :js
),
DashBase.Resource(
    relative_package_path = "async-MyDashMicRecorderComponent.js.map",
    external_url = "https://unpkg.com/my_dash_mic_recorder_component@0.0.1/my_dash_mic_recorder_component/async-MyDashMicRecorderComponent.js.map",
    dynamic = true,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "my_dash_mic_recorder_component.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "my_dash_mic_recorder_component.min.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
