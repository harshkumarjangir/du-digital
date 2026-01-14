import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/slices/BlogsSlice";
import { Link, useSearchParams } from "react-router-dom";
import LazyImage from "../reusable/LazyImage";
import { ArrowUpRight } from "lucide-react";

export const Blog = ({ data: propData, className }) => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!propData) {
      dispatch(fetchBlogs(page));
    }
  }, [dispatch, page, propData]);

  const { Blogs: reduxData, loading, error, totalPages } = useSelector((state) => state.blog);

  // Use propData if available, otherwise use reduxData
  const data = propData || reduxData;

  // Category color mapping (same as EventsGrid)
  const categoryColors = {
    'Business Networking': 'bg-red-500',
    'Industry Conference': 'bg-green-500',
    'Product Launch': 'bg-yellow-500',
    'Community Event': 'bg-blue-500',
    'Trade Show': 'bg-purple-500',
    'Tenant Verification': 'bg-red-500',
    'default': 'bg-gray-500'
  };

  const getCategoryColor = (category) => {
    return categoryColors[category] || categoryColors.default;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {loading && !propData && <div className="text-center">Loading...</div>}
      {error && !propData && <div className="text-center text-red-500">Error: {error}</div>}

      {/* Blog Grid - matching EventsGrid structure */}
      <div className={`grid grid-cols-1 md:grid-cols-2 ${className || 'lg:grid-cols-3'} gap-8`}>
        {data?.map((blog) => (
          <div
            key={blog._id}
            className="relative rounded-2xl overflow-hidden shadow-lg group"
          >
            {/* IMAGE */}
            <div className="h-[420px] relative">
              <LazyImage
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
            </div>

            {/* TOP RIGHT ARROW BUTTON */}
            <Link
              to={`/blog/${blog._id}`}
              aria-label="View blog details"
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition z-10"
            >
              <ArrowUpRight size={24} className="text-red-600" />
            </Link>

            {/* CONTENT */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-0">
              {/* Category Badge */}
              {/* <span className={`${getCategoryColor(blog.category)} text-white text-xs px-3 py-1 rounded-full w-max mb-3 font-medium`}>
                {blog.category || "Tenant Verification"}
              </span> */}

              <Link
                to={`/blog/${blog._id}`}
                className="bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] px-6 py-2 mb-4 rounded-full w-max font-bold transition-all duration-300 cursor-pointer"
              >
                View More
              </Link>

              <h3 className="font-semibold text-lg leading-snug mb-0">
                {blog.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {!propData && totalPages > 1 && (
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              to={`?page=${p}`}
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${page === p
                ? "bg-[#ac0826] text-white"
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
