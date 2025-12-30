const TeamGrid = ({ title, data }) => {
    if (!data || data.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
                {data.map((member, i) => (
                    <div
                        key={member._id || i}
                        className="group relative bg-gradient-to-b from-[#F9E9E9] to-[#F9E9E9]/50 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                    >
                        {/* RED TOP BAR */}
                        {/* <div className="h-1 bg-red-600"></div> */}

                        {/* IMAGE */}
                        <div className="relative">
                            <img
                                src={
                                    member.profileImage ||
                                    member.image ||
                                    "https://dudigitalglobal.com/wp-content/uploads/2024/11/Aditya-Sanghi-1.png"
                                }
                                alt={member.name}
                                className="w-full h-[280px] object-cover transition duration-300 group-hover:scale-105"
                            />

                            {/* SLIDE-UP OVERLAY */}
                            <div
                                className="absolute inset-0 bg-[#FFFFFF] translate-y-full group-hover:translate-y-10 z-0 transition-all duration-500 ease-out flex flex-col
                "
                            >
                                <div className="p-4 text-black text-sm overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
                                    <ul className="list-disc pl-5 space-y-2">
                                        {member.description
                                            ?.split("\n")
                                            .map((point, idx) => (
                                                <li key={idx}>{point}</li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* NAME & DESIGNATION */}
                        <div className="p-4 text-center bg-white border-t-4 border-red-600 w-[80%] mx-auto relative z-10">
                            <h4 className="font-semibold text-gray-900">
                                {member.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                                {member.designation}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeamGrid;








// const TeamGrid = ({ title, data }) => {
//     if (!data || data.length === 0) {
//         return null;
//     }

//     return (
//         <section className="py-16 bg-gray-50">
//             <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
//             <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
//                 {data.map((member, i) => (
//                     <div key={member._id || i} className="text-center bg-white p-4 rounded shadow">
//                         <img
//                             src={member.profileImage || member.image}
//                             alt={member.name}
//                             className="mx-auto rounded mb-3 w-full h-auto object-cover"
//                         />
//                         <h4 className="font-semibold">{member.name}</h4>
//                         <p className="text-sm text-gray-500">{member.designation}</p>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default TeamGrid;
