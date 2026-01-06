import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupedOffices } from "../../redux/slices/officeSlice";
import { LoadingState, ErrorState } from "../reusable";

// Helper to format address lines
const formatLocation = (office) => {
  if (!office) return { name: '', lines: [] };

  const name = office.officeName || `${office.address?.city}, ${office.address?.country}`;

  const lines = [];

  if (office.address) {
    const { line1, line2, city, state, country, pincode } = office.address;

    // Combine line1 and line2 if both exist, or just use what's available
    let addressText = [line1, line2].filter(Boolean).join(", ");
    if (addressText) lines.push(addressText);

    // Combine city, state, country - checking for duplicates if already in address text
    const locationParts = [city, state, country].filter(Boolean);
    // Add pincode to the last part if exists
    if (pincode && locationParts.length > 0) {
      locationParts[locationParts.length - 1] += ` – ${pincode}`;
    }

    if (locationParts.length > 0) {
      // Only add if it's not substantially the same as line 2 (simple heuristic)
      lines.push(locationParts.join(", "));
    }
  }

  // Add phone/email if they exist
  if (office.contact?.phone) lines.push(`Phone – ${office.contact.phone}`);
  if (office.contact?.email) lines.push(`Email – ${office.contact.email}`);

  return { name, lines };
};

const OfficeCard = ({ office, titleColor = "text-[#b10e2a]", textColor = "text-[#333333]" }) => {
  const { name, lines } = formatLocation(office);

  return (
    <div className="mb-0">
      <h4 className={`font-bold text-lg mb-0 ${titleColor}`}>{name}</h4>
      <div className={`text-sm md:text-[15px] leading-relaxed space-y-0.5 ${textColor}`}>
        {lines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default function OurOffices() {
  const dispatch = useDispatch();
  const { india, international, loading, error } = useSelector((state) => state.office);

  useEffect(() => {
    dispatch(fetchGroupedOffices());
  }, [dispatch]);

  if (loading) return <LoadingState message="Loading offices..." />;
  if (error) return <ErrorState error={error} />;

  // 1. Identify Featured Offices (Delhi & Dubai)
  const newDelhiOffice = india.find(o =>
    o.officeName?.toLowerCase().includes("new delhi") ||
    o.address?.city?.toLowerCase() === "new delhi"
  );

  const dubaiOffice = international.find(o =>
    o.officeName?.toLowerCase().includes("dubai") ||
    o.address?.city?.toLowerCase() === "dubai"
  );

  // 2. Filter remaining offices
  const otherIndiaOffices = india.filter(o => o._id !== newDelhiOffice?._id);
  const otherInternationalOffices = international.filter(o => o._id !== dubaiOffice?._id);

  return (
    <div className="w-full font-sans">

      {/* SECTION 1: Featured Header (Yellow/Orange) */}
      <section className="bg-[#FFD071] py-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-8">

          {/* New Delhi (Left) */}
          <div className="md:col-span-1">
            {newDelhiOffice && (
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#AC0826] mb-6">
                  New Delhi, India
                </h3>
                <div className="text-[#AC0826] text-lg leading-relaxed">
                  <p>{newDelhiOffice.address?.line1}, {newDelhiOffice.address?.line2}</p>
                  <p>{newDelhiOffice.address?.city} – {newDelhiOffice.address?.pincode}</p>
                </div>
              </div>
            )}
          </div>

          {/* Corporate Office (Center - Hardcoded based on image if not in data) */}
          <div className="md:col-span-1 flex items-end pb-1">
            <div className="text-[#AC0826] text-lg leading-relaxed">
              <p>Corporate Office: B-86, 2nd Floor, Defence</p>
              <p>Colony, Delhi-110024</p>
            </div>
          </div>

          {/* Dubai (Right) */}
          <div className="md:col-span-1">
            {dubaiOffice && (
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#AC0826] mb-6">
                  Dubai, UAE
                </h3>
                <div className="text-[#AC0826] text-lg leading-relaxed">
                  <p>{dubaiOffice.address?.line1}</p>
                  <p>{dubaiOffice.address?.line2}</p>
                  <p>Phone – {dubaiOffice.contact?.phone}</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>


      {/* SECTION 2: India Offices (Off-White/Beige) */}
      <section className="bg-[#FFFDF5] py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h3 className="text-3xl font-bold text-[#AC0826] mb-12">
            India Offices
          </h3>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-8">
            {otherIndiaOffices.map((office, idx) => (
              <OfficeCard key={office._id || idx} office={office} titleColor="text-[#AC0826]" textColor="text-[#AC0826]" />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Global Offices (Light Blue) */}
      <section className="bg-[#C7E6F9] py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h3 className="text-3xl font-bold text-[#162B56] mb-12">
            Global Offices
          </h3>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-4">
            {otherInternationalOffices.map((office, idx) => (
              <OfficeCard key={office._id || idx} office={office} titleColor="text-[#162B56]" textColor="text-[#162B56]" />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
