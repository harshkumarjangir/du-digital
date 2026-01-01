import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupedOffices } from "../../redux/slices/officeSlice";
import { LoadingState, ErrorState } from "../reusable";

// Helper to format office display name
const formatOfficeName = (office) => {
  if (office.officeName) return office.officeName;
  if (office.address?.city && office.address?.country) {
    return `${office.address.city}, ${office.address.country}`;
  }
  return office.address?.city || "Office";
};

// Helper to build full address string
const formatFullAddress = (office) => {
  const parts = [];
  if (office.address?.line1) parts.push(office.address.line1);
  if (office.address?.line2) parts.push(office.address.line2);
  
  const cityParts = [];
  if (office.address?.city) cityParts.push(office.address.city);
  if (office.address?.state) cityParts.push(office.address.state);
  if (office.address?.country) cityParts.push(office.address.country);
  if (cityParts.length > 0) parts.push(cityParts.join(", "));
  
  if (office.address?.pincode) parts.push(office.address.pincode);
  
  return parts.join(", ");
};

// Featured office card with full details
const FeaturedOffice = ({ office }) => {
  const displayName = formatOfficeName(office);
  const fullAddress = formatFullAddress(office);
  
  return (
    <div>
      <h4 className="font-semibold mb-4">{displayName}</h4>
      <p className="text-sm leading-relaxed">{fullAddress}</p>
      
      {(office.contact?.phone || office.contact?.email) && (
        <p className="mt-4 text-sm leading-relaxed">
          {office.contact?.phone && (
            <>
              P: <a href={`tel:${office.contact.phone}`} className="hover:underline">{office.contact.phone}</a>
              <br />
            </>
          )}
          {office.contact?.email && (
            <>
              E: <a href={`mailto:${office.contact.email}`} className="hover:underline">{office.contact.email}</a>
            </>
          )}
        </p>
      )}
    </div>
  );
};

// Office list column
const OfficeColumn = ({ title, offices }) => (
  <div>
    <h4 className="text-[#b10e2a] font-semibold mb-4">{title}</h4>
    <ul className="space-y-1 text-sm">
      {offices.map((office, i) => (
        <li key={office._id || i}>{formatOfficeName(office)}</li>
      ))}
    </ul>
  </div>
);

