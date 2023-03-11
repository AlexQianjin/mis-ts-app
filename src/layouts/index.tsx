import React from "react";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return (<div id='layout'>
        <header>
            <div>React Testing Demo</div>
        </header>
        <div>
            <Outlet />
        </div>
        <footer>
            Alex Qin
        </footer>
    </div>);
}
