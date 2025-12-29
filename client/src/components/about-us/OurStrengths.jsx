import {
    FaCogs,
    FaUserCheck,
    FaGem,
    FaGlobe,
    FaMoneyBillWave,
    FaHandshake
} from "react-icons/fa";

const iconMap = {
    process: FaCogs,
    customer: FaUserCheck,
    value: FaGem,
    network: FaGlobe,
    cost: FaMoneyBillWave,
    trust: FaHandshake
};

const OurStrengths = ({ data }) => {
    return (
        <section className="py-20 bg-black text-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Heading */}
                <h2 className="text-4xl font-bold text-center mb-14">
                    {data.heading}
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.items.map((item, i) => {
                        const Icon = iconMap[item.icon];

                        return (
                            <div
                                key={i}
                                className="
                  bg-white text-gray-800 
                  rounded-xl p-8 
                  border-l-4 border-red-600
                  shadow-lg hover:shadow-xl 
                  transition
                "
                            >
                                {/* Icon */}
                                <Icon className="text-red-600 text-4xl mb-4" />

                                {/* Title */}
                                <h4 className="text-xl font-bold mb-4 leading-snug">
                                    {item.title}
                                </h4>

                                {/* Description */}
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OurStrengths;















// const OurStrengths = ({ data }) => (
//     <section className="py-16 bg-black text-white">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">
//             {data.map((item, i) => (
//                 <div key={i} className="bg-gray-900 p-6 rounded border border-red-600">
//                     <h4 className="font-semibold mb-2">{item.title}</h4>
//                     <p className="text-gray-300">{item.description}</p>
//                 </div>
//             ))}
//         </div>
//     </section>
// );

// export default OurStrengths;
