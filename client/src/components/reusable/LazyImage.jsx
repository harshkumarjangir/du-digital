import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyImage = ({ src, alt, className, style, ...props }) => {
    return (
        <LazyLoadImage
            alt={alt}
            src={src}
            className={className}
            style={style}
            effect="blur"
            visibleByDefault={false}
            fetchPriority="low"
            loading="lazy"
            decoding="async"
            threshold={500}
            {...props}
        />
    );
};

export default LazyImage;
