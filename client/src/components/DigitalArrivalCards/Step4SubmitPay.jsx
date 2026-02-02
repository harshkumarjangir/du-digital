import React, { useState } from 'react';
import { Loader2 } from "lucide-react";

const Step4SubmitPay = ({ formData, handleChange, submitForm, prevStep, loading, error }) => {
    const [isIndividual, setIsIndividual] = useState(true);

    // Hardcoded price for demo purposes, could be moved to JSON or derived from props in a real app
    const UNIT_PRICE = 199.00;
    const totalPersons = isIndividual ? 1 : (formData.totalPersons || 1);

    // Ensure total persons is at least 1
    const finalTotal = isIndividual ? 1 : Math.max(1, parseInt(totalPersons) || 1);

    const totalPrice = (UNIT_PRICE * finalTotal).toFixed(2);

    const handlePersonCountChange = (e) => {
        // Manually update the formData with the 'totalTravelers' count if we are not individual
        handleChange({
            target: {
                name: 'totalPersons',
                value: e.target.value
            }
        })
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            {/* Health Declaration */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Health Declaration
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Passengers travelling to and entering {formData.country || 'the destination'} have to be vaccinated with the vaccines approved the WHO or other vaccines as allowed by the Ministry of Public Health.
                </p>
            </div>

            {/* Individual vs Group */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Individual? <span className="text-[#FF1033]">*</span></label>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setIsIndividual(true)}
                        aria-pressed={isIndividual}
                        className={`px-6 py-2 rounded-md transition-colors ${isIndividual ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsIndividual(false)}
                        aria-pressed={!isIndividual}
                        className={`px-6 py-2 rounded-md transition-colors ${!isIndividual ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        No
                    </button>
                </div>
            </div>

            {/* If Not individual, ask for how many people */}
            {!isIndividual && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                    <label htmlFor="totalPersons" className="block text-gray-700 font-medium mb-2">Total Persons (Including you) <span className="text-[#FF1033]">*</span></label>
                    <select
                        id="totalPersons"
                        name="totalPersons"
                        value={formData.totalPersons || 1}
                        onChange={handleChange}
                        className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-white cursor-pointer"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Payment Summary Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden mt-6">
                <table className="w-full text-left text-sm md:text-base">
                    <thead className="bg-gray-100 border-b border-gray-200 text-gray-700">
                        <tr>
                            <th className="px-6 py-3 font-semibold">Item</th>
                            <th className="px-6 py-3 font-semibold text-right">Price</th>
                            <th className="px-6 py-3 font-semibold text-center">Qty</th>
                            <th className="px-6 py-3 font-semibold text-right">Line Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-50 divide-y divide-gray-100">
                        <tr>
                            <td className="px-6 py-4 text-gray-800">
                                {isIndividual ? 'Individual Application' : `Group Application (${finalTotal} persons)`}
                            </td>
                            <td className="px-6 py-4 text-right text-gray-600">₹{UNIT_PRICE.toFixed(2)}</td>
                            <td className="px-6 py-4 text-center text-gray-600">{finalTotal}</td>
                            <td className="px-6 py-4 text-right font-medium text-gray-800">₹{totalPrice}</td>
                        </tr>
                        <tr className="bg-white border-t border-gray-300 font-bold">
                            <td className="px-6 py-4 text-right" colSpan="3">Total</td>
                            <td className="px-6 py-4 text-right text-lg">₹{totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-10">
                <button
                    type="button"
                    onClick={prevStep}
                    disabled={loading}
                    className="px-8 py-3 font-semibold rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                    Previous
                </button>
                <div className="flex gap-4">
                    <button
                        type="button"
                        disabled={loading}
                        className="hidden md:block px-8 py-3 font-semibold rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-colors  disabled:opacity-50"
                    >
                        Save for Later
                    </button>
                    <button
                        type="button"
                        onClick={() => submitForm({ ...formData, totalPersons: finalTotal, isIndividual })}
                        disabled={loading}
                        className="px-8 py-3 font-semibold rounded-full bg-[#FF1033] text-[#FFFDF5] hover:bg-[#511313] transition-colors disabled:opacity-70 flex items-center gap-2 "
                    >
                        {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : 'Proceed to Payment'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step4SubmitPay;
