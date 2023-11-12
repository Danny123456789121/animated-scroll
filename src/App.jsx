import React, {useEffect, useRef, useState} from "react";

function getCurrentFrame(index) {
    return `src/images/${index.toString().padStart(4, "0")}.jpg`;
}

const ImageCanvas = ({ numFrames, width, height }) => {
    const canvasRef = useRef(null);
    const contentRef = useRef(null);
    const [images, setImages] = useState([]);
    const [frameIndex, setFrameIndex] = useState(0);

    function preloadImages() {
        for (let i = 1; i <= numFrames; i++) {
            const img = new Image();
            img.src = getCurrentFrame(i);
            setImages((prevImages) => [...prevImages, img]);
        }
    }

    const handleScroll = () => {
        const contentHeight = contentRef.current.offsetHeight;
        const scrollFraction = window.scrollY / (contentHeight - window.innerHeight);
        const index = Math.min(
            numFrames - 1,
            Math.ceil(scrollFraction * numFrames)
        );

        if (index <= 0 || index > numFrames) {
            return;
        }

        setFrameIndex(index);
    };

    const renderCanvas = () => {
        const context = canvasRef.current.getContext("2d");
        context.canvas.width = width;
        context.canvas.height = height;
    };

    useEffect(() => {
        preloadImages();
        renderCanvas();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [contentRef]);

    useEffect(() => {
        if (contentRef.current && images.length > 0) {
            const context = canvasRef.current.getContext("2d");
            context.drawImage(images[frameIndex], 0, 0);
        }
    }, [frameIndex, images]);

    return (
        <div ref={contentRef} className="content">
            <canvas ref={canvasRef} />
        </div>
    );
};

const App = () => (
    <main>
        <ImageCanvas
            width={1920}
            height={1080}
            numFrames={100}
        />
        <div className="content">
            <h1>Cras tincidunt lobortis</h1>
            <p>
                Gravida quis blandit turpis cursus in. Tellus in metus vulputate eu
                scelerisque felis. Sed vulputate mi sit amet mauris. Iaculis urna id
                volutpat lacus laoreet. Duis tristique sollicitudin nibh sit. Dui
                vivamus arcu felis bibendum ut tristique. Morbi tincidunt augue interdum
                velit. Diam phasellus vestibulum lorem sed risus ultricies tristique.
                Varius duis at consectetur lorem donec. Massa sed elementum tempus
                egestas sed. Tortor condimentum lacinia quis vel eros donec ac odio
                tempor. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus.
                Nunc aliquet bibendum enim facilisis. Volutpat sed cras ornare arcu dui
                vivamus arcu. Faucibus a pellentesque sit amet. Senectus et netus et
                malesuada fames ac turpis egestas integer. Bibendum at varius vel
                pharetra vel. Non enim praesent elementum facilisis leo. Pharetra diam
                sit amet nisl suscipit. Egestas erat imperdiet sed euismod.
            </p>
            <p>
                Tortor aliquam nulla facilisi cras fermentum odio eu feugiat.
                Suspendisse ultrices gravida dictum fusce ut placerat. Semper risus in
                hendrerit gravida rutrum quisque non tellus orci. Sed adipiscing diam
                donec adipiscing tristique risus nec feugiat. Ultrices tincidunt arcu
                non sodales neque sodales ut etiam sit. Vitae proin sagittis nisl
                rhoncus mattis rhoncus urna. Ut etiam sit amet nisl purus in mollis
                nunc. Suspendisse faucibus interdum posuere lorem. Mauris commodo quis
                imperdiet massa. Pretium vulputate sapien nec sagittis aliquam. Lorem
                ipsum dolor sit amet consectetur adipiscing elit pellentesque. Auctor eu
                augue ut lectus arcu bibendum at varius.
            </p>
            <p>
                Commodo viverra maecenas accumsan lacus. Diam vel quam elementum
                pulvinar etiam non. Turpis egestas integer eget aliquet nibh. Cras
                tincidunt lobortis feugiat vivamus at augue. Ornare aenean euismod
                elementum nisi quis. Aliquet enim tortor at auctor urna nunc id cursus.
                Etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Et
                odio pellentesque diam volutpat commodo. Euismod nisi porta lorem mollis
                aliquam ut porttitor leo a. Sollicitudin aliquam ultrices sagittis orci.
                Netus et malesuada fames ac turpis egestas maecenas pharetra convallis.
                Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Leo integer
                malesuada nunc vel risus commodo. Dapibus ultrices in iaculis nunc sed.
                Tellus pellentesque eu tincidunt tortor aliquam. Volutpat maecenas
                volutpat blandit aliquam etiam erat velit scelerisque.
            </p>
        </div>
    </main>
);
export default App;