export default function OurOffices() {
  const dispatch = useDispatch();
  const { india, international, loading, error } = useSelector((state) => state.office);

  useEffect(() => {
    dispatch(fetchGroupedOffices());
  }, [dispatch]);

  // Show loading state
  if (loading) {
    return (
      <LoadingState 
        message="Loading office locations..." 
        bgColor="bg-[#fffaf2]"
        textColor="text-[#b10e2a]"
      />
    );
  }

  // Show error state
  if (error) {
    return (
      <ErrorState 
        error={error}
        title="Failed to load office locations"
        bgColor="bg-[#fffaf2]"
        textColor="text-[#b10e2a]"
        errorColor="text-red-600"
        onRetry={() => dispatch(fetchGroupedOffices())}
      />
    );
  }

  // Find featured offices (Delhi and Dubai) or use first two
  const delhiOffice = india.find(o => 
    o.officeName?.toLowerCase().includes('delhi') || 
    o.address?.city?.toLowerCase().includes('delhi')
  ) || india[0];
  
  const dubaiOffice = international.find(o => 
    o.officeName?.toLowerCase().includes('dubai') || 
    o.address?.city?.toLowerCase().includes('dubai')
  ) || international[0];

  // Get remaining offices (exclude featured ones)
  const otherIndiaOffices = india.filter(o => o._id !== delhiOffice?._id);
  const otherInternationalOffices = international.filter(o => o._id !== dubaiOffice?._id);

  return (
    <section className="bg-[#fffaf2] py-16">
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-12 text-[#b10e2a]">

        {/* FEATURED OFFICE 1 (Delhi or first India office) */}
        {delhiOffice && <FeaturedOffice office={delhiOffice} />}

        {/* FEATURED OFFICE 2 (Dubai or first International office) */}
        {dubaiOffice && <FeaturedOffice office={dubaiOffice} />}

        {/* OTHER INDIA OFFICES */}
        {otherIndiaOffices.length > 0 && (
          <OfficeColumn
            title="India Offices"
            offices={otherIndiaOffices}
          />
        )}

        {/* OTHER GLOBAL OFFICES */}
        {otherInternationalOffices.length > 0 && (
          <OfficeColumn
            title="Global Offices"
            offices={otherInternationalOffices}
          />
        )}

      </div>
    </section>
  );
}















// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchGroupedOffices } from "../../redux/slices/officeSlice";
// import offices from "../../data/offices.json";

// // Helper function to transform API office data to component format
// const transformOffice = (office) => {
//     const addressLines = [];
    
//     // Build address array from address object
//     if (office.address) {
//         if (office.address.line1) addressLines.push(office.address.line1);
//         if (office.address.line2) addressLines.push(office.address.line2);
        
//         // Build city, state, country line
//         const cityParts = [];
//         if (office.address.city) cityParts.push(office.address.city);
//         if (office.address.state) cityParts.push(office.address.state);
//         if (office.address.country) cityParts.push(office.address.country);
//         if (cityParts.length > 0) {
//             addressLines.push(cityParts.join(", "));
//         }
        
//         if (office.address.pincode) {
//             addressLines.push(office.address.pincode);
//         }
//     }
    
//     // Use officeName as city, or construct from address
//     const city = office.officeName || 
//                  (office.address?.city && office.address?.country 
//                     ? `${office.address.city}, ${office.address.country}` 
//                     : office.address?.city || "Office");
    
//     return {
//         id: office._id || office.id,
//         city,
//         address: addressLines.length > 0 ? addressLines : ["Address not available"],
//         email: office.contact?.email || null,
//         phone: office.contact?.phone || null
//     };
// };

// const OfficeCard = ({ city, address, email, phone }) => {
//     return (
//         <div className=" text-sm leading-relaxed text-gray-200">
//             <p className="font-semibold text-white">{city}</p>

//             {address.map((line, i) => (
//                 <p key={i}>{line}</p>
//             ))}

//             {email && (
//                 <p>
//                     <span className="font-semibold">Email:</span>{" "}
//                     <a href={`mailto:${email}`} className="text-red-400">
//                         {email}
//                     </a>
//                 </p>
//             )}

//             {phone && (
//                 <p>
//                     <span className="font-semibold">Phone:</span>{" "}
//                     <a href={`tel:${phone}`} className="text-red-400">
//                         {phone}
//                     </a>
//                 </p>
//             )}
//         </div>
//     );
// };


// const OurOffices = () => {
//     const dispatch = useDispatch();
//     const { india, international, loading, error } = useSelector((state) => state.office);

//     useEffect(() => {
//         dispatch(fetchGroupedOffices());
//     }, [dispatch]);

//     // Transform API data to component format
//     const transformedIndia = india.map(transformOffice);
//     const transformedInternational = international.map(transformOffice);

//     return (
//         <section className="relative overflow-hidden bg-gradient-to-br from-[#2a0000] to-[#120000] py-16 text-white"
//         style={{
//             backgroundImage: "linear-gradient(180deg, #161111 0%, #360A0A 100%)"
//           }}
          
//             >

//             {/* Background Image */}
//             <img
//                 src={offices.bgImage}
//                 alt="Background"
//                 className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
//             />

//             {/* Content */}
//             <div className="relative container mx-auto max-w-6xl px-4">
//                 <h2 className="mb-10 text-3xl font-semibold">Our Offices</h2>

//                 {loading && (
//                     <div className="text-center py-8">
//                         <p className="text-gray-300">Loading offices...</p>
//                     </div>
//                 )}

//                 {error && (
//                     <div className="text-center py-8">
//                         <p className="text-red-400">Error loading offices: {error}</p>
//                     </div>
//                 )}

//                 {!loading && !error && (
//                     <>
//                         {/* India Offices */}
//                         {transformedIndia.length > 0 && (
//                             <div className="mb-14">
//                                 <h3 className="mb-6 text-lg font-semibold text-red-500">
//                                     India Offices
//                                 </h3>

//                                 <div className="grid gap-8 md:grid-cols-3 border-2 border-white p-3">
//                                     <div className=" grid gap-y-5">
//                                         {transformedIndia.map((office, index) => {
//                                             const { id, ...officeProps } = office;
//                                             return [0,3,6].includes(index) && <OfficeCard key={id || index} {...officeProps} />;
//                                         })}
//                                     </div>
//                                     <div className=" grid gap-y-1">
//                                         {transformedIndia.map((office, index) => {
//                                             const { id, ...officeProps } = office;
//                                             return [1,4].includes(index) && <OfficeCard key={id || index} {...officeProps} />;
//                                         })}
//                                     </div>
//                                     <div className="grid gap-y-0.5">
//                                         {transformedIndia.map((office, index) => {
//                                             const { id, ...officeProps } = office;
//                                             return [2,5].includes(index) && <OfficeCard key={id || index} {...officeProps} />;
//                                         })}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Global Offices */}
//                         {transformedInternational.length > 0 && (
//                             <div>
//                                 <h3 className="mb-6 text-lg font-semibold text-red-500">
//                                     Global Offices
//                                 </h3>

//                                 <div className="grid gap-8 md:grid-cols-3 border-2 border-white p-3">
//                                     {transformedInternational.map((office, index) => {
//                                         const { id, ...officeProps } = office;
//                                         return <OfficeCard key={id || index} {...officeProps} />;
//                                     })}
//                                 </div>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </section>
//     );
// };

// export default OurOffices;
