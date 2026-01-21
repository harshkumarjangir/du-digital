import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronUp, MoveRight } from "lucide-react";
import { groupByYear } from "../../utils/groupByYear";
import { fetchNews } from '../../redux/slices/newsSlice';

const NewsCoverage = ({ data: propData }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const { news: reduxData, totalPages, loading, error } = useSelector((state) => state.news);
    const data = propData || reduxData;

    useEffect(() => {
        if (!propData) {
            dispatch(fetchNews({ page }));
        }
    }, [dispatch, page, propData]);

    const grouped = groupByYear(data || []);
    const years = Object.keys(grouped).sort((a, b) => b - a);
    const [openYear, setOpenYear] = useState(years[0]);

    return (
        <div className="max-w-6xl mx-auto px-6 md:px-12">
            {loading && !propData && <div className="text-center">Loading...</div>}
            {error && !propData && <div className="text-center text-[#FF1033]">Error: {error}</div>}

            {years.map((year) => (
                <div key={year} className="border-b">
                    {/* YEAR HEADER */}
                    <button
                        onClick={() =>
                            setOpenYear(openYear === year ? null : year)
                        }
                        aria-expanded={openYear === year}
                        aria-controls={`year-content-${year}`}
                        className="w-full flex justify-between items-center py-5 text-[#C62625] text-lg font-semibold"
                    >
                        <span className="text-black">{year}</span>
                        {openYear === year ? <ChevronUp /> : <ChevronDown />}
                    </button>

                    {/* NEWS LIST */}
                    {openYear === year && (
                        <div id={`year-content-${year}`} className="space-y-6 pb-6">
                            {grouped[year].map((item) => (
                                <a
                                    key={item._id}
                                    href={item.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex flex-col sm:flex-row gap-6 group relative"
                                >
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND_IMAGES_URL}${item.imageUrl}`}
                                        // src={item.imageUrl}
                                        alt={item.title}
                                        className="w-[300px] h-[200px] object-cover rounded-xl"
                                    />

                                    <div className=" relative w-full">
                                        <div className="flex justify-between ">
                                            <p className="text-sm text-[#FF1033] mb-1">
                                                ANI News
                                            </p>
                                            <p className="text-sm text-gray-500 absolute right-2 top-0">
                                                {new Date(item.datePublished).toLocaleDateString(
                                                    "en-IN",
                                                    { month: "long", year: "numeric" }
                                                )}
                                            </p>
                                        </div>
                                        <h4 className="font-semibold w-1/2 group-hover:text-[#FF1033] mt-4">
                                            {item.title}
                                        </h4>

                                        <a
                                            key={item._id}
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex absolute bottom-0 right-0 flex-col sm:flex-row gap-2 text-[#FF1033]"
                                        >
                                            Read More <MoveRight/>
                                            </a>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            {/* Pagination Controls */}
            {!propData && totalPages > 1 && (
                <div className="flex justify-center mt-12 space-x-2 pb-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Link
                            key={p}
                            to={`?page=${p}`}
                            className={`px-4 py-2 rounded-md transition-colors duration-300 ${page === p
                                ? "bg-[#FF1033] text-[#FFFDF5]"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            {p}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsCoverage;
