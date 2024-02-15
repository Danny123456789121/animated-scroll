import React from "react";
import AnimationSection from "./AnimationSection.jsx";


const App = () => (
    <main>
        <AnimationSection frameCount={100} imagesPath={"images2/"} imageType={"jpg"}/>
        <div className="text">
            <h1> TEST</h1>
        </div>
        <AnimationSection frameCount={100} imagesPath={"images2/"} imageType={"jpg"}/>
        <div className="text">
            <h1> TEST</h1>
        </div>
    </main>
);
export default App;

