import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const TimelineSlider = ({ data }) => {
    const [topSwiper, setTopSwiper] = useState(null);
    const [contentSwiper, setContentSwiper] = useState(null);

    const handleYearClick = (index) => {
        if (topSwiper && contentSwiper) {
            topSwiper.slideToLoop(index);
            contentSwiper.slideToLoop(index);
        }
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">

                <div className="relative">
                    {/* MAIN LINE */}
                    {/* MAIN LINE – aligned to dots */}
                    <div className="absolute top-[8px] left-[2.5rem] right-[2.5rem] h-[2px] bg-gray-300" />

                    {/* <div className="absolute top-[8px] left-0 w-full h-[2px] bg-gray-300" /> */}

                    <Swiper
                        modules={[Navigation, Controller]}
                        onSwiper={setTopSwiper}
                        controller={{ control: contentSwiper }}
                        navigation
                        loop
                        centeredSlides
                        spaceBetween={0}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            480: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 5 },
                        }}
                        className="mb-16 timeline-swiper"
                    >
                        {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                {({ isActive }) => (
                                    <div
                                        onClick={() => handleYearClick(index)}
                                        className="flex flex-col items-center cursor-pointer relative"
                                    >
                                        {/* DOT */}
                                        <div
                                            className={`z-10 w-4 h-4 rounded-full border-2 transition-all duration-300 ${isActive
                                                ? "bg-red-600 border-red-600 scale-100"
                                                : "bg-white border-gray-300 scale-95"
                                                }`}
                                        />

                                        {/* YEAR */}
                                        <span
                                            className={`mt-3 font-semibold transition ${isActive ? "text-black" : "text-gray-400"
                                                }`}
                                        >
                                            {item.year}
                                        </span>
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


                {/* CONTENT SLIDER */}
                <Swiper
                    modules={[Controller]}
                    onSwiper={setContentSwiper}
                    controller={{ control: topSwiper }}
                    slidesPerView={1}
                    allowTouchMove={false}
                    loop
                    className="text-center"
                >
                    {data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <h2 className="text-5xl font-bold text-red-600 mb-6">
                                {item.year}
                            </h2>

                            <p className="text-xl font-medium mb-2">
                                {item.title}
                            </p>

                            <p className="text-gray-600 max-w-2xl mx-auto">
                                {item.subtitle}
                            </p>

                            {/* FLAGS / LOGOS */}
                            <div className="flex justify-center gap-6 mt-10 flex-wrap">
                                {item.flags?.map((flag, i) => (
                                    <img
                                        key={i}
                                        src={flag}
                                        alt=""
                                        className="h-12 object-contain"
                                    />
                                ))}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
};

export default TimelineSlider;













// import { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Controller } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const TimelineSlider = ({ data }) => {
//     const [topSwiper, setTopSwiper] = useState(null);
//     const [contentSwiper, setContentSwiper] = useState(null);

//     return (
//         <section className="py-20 bg-white">
//             <div className="max-w-6xl mx-auto px-6">

//                 {/* TOP TIMELINE */}
//                 <Swiper
//                     modules={[Navigation, Controller]}
//                     onSwiper={setTopSwiper}
//                     controller={{ control: contentSwiper }}
//                     slidesPerView={5}
//                     centeredSlides
//                     navigation
//                     className="mb-16"
//                 >
//                     {data.map((item, index) => (
//                         <SwiperSlide key={index}>
//                             {({ isActive }) => (
//                                 <div className="relative flex flex-col items-center">

//                                     {/* Horizontal Line */}
//                                     <div className="absolute top-2 left-[-50%] w-full h-[2px] bg-gray-300" />

//                                     {/* Dot */}
//                                     <div
//                                         className={`z-10 w-4 h-4 rounded-full border-2 ${isActive
//                                             ? "bg-red-600 border-red-600"
//                                             : "bg-white border-gray-300"
//                                             }`}
//                                     />

//                                     {/* Year */}
//                                     <span
//                                         className={`mt-3 font-semibold ${isActive ? "text-black" : "text-gray-400"
//                                             }`}
//                                     >
//                                         {item.year}
//                                     </span>
//                                 </div>
//                             )}
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//                 {/* CONTENT */}
//                 <Swiper
//                     modules={[Controller]}
//                     onSwiper={setContentSwiper}
//                     controller={{ control: topSwiper }}
//                     slidesPerView={1}
//                     allowTouchMove={false}
//                     className="text-center"
//                 >
//                     {data.map((item, index) => (
//                         <SwiperSlide key={index}>
//                             <h2 className="text-5xl font-bold text-red-600 mb-6">
//                                 {item.year}
//                             </h2>

//                             <p className="text-xl font-medium mb-2">
//                                 {item.title}
//                             </p>

//                             <p className="text-gray-600 max-w-2xl mx-auto">
//                                 {item.subtitle}
//                             </p>

//                             {/* FLAGS / LOGOS */}
//                             <div className="flex justify-center gap-6 mt-10 flex-wrap">
//                                 {item.flags?.map((flag, i) => (
//                                     <img
//                                         key={i}
//                                         src={flag}
//                                         alt=""
//                                         className="h-12 object-contain"
//                                     />
//                                 ))}
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//             </div>
//         </section>
//     );
// };

// export default TimelineSlider;







// const Timeline = ({ data }) => (
//     <section className="py-16 text-center">
//         <h3 className="text-red-600 font-bold">{data.year}</h3>
//         <p className="font-semibold mt-2">{data.title}</p>
//         <p className="text-gray-600">{data.subtitle}</p>
//         <img src={data.flag} alt="" className="mx-auto mt-4 h-8" />
//     </section>
// );

// export default Timeline;
