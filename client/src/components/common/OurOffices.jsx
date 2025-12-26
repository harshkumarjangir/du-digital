import offices from "../../data/offices.json";
// import OfficeCard from "./OfficeCard";

const OfficeCard = ({ city, address, email, phone }) => {
    return (
        <div className=" text-sm leading-relaxed text-gray-200">
            <p className="font-semibold text-white">{city}</p>

            {address.map((line, i) => (
                <p key={i}>{line}</p>
            ))}

            {email && (
                <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <a href={`mailto:${email}`} className="text-red-400">
                        {email}
                    </a>
                </p>
            )}

            {phone && (
                <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a href={`tel:${phone}`} className="text-red-400">
                        {phone}
                    </a>
                </p>
            )}
        </div>
    );
};


const OurOffices = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#2a0000] to-[#120000] py-16 text-white"
        style={{
            backgroundImage: "linear-gradient(180deg, #161111 0%, #360A0A 100%)"
          }}
          
            >

            {/* Background Image */}
            <img
                src={offices.bgImage}
                alt="Background"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
            />

            {/* Content */}
            <div className="relative container mx-auto max-w-6xl px-4">
                <h2 className="mb-10 text-3xl font-semibold">Our Offices</h2>

                {/* India Offices */}
                <div className="mb-14">
                    <h3 className="mb-6 text-lg font-semibold text-red-500">
                        India Offices
                    </h3>

                    <div className="grid gap-8 md:grid-cols-3 border-2 border-white p-3">
                     <div className=" grid gap-y-5">   {offices.india.map((office, index) => 
                          [0,3,6].includes(index) && <OfficeCard key={index} {...office} />
                        )}</div>
                     <div className=" grid gap-y-1">
                     {offices.india.map((office, index) => 
                          [1,4].includes(index) && <OfficeCard key={index} {...office} />
                        )}
                     </div>
                     <div className="grid gap-y-0.5">
                     {offices.india.map((office, index) => 
                          [2,5].includes(index) && <OfficeCard key={index} {...office} />
                        )}
                     </div>
                    </div>
                </div>

                {/* Global Offices */}
                <div>
                    <h3 className="mb-6 text-lg font-semibold text-red-500">
                        Global Offices
                    </h3>

                    <div className="grid gap-8 md:grid-cols-3 border-2 border-white p-3">
                        {offices.global.map((office, index) => (
                            <OfficeCard key={index} {...office} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurOffices;

