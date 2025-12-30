import { NavLink } from "react-router-dom";

const PageTabs = () => {
    const base =
        "px-10 py-3 rounded-full font-semibold transition shadow";

    return (
        <div className="flex justify-center gap-6 my-12">
            <NavLink
                to="/news-and-media"
                className={({ isActive }) =>
                    `${base} ${isActive
                        ? "bg-red-600 text-white"
                        : "bg-white text-black"
                    }`
                }
            >
                NEWS COVERAGE
            </NavLink>

            <NavLink
                to="/news-and-media/event"
                className={({ isActive }) =>
                    `${base} ${isActive
                        ? "bg-red-600 text-white"
                        : "bg-white text-black"
                    }`
                }
            >
                EVENTS
            </NavLink>
        </div>
    );
};

export default PageTabs;
