import { useState } from "react";

const PartnerFAQ = ({ data }) => {
    const [open, setOpen] = useState(null);

    const mid = Math.ceil(data.length / 2);
    const leftItems = data.slice(0, mid);
    const rightItems = data.slice(mid);

    const renderItem = (item, index) => (
        <div key={index} className="bg-white rounded shadow">
            <button
                onClick={() => setOpen(open === index ? null : index)}
                className={`w-full text-left p-4 font-semibold flex justify-between items-center transition
          ${open === index ? "bg-[#C62625] text-white" : "bg-[#F7F8F9] text-black"}`}
            >
                {item.question}
                <span className="text-xl">{open === index ? "−" : "+"}</span>
            </button>

            {open === index && (
                <div className="p-4 text-gray-600 border-t">
                    {item.answer}
                </div>
            )}
        </div>
    );

    return (
        <section className="py-16 bg-white">
            <h2 className="text-3xl font-bold text-center mb-10">
                Partner With Us For
            </h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                {/* LEFT COLUMN */}
                <div className="space-y-4">
                    {leftItems.map((item, i) =>
                        renderItem(item, i)
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-4">
                    {rightItems.map((item, i) =>
                        renderItem(item, i + mid)
                    )}
                </div>
            </div>
        </section>
    );
};

export default PartnerFAQ;







// import { useState } from "react";

// const PartnerFAQ = ({ data }) => {
//     const [open, setOpen] = useState(null);

//     return (
//         <section className="py-16 bg-gray-50">
//             <h2 className="text-3xl font-bold text-center mb-10">
//                 Partner With Us For
//             </h2>

//             <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0 px-6">
//                 {data.map((item, i) => (
//                     <div key={i} className="bg-white rounded shadow">
//                         <button
//                             onClick={() => setOpen(open === i ? null : i)}
//                             className={`w-full text-left p-4 font-semibold flex justify-between ${open === i ? 'bg-[#C62625] text-white' : ''}`}
//                         >
//                             {item.question}
//                             <span>{open === i ? "-" : "+"}</span>
//                         </button>

//                         {open === i && (
//                             <div className="p-4 text-gray-600 border-t">
//                                 {item.answer}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default PartnerFAQ;
