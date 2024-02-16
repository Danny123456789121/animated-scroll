import React from "react";
import AnimationSection from "./AnimationSection.jsx";


const App = () => (
    <main>
        <AnimationSection frameCount={100} imagesPath={"images/car_1/"} imageType={"png"} scrollingLength={"+=5000"}>
            Airtsel Valor Proiettile
        </AnimationSection>

        <div className="text">
            <h2>Introducing the Airtsel Valor Proiettile, a quintessential icon of 1960s automotive excellence. With its sleek design and unparalleled performance, this sport car exemplifies the epitome of speed and style.</h2>
        </div>

        <AnimationSection frameCount={51} imagesPath={"images/car_2/"} imageType={"png"} scrollingLength={"+=5000"}>
            Interior Design
        </AnimationSection>

        <div className="text">
            <h2>Step into the Airtsel Valor Proiettile and experience its Old Leather brownisch classic interior—a blend of timeless charm and refined luxury. Sink into plush leather seats, adorned with meticulous stitching and rich, warm tones. Polished wood accents and chrome embellishments on the dashboard evoke a sense of nostalgia, while the vintage-inspired steering wheel offers both tactile feedback and precision. Whether cruising the streets or hitting the track, this interior ensures every journey is a memorable one.</h2>
        </div>

        <AnimationSection frameCount={51} imagesPath={"images/car_3/"} imageType={"png"} scrollingLength={"+=5000"} textFadeDuration={0.1}>
            Horse Power
        </AnimationSection>

        <div className="text">
            <h2>The heart of the Airtsel Valor Proiettile beats with relentless power and precision, thanks to its formidable motor. Nestled beneath the hood lies a robust 5.4-liter engine, meticulously engineered to deliver a jaw-dropping 380 brake horsepower.</h2>
            <h2>This powerhouse propels the Airtsel Valor Proiettile to exhilarating speeds, effortlessly reaching a top velocity of 285 km/h. With a weight of just 885 kg, the car's power-to-weight ratio is finely tuned for maximum performance, ensuring lightning-quick acceleration and razor-sharp responsiveness. </h2>
            <h1>Thank you!</h1>
        </div>
    </main>
);
export default App;

