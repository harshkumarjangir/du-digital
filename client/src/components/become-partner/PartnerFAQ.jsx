import { useState } from "react";

const PartnerFAQ = ({ data }) => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="bg-white py-24">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                {/* LEFT CONTENT */}
                <div>
                    <h2 className="text-4xl font-bold leading-tight mb-6">
                        Any questions? <br />
                        We got you.
                    </h2>

                    <p className="text-gray-500 max-w-md mb-6">
                        Yet bed any for assistance indulgence unpleasing. Not thoughts all
                        exercise blessing. Indulgence way everything joy alteration
                        boisterous the attachment.
                    </p>

                    <a
                        href="#"
                        className="inline-flex items-center text-[#FF1033] font-medium hover:underline"
                    >
                        More FAQs →
                    </a>
                </div>

                {/* RIGHT FAQ LIST */}
                <div className="divide-y">
                    {data.map((item, index) => (
                        <div key={index} className="py-6">
                            <button
                                onClick={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                                className="w-full flex justify-between items-center text-left"
                            >
                                <span className="text-lg font-semibold text-gray-900">
                                    {item.question}
                                </span>

                                <span className="text-2xl text-gray-500">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            {openIndex === index && (
                                <p className="mt-4 text-gray-500 max-w-xl">
                                    {item.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PartnerFAQ;











// import { useState } from "react";

// const PartnerFAQ = ({ data }) => {
//     const [open, setOpen] = useState(null);

//     const mid = Math.ceil(data.length / 2);
//     const leftItems = data.slice(0, mid);
//     const rightItems = data.slice(mid);

//     const renderItem = (item, index) => (
//         <div key={index} className="bg-white rounded shadow">
//             <button
//                 onClick={() => setOpen(open === index ? null : index)}
//                 className={`w-full text-left p-4 font-semibold flex justify-between items-center transition
//           ${open === index ? "bg-[#C62625] text-white" : "bg-[#F7F8F9] text-black"}`}
//             >
//                 {item.question}
//                 <span className="text-xl">{open === index ? "−" : "+"}</span>
//             </button>

//             {open === index && (
//                 <div className="p-4 text-gray-600 border-t">
//                     {item.answer}
//                 </div>
//             )}
//         </div>
//     );

//     return (
//         <section className="py-16 bg-white">
//             <h2 className="text-3xl font-bold text-center mb-10">
//                 Partner With Us For
//             </h2>

//             <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
//                 {/* LEFT COLUMN */}
//                 <div className="space-y-4">
//                     {leftItems.map((item, i) =>
//                         renderItem(item, i)
//                     )}
//                 </div>

//                 {/* RIGHT COLUMN */}
//                 <div className="space-y-4">
//                     {rightItems.map((item, i) =>
//                         renderItem(item, i + mid)
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default PartnerFAQ;







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
