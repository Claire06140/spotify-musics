import React from "react"
import './Loading.css'

export default function Loading(){
    return(
        <div className="loading-container">
            <h3>...Loading tracks</h3>
            <div className="loader-container">
                <div className="spinner"></div>
            </div>
        </div>
    )
}