import React, { useEffect, useState } from "react";
import '../stylesheet/homepage.css';
import { MainApps } from "./mainapps/mainapps";

export function PageBody() {

    return (
        <div id="pageBodyContainer">
            <MainApps />
            <div className="sideApps">Others</div>
        </div>
    )
}