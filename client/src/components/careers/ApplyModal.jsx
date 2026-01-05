import { useState } from "react";
import CountryPhoneInput from "../become-partner/CountryPhoneInput";
import { SubmitCv } from "../../redux/slices/careersSlice";
import { useDispatch, useSelector } from "react-redux";

const ApplyModal = ({ open, job, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: null,
        resume: null,
    });
    const dispatch = useDispatch()
    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            jobId: job?._id,
            jobTitle: job?.title,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            resume: formData.resume,
        }
        console.log("data", data);

        dispatch(SubmitCv(data));

    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-white w-[440px] rounded-2xl p-6 relative shadow-xl">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
                >
                    ✕
                </button>

                {/* Heading */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Apply Now
                </h3>

                {/* Job Info */}
                {job && (
                    <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{job.title}</p>
                        <p className="text-xs text-gray-600 mt-1">
                            {job.location} · {job.jobType}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Full Name */}
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />

                    {/* Email */}
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />

                    {/* Phone */}
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Phone <span className="text-red-500">*</span>
                    </label>
                    <CountryPhoneInput
                        onChange={(phoneData) =>
                            setFormData({ ...formData, phone: phoneData })
                        }
                    />

                    {/* Upload Resume */}
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Upload Your Resume (Only pdf and doc files are allowed) <span className="text-red-500">*</span>
                    </label>
                    <label className="block cursor-pointer">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-500 transition">
                            <p className="text-sm text-gray-600">
                                Upload Resume <span className="text-red-600">(PDF / DOC)</span>
                            </p>

                            {formData.resume && (
                                <p className="mt-2 text-xs text-gray-800 font-medium">
                                    {formData.resume.name}
                                </p>
                            )}
                        </div>

                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            hidden
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    resume: e.target.files[0],
                                })
                            }
                        />
                    </label>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-[#FF1033] hover:bg-[#511313] hover:text-[#FF1033] text-[#FFFDF5] py-3 rounded-full text-sm font-bold transition-all duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplyModal;
