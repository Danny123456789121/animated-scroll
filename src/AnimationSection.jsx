import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimationSection = (props) => {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const textRef = useRef(null);
    const [currentFrame, _setCurrentFrame] = useState({ frame: 0 });
    const [images, setImages] = useState([]);
    const frameCount = props.frameCount;

    const currentFrameImage = (index) =>
        `${import.meta.env.BASE_URL}${props.imagesPath}${(index + 1)
            .toString()
            .padStart(4, "0")}.${props.imageType}`;

    // Load all images once after the first render and draw thumbnail
    useEffect(() => {
        const loadedImages = [];
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = 1920;
        canvas.height = 1080;

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.onload = () => {
                loadedImages[i] = img;
                if (i === 0) {
                    context.drawImage(img, 0, 0);
                }
                if (i === frameCount - 1) {
                    setImages(loadedImages);
                }
            };
            img.src = currentFrameImage(i);
        }
    }, []);

    useGSAP(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const render = () => {
            if (images[currentFrame.frame]) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(
                    images[currentFrame.frame],
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
            }
        };

        const tl = gsap.timeline({
            onUpdate: render,
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                scrub: 1,
                end: props.scrollingLength,
                markers: false,
            },
        });

        tl.fromTo(
            textRef.current,
            { opacity: 1 },
            { opacity: 0, duration: props.textFadeDuration || 0.3},
            0
        );

        tl.to(
            currentFrame,
            {
                frame: frameCount - 1,
                snap: "frame",
                ease: "none",
                duration: 1,
            },
            0
        );
    }, [frameCount, images]);

    return (
        <div ref={sectionRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas ref={canvasRef} style={{ width: "100%", height: "auto" }}></canvas>
            <div
                ref={textRef}
                style={{
                    fontFamily: "Arial",
                    position: "absolute",
                    top: "1em",
                    left: "2em",
                    fontSize: "4em",
                    color: "white",
                    whiteSpace: "nowrap",
                    backgroundColor: "transparent",
                    textShadow: "2px 2px 2px #CE5937",
                }}
            >
                {props.children}
            </div>
        </div>
    );
};

export default AnimationSection;
