import React from 'react';
import { ChevronDown } from "lucide-react";

const Step2PersonalDetails = ({ formData, handleChange, nextStep, prevStep, options }) => {
    const { nationalities, genderOptions } = options;

    const requiredFields = [
        'firstName', 'lastName', 'email', 'nationality', 'gender', 'dob',
        'accommodationLine1', 'accommodationCity', 'accommodationState', 'accommodationZip'
    ];

    const isStepValid = requiredFields.every(field => formData[field] && formData[field].trim() !== '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isStepValid) {
            nextStep();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">

            {/* Personal Details Section */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                    Personal Details
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name <span className="text-[#FF1033]">*</span></label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter Your First Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="middleName" className="block text-gray-700 font-medium mb-2">Middle Name</label>
                        <input
                            id="middleName"
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            placeholder="Enter Your Middle Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name <span className="text-[#FF1033]">*</span></label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter Your Last Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address <span className="text-[#FF1033]">*</span></label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="nationality" className="block text-gray-700 font-medium mb-2">Nationality/Citizenship <span className="text-[#FF1033]">*</span></label>
                        <div className="relative">
                            <select
                                id="nationality"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none appearance-none bg-white"
                                required
                            >
                                <option value="">- Select Nationality -</option>
                                {nationalities.map((nat, idx) => (
                                    <option key={idx} value={nat}>{nat}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">Gender <span className="text-[#FF1033]">*</span></label>
                        <div className="relative">
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none appearance-none bg-white"
                                required
                            >
                                <option value="">- Select Gender -</option>
                                {genderOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">Date of Birth <span className="text-[#FF1033]">*</span></label>
                        <input
                            id="dob"
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Accommodation Section */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                    Accommodation Details in {formData.country ? options.countries.find(c => c.value === formData.country)?.label : 'Destination'}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="accommodationLine1" className="block text-gray-700 font-medium mb-2">Address Line 1 <span className="text-[#FF1033]">*</span></label>
                        <input
                            id="accommodationLine1"
                            type="text"
                            name="accommodationLine1"
                            value={formData.accommodationLine1}
                            onChange={handleChange}
                            placeholder="Street Address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="accommodationLine2" className="block text-gray-700 font-medium mb-2">Address Line 2</label>
                        <input
                            id="accommodationLine2"
                            type="text"
                            name="accommodationLine2"
                            value={formData.accommodationLine2}
                            onChange={handleChange}
                            placeholder="Apartment, Suite, Unit, etc."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="accommodationCity" className="block text-gray-700 font-medium mb-2">City <span className="text-[#FF1033]">*</span></label>
                        <input
                            id="accommodationCity"
                            type="text"
                            name="accommodationCity"
                            value={formData.accommodationCity}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="accommodationState" className="block text-gray-700 font-medium mb-2">State/Province <span className="text-[#FF1033]">*</span></label>
                        <input
                            id="accommodationState"
                            type="text"
                            name="accommodationState"
                            value={formData.accommodationState}
                            onChange={handleChange}
                            placeholder="State/Province"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="accommodationZip" className="block text-gray-700 font-medium mb-2">Zip/Postal Code <span className="text-[#FF1033]">*</span></label>
                        <input
                            id="accommodationZip"
                            type="text"
                            name="accommodationZip"
                            value={formData.accommodationZip}
                            onChange={handleChange}
                            placeholder="Zip Code"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>
                </div>
            </div>


            <div className="flex justify-between mt-8">
                <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-3 font-semibold rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors "
                >
                    Previous
                </button>
                <button
                    type="submit"
                    disabled={!isStepValid}
                    className="px-8 py-3 font-semibold rounded-full bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] hover:text-[#FF1033] transition-colors disabled:opacity-50 disabled:cursor-not-allowed "
                >
                    Save and Continue
                </button>
            </div>
        </form>
    );
};

export default Step2PersonalDetails;
