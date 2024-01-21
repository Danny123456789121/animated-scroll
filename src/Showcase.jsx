// Showcase.js
import React, { useEffect, useRef, useState } from 'react';
import './Showcase.css'; // Import your CSS file

const Showcase = () => {
    const htmlRef = useRef(null);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const imgRef = useRef(new Image());
    const [showText, setShowText] = useState(false);
    const [textOpacity, setTextOpacity] = useState(0);

    const frameCount = 100;
    let frameStart = 1;

    const currentFrame = (index) => `${import.meta.env.BASE_URL}/images2/${index.toString().padStart(4, '0')}.jpg`;

    const preloadImages = () => {
        for (let i = frameStart; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
        }
    };

    const updateImage = (index) => {
        imgRef.current.src = currentFrame(index);
        contextRef.current.drawImage(imgRef.current, 0, 0);

        // Check if it's the last frame and show text
        if (index === frameCount - 1) {
            const scrollFraction = window.scrollY / (htmlRef.current.scrollHeight - window.innerHeight);
            const opacity = Math.min(1, scrollFraction * 2);
            setTextOpacity(opacity);
            setShowText(opacity > 0); // Show text only if opacity is greater than 0
        } else {
            setShowText(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScrollTop = htmlRef.current.scrollHeight - window.innerHeight;
            const scrollFraction = scrollTop / maxScrollTop;

            const frameIndex = Math.round(scrollFraction * (frameCount - 1));

            requestAnimationFrame(() => updateImage(frameIndex + frameStart));
        };

        htmlRef.current = document.documentElement;
        canvasRef.current = document.getElementById('hero-lightpass');
        contextRef.current = canvasRef.current.getContext('2d');
        imgRef.current.src = currentFrame(frameStart);
        canvasRef.current.width = 1920;
        canvasRef.current.height = 1080;

        imgRef.current.onload = () => {
            contextRef.current.drawImage(imgRef.current, 0, 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        preloadImages();
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <canvas id="hero-lightpass" ref={canvasRef}></canvas>
            {showText && (
                <p
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        position: 'absolute',
                        bottom: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        opacity: textOpacity,
                        transition: 'opacity 0.5s ease',
                    }}
                >
                    This is the last image!
                </p>
            )}
        </div>
    );
};

export default Showcase;
