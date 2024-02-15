import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimationSection = (props) => {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const [currentFrame, _setCurrentFrame] = useState({ frame: 0 });
    const [images, setImages] = useState([]);
    const frameCount = props.frameCount;

    const currentFrameImage = (index) => `${import.meta.env.BASE_URL}${props.imagesPath}${(index+1).toString().padStart(4, '0')}.${props.imageType}`;

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
        console.log(currentFrame.frame)

        const render = () => {
            if (images[currentFrame.frame]) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(images[currentFrame.frame], 0, 0);
            }
        };

        gsap.timeline({
            onUpdate: render,
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                scrub: 0.5,
                end: "+=1000",
                markers: true,
            },
        })
            .to(
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
        <div ref={sectionRef}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default AnimationSection;