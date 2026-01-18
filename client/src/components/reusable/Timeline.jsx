import { useState, useEffect, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// CSS Imports
import "swiper/css";
import "swiper/css/navigation";

const TimelineSlider = ({ data = [] }) => {
    const [topSwiper, setTopSwiper] = useState(null);
    const [contentSwiper, setContentSwiper] = useState(null);

    // Refs for custom navigation buttons
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    // 1. DATA PROCESSING: Duplicate data to ensure smooth looping
    const processedData = useMemo(() => {
        if (!data.length) return [];
        let result = [...data];

        // We need at least 15 items for a smooth loop with slidesPerView={5}
        // This duplicates the array until it's long enough
        while (result.length < 15) {
            result = [...result, ...data];
        }
        return result;
    }, [data]);

    // Only loop if we actually have data
    const shouldLoop = processedData.length > 0;

    // 2. SYNC LOGIC: Link the two sliders
    useEffect(() => {
        if (topSwiper && contentSwiper) {
            topSwiper.controller.control = contentSwiper;
            contentSwiper.controller.control = topSwiper;
        }
    }, [topSwiper, contentSwiper]);

    if (!data.length) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-6">

                {/* --- TOP SECTION: TIMELINE & ARROWS --- */}
                <div className="relative mb-12 px-8">

                    {/* The Gray Horizontal Line */}
                    <div className="absolute top-[32px] left-0 right-0 h-[2px] bg-gray-200 z-0 mx-12" />

                    {/* Custom Previous Arrow */}
                    <button
                        ref={prevRef}
                        className="absolute left-0 top-[12px] z-20 text-[#FF1033] hover:scale-110 transition-transform disabled:opacity-30"
                    >
                        <ChevronLeft size={44} strokeWidth={2.5} />
                    </button>

                    {/* Custom Next Arrow */}
                    <button
                        ref={nextRef}
                        className="absolute right-0 top-[12px] z-20 text-[#FF1033] hover:scale-110 transition-transform disabled:opacity-30"
                    >
                        <ChevronRight size={44} strokeWidth={2.5} />
                    </button>

                    {/* Timeline Swiper */}
                    <Swiper
                        modules={[Navigation, Controller]}
                        onSwiper={setTopSwiper}
                        // Connect custom arrows
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        autoplay={{

                        delay: 4000,

                        disableOnInteraction: false,

                     }}
                        onBeforeInit={(swiper) => {
                            // Necessary for React to recognize refs immediately
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        loop={shouldLoop}
                        centeredSlides={true}
                        slidesPerView={5}
                        spaceBetween={0}
                        slideToClickedSlide={true} // Allows clicking a year to slide to it
                        className="timeline-swiper pt-2 pb-4"
                        breakpoints={{
                            0: { slidesPerView: 3 },
                            640: { slidesPerView: 5 },
                        }}
                    >
                        {processedData.map((item, index) => (
                            <SwiperSlide key={`${item._id || index}-top`}>
                                {({ isActive }) => (
                                  <>
                                        <div className="flex flex-col mt-5 items-center cursor-pointer relative z-10 group">
                                            {/* DOT */}
                                            <div
                                                className={`w-5 h-5 rounded-full border-[3px] transition-all duration-300 ease-out
                                            ${isActive
                                                        ? "bg-[#FF1033] border-[#FF1033] scale-125 shadow-lg shadow-red-200"
                                                        : "bg-white border-gray-300 scale-90 group-hover:border-gray-400"
                                                    }`}
                                            />

                                            {/* YEAR TEXT */}
                                            <span
                                                className={` text-lg font-bold transition-colors duration-300
                                            ${isActive ? "text-black" : "text-gray-300"}`}
                                            >
                                                {item.year}
                                            </span>
                                        </div>
                                        <div className="text-center max-w-3xl mx-auto">
                                        <div className="flex flex-col items-center px-4">

                                            {/* Big Year Heading */}
                                            <h2 className="text-6xl font-extrabold text-[#FF1033] mb-6 tracking-tight">
                                                {item.year}
                                            </h2>

                                            {/* Title (Optional, if your data has it) */}
                                            {/* <h3 className="text-2xl font-bold text-black mb-4">
                                    {item.title || "Milestone Achieved"}
                                </h3> */}

                                            {/* Description with Line Clamp (Limit to 2 lines) */}
                                            <p className="text-xl text-gray-700 font-medium mb-8 leading-relaxed line-clamp-2 text-ellipsis overflow-hidden h-[3.5rem]">
                                                {item.description}
                                            </p>

                                            {/* Logo Image */}
                                            {item.logo && (
                                                <div className="h-24 flex items-center justify-center">
                                                    <img
                                                        src={`${import.meta.env.VITE_BACKEND_IMAGES_URL}${item.logo}`}
                                                        alt={`${item.year} logo`}
                                                        className="h-full w-auto object-contain hover:scale-105 transition-transform"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        </div>
                                  </>

                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* --- BOTTOM SECTION: CONTENT --- */}
            

            </div>
        </section>
    );
};

export default TimelineSlider;