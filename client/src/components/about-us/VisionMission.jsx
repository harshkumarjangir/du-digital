import { FaBinoculars, FaBullseye } from "react-icons/fa";

const VisionMission = ({ data }) => {
    return (
        <section className="relative md:px-10 py-20 bg-white overflow-hidden">
            {/* Faded Background Text */}
            <h2
                className="absolute inset-x-0 top-8 text-center 
        text-[90px] md:text-[120px] font-extrabold 
        text-gray-100 uppercase 
        pointer-events-none select-none text-nowrap px-0"
            >
                Vision & Mission
            </h2>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-14">
                    <h3 className="text-4xl font-bold text-gray-900">
                        {data.heading}
                    </h3>
                    <div className="w-16 h-1 bg-red-600 mx-auto mt-3"></div>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Vision */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <FaBinoculars className="text-4xl text-gray-800 mb-6" />

                        <h4 className="text-2xl font-bold mb-4">Vision</h4>
                        <p className="text-gray-600 leading-relaxed">
                            {data.vision}
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <FaBullseye className="text-4xl text-red-500 mb-6" />

                        <h4 className="text-2xl font-bold mb-4">Mission</h4>
                        <p className="text-gray-600 leading-relaxed">
                            {data.mission}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;








// import React from 'react';

// const VisionMission = ({ data }) => (
//     <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">

//         {/* Background Faded Text */}
//         <h2 className="absolute top-10 inset-x-0 flex justify-center items-center
//           text-[120px] md:text-[120px] font-extrabold
//           text-gray-100 pointer-events-none select-none">
//             {data.heading}
//         </h2>

//         {/* Top Label */}
//         <p className="text-center text-red-600 font-semibold tracking-widest mb-2">
//             {data.heading}
//         </p>
//         <div className="bg-white p-6 shadow rounded">
//             <h3 className="font-bold mb-2">Vision</h3>
//             <p>{data.vision}</p>
//         </div>
//         <div className="bg-white p-6 shadow rounded">
//             <h3 className="font-bold mb-2">Mission</h3>
//             <p>{data.mission}</p>
//         </div>
//     </section>
// );

// export default VisionMission;


