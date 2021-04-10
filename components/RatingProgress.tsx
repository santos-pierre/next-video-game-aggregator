import ProgressBar from 'progressbar.js';
import { useEffect, useRef } from 'react';

type RatingProgressProps = {
    slug: string;
    style?: string;
    category: 'popular' | 'review' | 'user-review' | 'global-review';
    rating: number;
};

const RatingProgress: React.FC<RatingProgressProps> = ({ slug, style, rating, category }) => {
    const ratingProgress = useRef(null);

    useEffect(() => {
        if (ratingProgress && ratingProgress.current) {
            let progressCircle = new ProgressBar.Circle(ratingProgress.current, {
                color: '#ffffff',
                strokeWidth: 6,
                trailWidth: 4,
                text: {
                    autoStyleContainer: false,
                },
                duration: 2400,
                easing: 'easeOut',
                from: { color: '#48bb78' },
                to: { color: '#48bb78' },
                step: function (state, circle) {
                    if (circle.path) {
                        circle.path.setAttribute('stroke', state.color);
                        circle.path.setAttribute('stroke-width', '6');
                        var value = Math.round(circle.value() * 100);
                        if (value === 0) {
                            //@ts-ignore
                            circle.setText('N/A');
                        } else {
                            //@ts-ignore
                            circle.setText(value + '%');
                        }
                    }
                },
            });

            progressCircle.animate(rating);
            return () => progressCircle.destroy();
        }
    }, [ratingProgress]);

    return (
        <div className={`${style ? style : null} w-16 h-16 bg-gray-800 rounded-full`}>
            <div
                id={`${slug}-${category}`}
                className="font-semibold text-sm flex justify-center items-center h-full"
                ref={ratingProgress}
            ></div>
        </div>
    );
};

export default RatingProgress;
