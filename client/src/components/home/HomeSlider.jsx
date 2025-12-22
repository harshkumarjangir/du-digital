import { useEffect, useState } from "react";
import homeData from "../../data/homedata.json";

const HomeSlider = () => {
    const { slides, autoplay, interval } = homeData.slider;
    const [current, setCurrent] = useState(0);

    // Autoplay
    useEffect(() => {
        if (!autoplay) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, interval || 4000);

        return () => clearInterval(timer);
    }, [autoplay, interval, slides.length]);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    return (
        <section className="relative w-full h-[70vh] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Content */}
                    <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex items-center">
                        <div className="max-w-2xl text-white">
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                {slide.title}
                            </h1>
                            <p className="mt-4 text-lg text-gray-200">
                                {slide.description}
                            </p>
                            <a
                                href={slide.buttonLink}
                                className="inline-block mt-6 bg-white text-red-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
                            >
                                {slide.buttonText}
                            </a>
                        </div>
                    </div>
                </div>
            ))}

            {/* Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-white text-black p-3 rounded-full"
            >
                ‹
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-white text-black p-3 rounded-full"
            >
                ›
            </button>
        </section>
    );
};

export default HomeSlider;
