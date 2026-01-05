import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/slices/BlogsSlice";
import { Link, useSearchParams } from "react-router-dom";

const COLORS = [
  "bg-yellow-400",
  "bg-green-500",
  "bg-red-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-pink-500",
];

// Stable color based on blog id
const getColorFromId = (id) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash += id.charCodeAt(i);
  }
  return COLORS[hash % COLORS.length];
};

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

  return (
    <div className="max-w-7xl mx-auto my-5 px-4 mt-6">
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${className || 'md:grid-cols-4'} gap-6 justify-items-center`}>
        {loading ? <div>Loading...</div> : error && <div>error</div>}
        {data.length === 0 ? (
          <div>No Blog Found</div>
        ) : (
          data.map((blog) => {
            const color = getColorFromId(blog._id);

            return (
              <div
                key={blog._id}
                className="w-full max-w-sm h-[420px] rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col">
                {/* Image */}
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />

                {/* Content */}
                <div className="p-4 space-y-2 grow">
                  <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 my-2 line-clamp-3">
                    {blog.tags}
                  </p>
                </div>

                {/* Button */}
                <Link
                  to={`/blog/${blog._id}`}
                  className="w-full py-3 px-2 text-[#FFFDF5] font-bold bg-[#FF1033] hover:bg-[#511313] hover:text-[#FF1033] transition-all duration-300 text-center">
                  Read More
                </Link>
              </div>
            );
          })
        )}
      </div>
      {
        !propData && totalPages > 1 && <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              to={`?page=${page}`}
              className={`px-4 py-2 rounded-md ${searchParams.get("page") == page
                ? "bg-[#FF1033] text-[#FFFDF5]"
                : "bg-gray-200 text-gray-700"
                }`}
            >
              {page}
            </Link>
          ))}


        </div>
      }
    </div>
  );
};
