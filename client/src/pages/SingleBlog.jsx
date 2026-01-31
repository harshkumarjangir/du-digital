import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBlog } from "../redux/slices/BlogsSlice";
const SingleBlog = () => {
  const { id } = useParams()
  const dispatch = useDispatch();
  const { loading, error, SingleBlog } = useSelector(p => p.blog)
  useEffect(() => {
    dispatch(fetchSingleBlog(id))
  }, [id])

  return (
    <div>
      {loading ? <div>loading</div> : error ? <div>error</div> : SingleBlog &&
        <article className="blog-container">
          {/* Header */}
          <header className="blog-header">
            <div>  
              <h1 className="blog-title w-[500px]">{SingleBlog.title}</h1></div>

            <div className="blog-meta flex flex-col">
                <p className="blog-category">{SingleBlog.category}</p>
              {/* <span>By {SingleBlog.author?.name}</span>
              <span>•</span> */}
              <span>{new Date(SingleBlog.publishedAt).toLocaleDateString()}</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="blog-image">
            <img
              src={SingleBlog.featuredImage}
              alt={SingleBlog.title}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          {/* Content */}
          <section
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: SingleBlog.content }}
          />
        </article>
      }
    </div>
  );

}
export default SingleBlog;