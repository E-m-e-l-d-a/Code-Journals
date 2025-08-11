import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(){
    return (
        <div className="divcont flex-center text-center text-[#2D336B]">
            <div className="flex-col">
          <h1 className="m-10">404 - Page Not Found</h1>
          <p>The page you are looking for does not exist. click the button below to go back to the Homepage.</p>
          <Link to="/" className="mailink mt-10">Go to Homepage</Link>
        </div>
        </div>
    )
}