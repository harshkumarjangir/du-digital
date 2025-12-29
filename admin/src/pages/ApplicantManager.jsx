import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicantManager = () => {
    const [applicants, setApplicants] = useState([]);
    const [careers, setCareers] = useState([]);
    const [selectedCareer, setSelectedCareer] = useState('');

    useEffect(() => {
        fetchCareers();
        fetchApplicants();
    }, []);

    useEffect(() => {
        fetchApplicants();
    }, [selectedCareer]);

    const fetchCareers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/careers');
            setCareers(response.data);
        } catch (error) {
            console.error('Error fetching careers:', error);
        }
    };

    const fetchApplicants = async () => {
        try {
            let url = 'http://localhost:3000/api/employees';
            if (selectedCareer) {
                url += `?careerId=${selectedCareer}`;
            }
            const response = await axios.get(url);
            setApplicants(response.data);
        } catch (error) {
            console.error('Error fetching applicants:', error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Job Applicants</h1>
                <div className="w-64">
                    <select
                        value={selectedCareer}
                        onChange={(e) => setSelectedCareer(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">All Jobs</option>
                        {careers.map(career => (
                            <option key={career._id} value={career._id}>{career.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 text-left">Applied Date</th>
                            <th className="py-2 px-4 text-left">Full Name</th>
                            <th className="py-2 px-4 text-left">Applied For</th>
                            <th className="py-2 px-4 text-left">Email</th>
                            <th className="py-2 px-4 text-left">Phone</th>
                            <th className="py-2 px-4 text-left">CV / Resume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map((item) => (
                            <tr key={item._id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td className="py-2 px-4 font-medium">{item.fullName}</td>
                                <td className="py-2 px-4">
                                    {item.career ? item.career.title : <span className="text-gray-400">General</span>}
                                </td>
                                <td className="py-2 px-4">{item.email}</td>
                                <td className="py-2 px-4">{item.phone}</td>
                                <td className="py-2 px-4">
                                    {item.CVlink ? (
                                        <a 
                                            href={`http://localhost:3000${item.CVlink}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Download CV
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">No CV</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicantManager;
