import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupedOffices } from "../../redux/slices/officeSlice";
import { MapPin } from "lucide-react";

const Offices = () => {
    const dispatch = useDispatch();
    const { india, loading, error } = useSelector((state) => state.office);

    useEffect(() => {
        dispatch(fetchGroupedOffices());
    }, [dispatch]);

    if (loading) {
        return (
            <section className="py-20 bg-gray-50 text-center">
                <p className="text-gray-600">Loading offices...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-gray-50 text-center">
                <p className="text-red-600">Error: {error}</p>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-14">
                    <p className="text-sm font-semibold tracking-wide text-[#DA3745] uppercase mb-2">
                        DU Digital Global
                    </p>
                    <h2 className="text-4xl font-bold text-[#333333]">
                        India Offices
                    </h2>
                    <div className="w-28 h-1 bg-[#DA3745] mx-auto mt-4 rounded-full" />
                </div>

                {/* Offices Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {india.map((office) => (
                        <div
                            key={office._id}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-6"
                        >
                            {/* Office Name */}
                            <h3 className="text-lg font-semibold text-[#333333] mb-3">
                                {office.officeName}
                            </h3>

                            {/* Address */}
                            <div className="text-sm text-[#333333] leading-relaxed space-y-1 mb-4">
                                <p>{office.address.line1}</p>
                                {office.address.line2 && <p>{office.address.line2}</p>}
                                {(office.address.city || office.address.state) && (
                                    <p>
                                        {office.address.city}
                                        {office.address.state && `, ${office.address.state}`}
                                        {office.address.pincode && ` - ${office.address.pincode}`}
                                    </p>
                                )}
                            </div>

                            {/* Contact */}
                            <div className="text-sm text-gray-600 space-y-1 mb-4">
                                {office.contact.email && (
                                    <p>
                                        Email:{" "}
                                        <a
                                            href={`mailto:${office.contact.email}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {office.contact.email}
                                        </a>
                                    </p>
                                )}
                                {office.contact.phone && (
                                    <p>
                                        Phone:{" "}
                                        <a
                                            href={`tel:${office.contact.phone}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {office.contact.phone}
                                        </a>
                                    </p>
                                )}
                            </div>

                            {/* View on Maps */}
                            <a
                                href={office.mapLink || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
                            >
                                <MapPin size={16} />
                                View on Maps
                            </a>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {india.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500">
                            No offices available at the moment.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Offices;












// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchGroupedOffices } from '../../redux/slices/officeSlice';
// import { MapPin } from 'lucide-react';

// const Offices = () => {
//     const dispatch = useDispatch();
//     const { india, loading, error } = useSelector((state) => state.office);

//     useEffect(() => {
//         dispatch(fetchGroupedOffices());
//     }, [dispatch]);

//     if (loading) {
//         return (
//             <section className="py-16 bg-gray-50">
//                 <div className="max-w-7xl mx-auto px-6 text-center">
//                     <p className="text-gray-600">Loading offices...</p>
//                 </div>
//             </section>
//         );
//     }

//     if (error) {
//         return (
//             <section className="py-16 bg-gray-50">
//                 <div className="max-w-7xl mx-auto px-6 text-center">
//                     <p className="text-red-600">Error: {error}</p>
//                 </div>
//             </section>
//         );
//     }

//     return (
//         <section className="py-16 bg-gray-50">
//             <div className="max-w-7xl mx-auto px-6">
//                 {/* Header */}
//                 <div className="text-center mb-12">
//                     <h2 className="text-4xl font-bold text-gray-900 mb-2">
//                         India Offices
//                     </h2>
//                     <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
//                 </div>

//                 {/* Offices Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {india.map((office) => (
//                         <div
//                             key={office._id}
//                             className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
//                         >
//                             {/* Office Name */}
//                             <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                                 {office.officeName}
//                             </h3>

//                             {/* Address */}
//                             <div className="space-y-2 mb-4">
//                                 <p className="text-gray-700 text-sm leading-relaxed">
//                                     {office.address.line1}
//                                 </p>
//                                 {office.address.line2 && (
//                                     <p className="text-gray-700 text-sm leading-relaxed">
//                                         {office.address.line2}
//                                     </p>
//                                 )}
//                                 {office.address.city && (
//                                     <p className="text-gray-700 text-sm">
//                                         {office.address.city}
//                                         {office.address.state && `, ${office.address.state}`}
//                                         {office.address.pincode && ` - ${office.address.pincode}`}
//                                     </p>
//                                 )}
//                             </div>

//                             {/* Contact Info */}
//                             {(office.contact.email || office.contact.phone) && (
//                                 <div className="space-y-1 mb-4 text-sm">
//                                     {office.contact.email && (
//                                         <p className="text-gray-600">
//                                             Email: <a href={`mailto:${office.contact.email}`} className="text-blue-600 hover:underline">
//                                                 {office.contact.email}
//                                             </a>
//                                         </p>
//                                     )}
//                                     {office.contact.phone && (
//                                         <p className="text-gray-600">
//                                             Phone: <a href={`tel:${office.contact.phone}`} className="text-blue-600 hover:underline">
//                                                 {office.contact.phone}
//                                             </a>
//                                         </p>
//                                     )}
//                                 </div>
//                             )}

//                             {/* View on Maps Button */}
//                             <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition">
//                                 <MapPin size={16} />
//                                 <span>View on Maps</span>
//                             </button>
//                         </div>
//                     ))}
//                 </div>

//                 {/* No Offices Message */}
//                 {india.length === 0 && !loading && (
//                     <div className="text-center py-12">
//                         <p className="text-gray-500">No offices available at the moment.</p>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// };

// export default Offices;