const OurFootprints = ({ data }) => {
    return (
        <section className="py-20 md:px-10 bg-[#F7F8F9] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* ===== Top Grid (Text + Video) ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT CONTENT */}
                    <div>
                        {/* Heading */}
                        <div className="relative mb-8 max-w-xl">
                            <h2 className="absolute -top-10 left-0 text-6xl md:text-7xl font-extrabold text-black/5 uppercase">
                                Footprints
                            </h2>

                            <h3 className="relative text-3xl md:text-4xl font-bold text-gray-900">
                                Our Footprints
                            </h3>

                            <div className="w-14 h-1 bg-red-600 mt-3" />
                        </div>

                        {/* Description */}
                        <div className="text-gray-700 space-y-4 leading-relaxed text-justify">
                            {data.description.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT VIDEO */}
                    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                        <iframe
                            className="w-full h-full"
                            src={data.video.youtubeId}
                            title="DU Digital Global"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>

                {/* ===== STATS (FULL WIDTH BELOW) ===== */}
                <div className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 text-center">

                        {data.stats.map((item, i) => (
                            <div
                                key={i}
                                className={`
                                    px-6 py-8
                                    ${i !== data.stats.length - 1 ? "md:border-r border-gray-400" : ""}
                                    max-md:border-b last:max-md:border-b-0
                                `}
                            >
                                <div className="flex justify-center items-end">
                                    <span className="text-4xl md:text-5xl font-bold text-red-600">
                                        {item.value}
                                    </span>
                                    <span className="text-3xl md:text-4xl font-bold text-red-600 ml-1">
                                        {item.suffix}
                                    </span>
                                </div>

                                {item.subValue && (
                                    <p className="text-sm font-semibold text-red-600 mt-1">
                                        {item.subValue}
                                    </p>
                                )}

                                <p className="mt-4 text-xl font-semibold text-gray-900">
                                    {item.label}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </section>
    );
};

export default OurFootprints;











// const OurFootprints = ({ data }) => {
//     return (
//         <section className="py-20 bg-[#F7F8F9]">
//             <div className="max-w-7xl mx-auto px-6">
//                 {/* Title */}
//                 <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//                     Our Footprints
//                 </h2>

//                 {/* Main Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

//                     {/* LEFT CONTENT */}
//                     <div>
//                         {/* Description */}
//                         <div className="text-gray-700 text-justify space-y-4 mb-12">
//                             {data.description.map((para, i) => (
//                                 <p key={i}>{para}</p>
//                             ))}
//                         </div>

//                         {/* Stats */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 text-center">
//                             {data.stats.map((item, i) => (
//                                 <div
//                                     key={i}
//                                     className="flex flex-col items-center py-6
//                       max-md:border-b-2 md:border-r-2
//                       max-md:last:border-b-transparent
//                       md:last:border-r-transparent"
//                                 >
//                                     <div className="flex items-end">
//                                         <span className="text-4xl font-bold text-red-600">
//                                             {item.value}
//                                         </span>
//                                         <span className="text-3xl font-bold text-red-600 ml-1">
//                                             {item.suffix}
//                                         </span>
//                                     </div>

//                                     {item.subValue && (
//                                         <p className="text-lg font-semibold text-red-600 mt-1">
//                                             {item.subValue}
//                                         </p>
//                                     )}

//                                     <p className="mt-3 text-lg font-medium text-gray-800">
//                                         {item.label}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* RIGHT VIDEO */}
//                     <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
//                         <iframe
//                             className="w-full h-full"
//                             src={data.video.youtubeId}
//                             title="DU Digital Global"
//                             frameBorder="0"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                         />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default OurFootprints;







// const OurFootprints = ({ data }) => {
//     return (
//         <section className="py-16 text-center">
//             <h2 className="text-3xl font-bold mb-6">Our Footprints</h2>
//             <p className="max-w-3xl mx-auto text-gray-600 mb-10">
//                 {data.description}
//             </p>

//             <div className="flex justify-center gap-10">
//                 {data.stats.map((item, i) => (
//                     <div key={i}>
//                         <p className="text-3xl font-bold text-red-600">{item.value}</p>
//                         <p className="text-gray-600">{item.label}</p>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default OurFootprints;
