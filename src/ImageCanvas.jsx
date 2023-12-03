import React, {useEffect, useRef, useState} from "react";

function getCurrentFrame(index) {
    return `src/images2/${index.toString().padStart(4, "0")}.jpg`;
}

export const ImageCanvas = ({ numFrames, width, height }) => {
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

        console.log(scrollFraction)
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