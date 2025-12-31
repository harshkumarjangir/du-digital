import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { groupByYear } from "../../utils/groupByYear";
// import { groupByYear } from "../utils/groupByYear";

const NewsCoverage = ({ data }) => {
    const grouped = groupByYear(data);
    const years = Object.keys(grouped).sort((a, b) => b - a);
    const [openYear, setOpenYear] = useState(years[0]);

    return (
        <div className="max-w-6xl mx-auto px-6 md:px-12">
            {years.map((year) => (
                <div key={year} className="border-b">
                    {/* YEAR HEADER */}
                    <button
                        onClick={() =>
                            setOpenYear(openYear === year ? null : year)
                        }
                        className="w-full flex justify-between items-center py-5 text-[#C62625] text-lg font-semibold"
                    >
                        <span className="text-black">{year}</span>
                        {openYear === year ? <ChevronUp /> : <ChevronDown />}
                    </button>

                    {/* NEWS LIST */}
                    {openYear === year && (
                        <div className="space-y-6 pb-6">
                            {grouped[year].map((item) => (
                                <a
                                    key={item._id}
                                    href={item.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex flex-col sm:flex-row gap-6 group"
                                >
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND_IMAGES_URL}${item.imageUrl}`}
                                        // src={item.imageUrl}
                                        alt={item.title}
                                        className="w-auto h-40 object-cover rounded-xl"
                                    />

                                    <div>
                                        <div className="flex justify-between">
                                            <p className="text-sm text-red-600 mb-1">
                                                ANI News
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(item.datePublished).toLocaleDateString(
                                                    "en-IN",
                                                    { month: "long", year: "numeric" }
                                                )}
                                            </p>
                                        </div>
                                        <h4 className="font-semibold group-hover:text-red-600 mt-4">
                                            {item.title}
                                        </h4>
                                        {/* <p className="text-sm text-gray-500">
                                            {new Date(item.datePublished).toLocaleDateString(
                                                "en-IN",
                                                { month: "long", year: "numeric" }
                                            )}
                                        </p> */}
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NewsCoverage;
