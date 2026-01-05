import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Testimonials = ({ data }) => {
    const [index, setIndex] = useState(0);

    const total = data.testimonials.length;

    const prev = () => {
        setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    };

    const next = () => {
        setIndex((prev) => (prev + 1) % total);
    };

    return (
        <section className="bg-[#FFF1D9] py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center">

                {/* Heading */}
                <p className="text-sm font-semibold tracking-widest text-gray-700">
                    TESTIMONIALS
                </p>

                <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-gray-900">
                    {data.title}
                </h2>

                <p className="mt-4 max-w-2xl mx-auto text-gray-700 leading-relaxed">
                    {data.subtitle}
                </p>

                <div className="mt-8">
                    <Link to={data.buttonLink} className="bg-[#FF1033] text-[#FFFDF5] px-6 py-3 rounded-full font-bold text-lg hover:bg-[#511313] hover:text-[#FF1033] transition-all duration-300">
                        {data.buttonText}
                    </Link>
                </div>

                {/* Slider */}
                <div className="relative mt-20 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            {[0, 1].map((offset) => {
                                const item = data.testimonials[(index + offset) % total];

                                return (
                                    <div
                                        key={offset}
                                        className={`${offset === 1 ? "hidden md:block" : ""
                                            } bg-[#FFFCF6] rounded-2xl p-8 text-left shadow-sm`}
                                    >
                                        <p className="text-gray-700 leading-relaxed">
                                            {item.message}
                                        </p>

                                        <div className="flex items-center gap-4 mt-8">
                                            {/* <div className="w-12 h-12 rounded-full bg-black" /> */}
                                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full bg-black" />
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {item.designation}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-16 px-2">
                    <button
                        onClick={prev}
                        className="text-red-600 hover:scale-110 transition"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <button
                        onClick={next}
                        className="text-red-600 hover:scale-110 transition"
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

