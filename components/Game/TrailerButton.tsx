import { PlayIcon } from '@heroicons/react/outline';

type TrailerButtonProps = {
    handleClick: (value: boolean) => void;
};

const TrailerButton: React.FC<TrailerButtonProps> = ({ handleClick }) => {
    return (
        <div className="mt-12">
            <button
                type="button"
                className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800"
                onClick={() => handleClick(true)}
            >
                Play Trailer
                <PlayIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>
        </div>
    );
};

export default TrailerButton;
