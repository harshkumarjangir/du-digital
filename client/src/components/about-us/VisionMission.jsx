const VisionMission = ({ data }) => (
    <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow rounded">
            <h3 className="font-bold mb-2">Vision</h3>
            <p>{data.vision}</p>
        </div>
        <div className="bg-white p-6 shadow rounded">
            <h3 className="font-bold mb-2">Mission</h3>
            <p>{data.mission}</p>
        </div>
    </section>
);

export default VisionMission;
