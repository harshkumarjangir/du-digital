const CareerOpportunities = ({ jobs, onApply, onView }) => (
    <section className="py-20 px-6">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-12">
            Career Opportunities
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map(job => (
                <div
                    key={job.id}
                    className="bg-white rounded-lg shadow-md border-t-4 border-red-600 p-6"
                >
                    <h3 className="text-lg font-semibold text-red-600">
                        {job.title}
                    </h3>
                    <p className="text-sm text-gray-500 my-6">
                        Location: {job.location}
                    </p>

                    <div className="h-0.5 bg-red-500 mb-6"> </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => onApply(job)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Apply Now
                        </button>
                        <button
                            onClick={() => onView(job)}
                            className="px-4 py-2 border-0 rounded shadow-2xl hover:bg-gray-100"
                        >
                            Job Description
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default CareerOpportunities;
