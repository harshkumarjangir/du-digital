import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupedOffices } from "../../redux/slices/officeSlice";
import offices from "../../data/offices.json";

// Helper function to transform API office data to component format
const transformOffice = (office) => {
    const addressLines = [];
    
    // Build address array from address object
    if (office.address) {
        if (office.address.line1) addressLines.push(office.address.line1);
        if (office.address.line2) addressLines.push(office.address.line2);
        
        // Build city, state, country line
        const cityParts = [];
        if (office.address.city) cityParts.push(office.address.city);
        if (office.address.state) cityParts.push(office.address.state);
        if (office.address.country) cityParts.push(office.address.country);
        if (cityParts.length > 0) {
            addressLines.push(cityParts.join(", "));
        }
        
        if (office.address.pincode) {
            addressLines.push(office.address.pincode);
        }
    }
    
    // Use officeName as city, or construct from address
    const city = office.officeName || 
                 (office.address?.city && office.address?.country 
                    ? `${office.address.city}, ${office.address.country}` 
                    : office.address?.city || "Office");
    
    return {
        id: office._id || office.id,
        city,
        address: addressLines.length > 0 ? addressLines : ["Address not available"],
        email: office.contact?.email || null,
        phone: office.contact?.phone || null
    };
};

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
    const dispatch = useDispatch();
    const { india, international, loading, error } = useSelector((state) => state.office);

    useEffect(() => {
        dispatch(fetchGroupedOffices());
    }, [dispatch]);

    // Transform API data to component format
    const transformedIndia = india.map(transformOffice);
    const transformedInternational = international.map(transformOffice);

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

                {loading && (
                    <div className="text-center py-8">
                        <p className="text-gray-300">Loading offices...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-8">
                        <p className="text-red-400">Error loading offices: {error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* India Offices */}
                        {transformedIndia.length > 0 && (
                            <div className="mb-14">
                                <h3 className="mb-6 text-lg font-semibold text-red-500">
                                    India Offices
                                </h3>

                                <div className="grid gap-8 md:grid-cols-3 border-2 border-white p-3">
                                    <div className=" grid gap-y-5">
                                        {transformedIndia.map((office, index) => {
                                            const { id, ...officeProps } = office;
                                            return [0,3,6].includes(index) && <OfficeCard key={id || index} {...officeProps} />;
                                        })}
                                    </div>
                                    <div className=" grid gap-y-1">
                                        {transformedIndia.map((office, index) => {
                                            const { id, ...officeProps } = office;
                                            return [1,4].includes(index) && <OfficeCard key={id || index} {...officeProps} />;
                                        })}
                                    </div>
                                    <div className="grid gap-y-0.5">
                                        {transformedIndia.map((office, index) => {
                                            const { id, ...officeProps } = office;
                                            return [2,5].includes(index) && <OfficeCard key={id || index} {...officeProps} />;
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Global Offices */}
                        {transformedInternational.length > 0 && (
                            <div>
                                <h3 className="mb-6 text-lg font-semibold text-red-500">
                                    Global Offices
                                </h3>

                                <div className="grid gap-8 md:grid-cols-3 border-2 border-white p-3">
                                    {transformedInternational.map((office, index) => {
                                        const { id, ...officeProps } = office;
                                        return <OfficeCard key={id || index} {...officeProps} />;
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default OurOffices;
