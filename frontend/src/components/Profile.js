import React from "react"
import ViewProfile from "./ViewProfile"
export default function Profile(props) {
    console.log(props.user)
    return (
        <div>
            {
                props.user ?
                    <ViewProfile />
                    :
                    <div>
                    </div>
            }

        </div>
    )
}