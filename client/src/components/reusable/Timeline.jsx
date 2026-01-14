import { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const TimelineSlider = ({ data = [] }) => {
    const [topSwiper, setTopSwiper] = useState(null);
    const [contentSwiper, setContentSwiper] = useState(null);

    // Generate processed data for looping
    const processedData = useMemo(() => {
        if (!data.length) return [];
        // If we have fewer than 10 items (safe margin for slidesPerView=5 loop),
        // we duplicate the array until we have enough.
        let result = [...data];
        while (result.length < 12) {
            result = [...result, ...data];
        }
        return result;
    }, [data]);

    const shouldLoop = useMemo(() => processedData.length > 5, [processedData.length]);

    // Sync content swiper when top swiper changes
    useEffect(() => {
        if (!topSwiper || !contentSwiper) return;

        topSwiper.on("slideChange", () => {
            contentSwiper.slideToLoop(topSwiper.realIndex);
        });
    }, [topSwiper, contentSwiper]);

    if (!data.length) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">

                {/* TIMELINE */}
                <div className="relative mb-16">
                    <div className="absolute top-[8px] left-[2.5rem] right-[2.5rem] h-[2px] bg-gray-300" />

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        onSwiper={setTopSwiper}
                        navigation

                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        loop={shouldLoop}
                        centeredSlides
                        slidesPerView={5}
                        spaceBetween={0}
                        className="timeline-swiper"
                    >
                        {processedData.map((item, index) => (
                            <SwiperSlide key={`${item._id}-${index}`}>
                                {({ isActive }) => (
                                    <div
                                        onClick={() =>
                                            shouldLoop
                                                ? topSwiper.slideToLoop(index)
                                                : topSwiper.slideTo(index)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                shouldLoop
                                                    ? topSwiper.slideToLoop(index)
                                                    : topSwiper.slideTo(index);
                                            }
                                        }}
                                        role="button"
                                        tabIndex="0"
                                        aria-label={`View year ${item.year}`}
                                        className="flex flex-col items-center cursor-pointer relative"
                                    >
                                        <div
                                            className={`z-10 w-4 h-4 rounded-full border-2 transition-all duration-300
                                            ${isActive
                                                    ? "bg-[#FF1033] border-[#FF1033] scale-100"
                                                    : "bg-white border-gray-300 scale-95"
                                                }`}
                                        />
                                        <span
                                            className={`mt-3 font-semibold transition
                                            ${isActive ? "text-black" : "text-gray-400"}`}
                                        >
                                            {item.year}
                                        </span>
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* CONTENT (FOLLOWER ONLY) */}
                <Swiper
                    modules={[Controller]}
                    onSwiper={setContentSwiper}
                    slidesPerView={1}
                    allowTouchMove={false}
                    loop={shouldLoop}
                    className="text-center"
                >
                    {processedData.map((item, index) => (
                        <SwiperSlide key={`${item._id}-${index}`}>
                            <h2 className="text-5xl font-bold text-[#FF1033] mb-6">
                                {item.year}
                            </h2>

                            <p className="text-xl font-medium mb-6">
                                {item.description}
                            </p>

                            {item.logo && (
                                <div className="flex justify-center">
                                    <div className=" rounded-lg p-4">
                                        <img
                                            src={`${import.meta.env.VITE_BACKEND_IMAGES_URL}${item.logo}`}
                                            alt=""
                                            className="h-20 w-32 object-contain"
                                        //  className="h-16 w-auto object-contain rounded-sm"
                                        />
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
};

export default TimelineSlider;





// event and news and blog card to haev heading to show two lines adn rest ... n card



// import { useState, useMemo } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Controller } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const TimelineSlider = ({ data = [] }) => {
//     const [topSwiper, setTopSwiper] = useState(null);
//     const [contentSwiper, setContentSwiper] = useState(null);

//     const shouldLoop = useMemo(() => data.length > 5, [data.length]);

//     const syncToIndex = (index) => {
//         if (!topSwiper || !contentSwiper) return;

//         if (shouldLoop) {
//             topSwiper.slideToLoop(index);
//             contentSwiper.slideToLoop(index);
//         } else {
//             topSwiper.slideTo(index);
//             contentSwiper.slideTo(index);
//         }
//     };

//     const handleTopChange = (swiper) => {
//         if (!contentSwiper) return;
//         syncToIndex(swiper.realIndex);
//     };

//     if (!data.length) return null;

//     return (
//         <section className="py-20 bg-white">
//             <div className="max-w-4xl mx-auto px-6">

//                 {/* TIMELINE */}
//                 <div className="relative mb-16">
//                     <div className="absolute top-[8px] left-[2.5rem] right-[2.5rem] h-[2px] bg-gray-300" />

//                     <Swiper
//                         modules={[Navigation, Controller]}
//                         onSwiper={setTopSwiper}
//                         onSlideChange={handleTopChange}
//                         navigation
//                         loop={shouldLoop}
//                         centeredSlides
//                         slidesPerView={5}
//                         spaceBetween={0}
//                         className="timeline-swiper"
//                     >
//                         {data.map((item, index) => (
//                             <SwiperSlide key={item._id || index}>
//                                 {({ isActive }) => (
//                                     <div
//                                         onClick={() => syncToIndex(index)}
//                                         className="flex flex-col items-center cursor-pointer relative"
//                                     >
//                                         <div
//                                             className={`z-10 w-4 h-4 rounded-full border-2 transition-all duration-300
//                                             ${isActive
//                                                     ? "bg-[#FF1033] border-[#FF1033] scale-110"
//                                                     : "bg-white border-gray-300"
//                                                 }`}
//                                         />
//                                         <span
//                                             className={`mt-3 font-semibold transition
//                                             ${isActive ? "text-black" : "text-gray-400"}`}
//                                         >
//                                             {item.year}
//                                         </span>
//                                     </div>
//                                 )}
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>

//                 {/* CONTENT */}
//                 <Swiper
//                     modules={[Controller]}
//                     onSwiper={setContentSwiper}
//                     slidesPerView={1}
//                     allowTouchMove={false}
//                     loop={shouldLoop}
//                     className="text-center"
//                 >
//                     {data.map((item, index) => (
//                         <SwiperSlide key={item._id || index}>
//                             <h2 className="text-5xl font-bold text-[#FF1033] mb-6">
//                                 {item.year}
//                             </h2>

//                             <p className="text-xl font-medium mb-6">
//                                 {item.description}
//                             </p>

//                             {item.logo && (
//                                 <div className="flex justify-center">
//                                     <img
//                                         src={`${import.meta.env.VITE_BACKEND_IMAGES_URL}${item.logo}`}
//                                         alt=""
//                                         className="h-12 object-contain"
//                                     />
//                                 </div>
//                             )}
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//             </div>
//         </section>
//     );
// };

// export default TimelineSlider;




// import { useState, useMemo } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Controller } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const TimelineSlider = ({ data = [] }) => {
//     const [topSwiper, setTopSwiper] = useState(null);
//     const [contentSwiper, setContentSwiper] = useState(null);

//     // Enable loop ONLY if enough slides exist
//     const shouldLoop = useMemo(() => data.length > 5, [data.length]);

//     // Sync both swipers using REAL index (no clone mismatch)
//     const handleSlideChange = (swiper) => {
//         const realIndex = swiper.realIndex;

//         if (
//             contentSwiper &&
//             contentSwiper.realIndex !== realIndex
//         ) {
//             shouldLoop
//                 ? contentSwiper.slideToLoop(realIndex)
//                 : contentSwiper.slideTo(realIndex);
//         }
//     };

//     const handleYearClick = (index) => {
//         if (!topSwiper || !contentSwiper) return;

//         shouldLoop
//             ? topSwiper.slideToLoop(index)
//             : topSwiper.slideTo(index);

//         shouldLoop
//             ? contentSwiper.slideToLoop(index)
//             : contentSwiper.slideTo(index);
//     };

//     if (!data.length) return null;

//     return (
//         <section className="py-20 bg-white">
//             <div className="max-w-4xl mx-auto px-6">

//                 {/* TIMELINE */}
//                 <div className="relative mb-16">
//                     <div className="absolute top-[8px] left-[2.5rem] right-[2.5rem] h-[2px] bg-gray-300" />

//                     <Swiper
//                         modules={[Navigation, Controller]}
//                         onSwiper={setTopSwiper}
//                         onSlideChange={handleSlideChange}
//                         navigation
//                         loop={shouldLoop}
//                         spaceBetween={0}
//                         breakpoints={{
//                             0: { slidesPerView: 1 },
//                             480: { slidesPerView: 2 },
//                             768: { slidesPerView: 3 },
//                             1024: { slidesPerView: 5 },
//                         }}
//                         className="timeline-swiper"
//                     >
//                         {data.map((item, index) => (
//                             <SwiperSlide key={item._id || index}>
//                                 {({ isActive }) => (
//                                     <div
//                                         onClick={() => handleYearClick(index)}
//                                         className="flex flex-col items-center cursor-pointer relative"
//                                     >
//                                         <div
//                                             className={`z-10 w-4 h-4 rounded-full border-2 transition-all duration-300
//                                             ${isActive
//                                                     ? "bg-[#FF1033] border-[#FF1033] scale-100"
//                                                     : "bg-white border-gray-300 scale-95"
//                                                 }`}
//                                         />

//                                         <span
//                                             className={`mt-3 font-semibold transition
//                                             ${isActive ? "text-black" : "text-gray-400"}`}
//                                         >
//                                             {item.year}
//                                         </span>
//                                     </div>
//                                 )}
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>

//                 {/* CONTENT */}
//                 <Swiper
//                     modules={[Controller]}
//                     onSwiper={setContentSwiper}
//                     slidesPerView={1}
//                     allowTouchMove={false}
//                     loop={shouldLoop}
//                     className="text-center"
//                 >
//                     {data.map((item, index) => (
//                         <SwiperSlide key={item._id || index}>
//                             <h2 className="text-5xl font-bold text-[#FF1033] mb-6">
//                                 {item.year}
//                             </h2>

//                             <p className="text-xl font-medium mb-6">
//                                 {item.description}
//                             </p>

//                             {item.logo && (
//                                 <div className="flex justify-center">
//                                     <img
//                                         src={`${import.meta.env.VITE_BACKEND_IMAGES_URL}${item.logo}`}
//                                         alt=""
//                                         className="h-12 object-contain"
//                                     />
//                                 </div>
//                             )}
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>
//         </section>
//     );
// };

// export default TimelineSlider;





// import { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Controller } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const TimelineSlider = ({ data = [] }) => {
//     const [topSwiper, setTopSwiper] = useState(null);
//     const [contentSwiper, setContentSwiper] = useState(null);

//     // IMPORTANT: loop only when safe
//     const shouldLoop = data.length >= 10; // max slidesPerView = 5 → 5 * 2

//     const handleYearClick = (index) => {
//         if (!topSwiper || !contentSwiper) return;

//         if (shouldLoop) {
//             topSwiper.slideToLoop(index);
//             contentSwiper.slideToLoop(index);
//         } else {
//             topSwiper.slideTo(index);
//             contentSwiper.slideTo(index);
//         }
//     };

//     return (
//         <section className="py-20 bg-white">
//             <div className="max-w-4xl mx-auto px-6">

//                 {/* TIMELINE */}
//                 <div className="relative">
//                     {/* LINE — starts at first dot, ends at last dot */}
//                     <div className="absolute top-[8px] left-[2.5rem] right-[2.5rem] h-[2px] bg-gray-300" />

//                     <Swiper
//                         modules={[Navigation, Controller]}
//                         onSwiper={setTopSwiper}
//                         controller={{ control: contentSwiper }}
//                         navigation
//                         loop={shouldLoop}
//                         centeredSlides
//                         spaceBetween={0}
//                         breakpoints={{
//                             0: { slidesPerView: 1 },
//                             480: { slidesPerView: 2 },
//                             768: { slidesPerView: 3 },
//                             1024: { slidesPerView: 5 },
//                         }}
//                         className="mb-16 timeline-swiper"
//                     >
//                         {data.map((item, index) => (
//                             <SwiperSlide key={item._id}>
//                                 {({ isActive }) => (
//                                     <div
//                                         onClick={() => handleYearClick(index)}
//                                         className="flex flex-col items-center cursor-pointer"
//                                     >
//                                         {/* DOT */}
//                                         <div
//                                             className={`z-10 w-4 h-4 rounded-full border-2 transition-all ${isActive
//                                                 ? "bg-[#FF1033] border-[#FF1033]"
//                                                 : "bg-white border-gray-300"
//                                                 }`}
//                                         />

//                                         {/* YEAR */}
//                                         <span
//                                             className={`mt-3 font-semibold ${isActive ? "text-black" : "text-gray-400"
//                                                 }`}
//                                         >
//                                             {item.year}
//                                         </span>
//                                     </div>
//                                 )}
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>

//                 {/* CONTENT */}
//                 <Swiper
//                     modules={[Controller]}
//                     onSwiper={setContentSwiper}
//                     controller={{ control: topSwiper }}
//                     slidesPerView={1}
//                     allowTouchMove={false}
//                     loop={shouldLoop}
//                     className="text-center"
//                 >
//                     {data.map((item) => (
//                         <SwiperSlide key={item._id}>
//                             <h2 className="text-5xl font-bold text-[#FF1033] mb-6">
//                                 {item.year}
//                             </h2>

//                             <p className="text-xl font-medium mb-6">
//                                 {item.description}
//                             </p>

//                             {item.logo && (
//                                 <img
//                                     src={`${import.meta.env.VITE_BACKEND_IMAGES_URL}${item.logo}`}
//                                     alt=""
//                                     className="h-12 mx-auto object-contain"
//                                 />
//                             )}
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//             </div>
//         </section>
//     );
// };

// export default TimelineSlider;










// import { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Controller } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const TimelineSlider = ({ data }) => {
//     const [topSwiper, setTopSwiper] = useState(null);
//     const [contentSwiper, setContentSwiper] = useState(null);

//     const handleYearClick = (index) => {
//         if (topSwiper && contentSwiper) {
//             topSwiper.slideToLoop(index);
//             contentSwiper.slideToLoop(index);
//         }
//     };

//     return (
//         <section className="py-20 bg-white">
//             <div className="max-w-4xl mx-auto px-6">

//                 <div className="relative">
//                     {/* MAIN LINE */}
//                     {/* MAIN LINE – aligned to dots */}
//                     <div className="absolute top-[8px] left-[2.5rem] right-[2.5rem] h-[2px] bg-gray-300" />

//                     {/* <div className="absolute top-[8px] left-0 w-full h-[2px] bg-gray-300" /> */}

//                     <Swiper
//                         modules={[Navigation, Controller]}
//                         onSwiper={setTopSwiper}
//                         controller={{ control: contentSwiper }}
//                         navigation
//                         loop
//                         centeredSlides
//                         spaceBetween={0}
//                         breakpoints={{
//                             0: { slidesPerView: 1 },
//                             480: { slidesPerView: 2 },
//                             768: { slidesPerView: 3 },
//                             1024: { slidesPerView: 5 },
//                         }}
//                         className="mb-16 timeline-swiper"
//                     >
//                         {data.map((item, index) => (
//                             <SwiperSlide key={item._id || item.year || index}>
//                                 {({ isActive }) => (
//                                     <div
//                                         onClick={() => handleYearClick(index)}
//                                         className="flex flex-col items-center cursor-pointer relative"
//                                     >
//                                         {/* DOT */}
//                                         <div
//                                             className={`z-10 w-4 h-4 rounded-full border-2 transition-all duration-300 ${isActive
//                                                 ? "bg-[#FF1033] border-[#FF1033] scale-100"
//                                                 : "bg-white border-gray-300 scale-95"
//                                                 }`}
//                                         />

//                                         {/* YEAR */}
//                                         <span
//                                             className={`mt-3 font-semibold transition ${isActive ? "text-black" : "text-gray-400"
//                                                 }`}
//                                         >
//                                             {item.year}
//                                         </span>
//                                     </div>
//                                 )}
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>


//                 {/* CONTENT SLIDER */}
//                 <Swiper
//                     modules={[Controller]}
//                     onSwiper={setContentSwiper}
//                     controller={{ control: topSwiper }}
//                     slidesPerView={1}
//                     allowTouchMove={false}
//                     loop
//                     className="text-center"
//                 >
//                     {data.map((item, index) => (
//                         <SwiperSlide key={item._id || item.year || index}>
//                             <h2 className="text-5xl font-bold text-[#FF1033] mb-6">
//                                 {item.year}
//                             </h2>

//                             <p className="text-xl font-medium mb-2">
//                                 {item.title || item.description}
//                             </p>

//                             {item.subtitle && (
//                                 <p className="text-gray-600 max-w-2xl mx-auto">
//                                     {item.subtitle}
//                                 </p>
//                             )}

//                             <img
//                                 src={`${import.meta.env.VITE_BACKEND_IMAGES_URL}${item.logo}`}
//                                 alt=""
//                                 className="h-12 object-contain"
//                             />

//                             {/* FLAGS / LOGOS */}
//                             {/* <div className="flex justify-center gap-6 mt-10 flex-wrap">
//                                 {item.flags ? (
//                                     item.flags.map((flag, i) => (
//                                         <img
//                                             key={i}
//                                             src={flag}
//                                             alt=""
//                                             className="h-12 object-contain"
//                                         />
//                                     ))
//                                 ) : item.logo ? (
//                                     <img
//                                         src={`${import.meta.env.VITE_BACKEND_IMAGES_URL}${item.logo}`}
//                                         alt=""
//                                         className="h-12 object-contain"
//                                     />
//                                 ) : null}
//                             </div> */}

//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//             </div>
//         </section>
//     );
// };

// export default TimelineSlider;

