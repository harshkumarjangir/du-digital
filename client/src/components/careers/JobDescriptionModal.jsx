const JobDescriptionModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            {/* Header */}
            <div className="bg-white border-0 px-10 py-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">
                        {job.title}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Location: {job.location}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="text-2xl text-gray-500 hover:text-black"
                >
                    ✕
                </button>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-10 py-10 space-y-8">

                {/* Summary */}
                <p className="text-lg font-semibold text-gray-800">
                    {job.description.summary}
                </p>

                {/* Job Summary */}
                {job.description.jobSummary && (
                    <div>
                        <h2 className="text-xl font-semibold mb-3">
                            Job Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {job.description.jobSummary}
                        </p>
                    </div>
                )}

                {/* Responsibilities */}
                {job.description.responsibilities?.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold mb-3">
                            Key Responsibilities
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            {job.description.responsibilities.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Apply Button */}
                {/* <div className="pt-6">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold">
                        Apply Now
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default JobDescriptionModal;
