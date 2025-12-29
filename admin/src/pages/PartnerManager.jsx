import { useState, useEffect } from 'react';
import { getPartnerRequests } from '../services/api';
import { Users, CheckCircle, XCircle } from 'lucide-react';

const PartnerManager = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const data = await getPartnerRequests();
            setRequests(data);
        } catch (error) {
            console.error("Error fetching partner requests", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading Requests...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Partner Program Requests</h1>
            {requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                    {requests.map(req => (
                        <div key={req._id} style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <Users size={20} color="#007bff" />
                                    <span style={{ fontWeight: 'bold' }}>{req.fullName}</span>
                                    <span style={{ color: '#666', fontSize: '0.9rem' }}> &lt;{req.email}&gt;</span>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#999' }}>
                                    {new Date(req.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div><strong>Phone:</strong> {req.phone || 'N/A'}</div>
                                <div><strong>City:</strong> {req.city || 'N/A'}</div>
                                <div><strong>Looking For:</strong> {req.lookingFor || 'N/A'}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <strong>Msg Allowed:</strong> {req.isMsg ? <CheckCircle size={14} color="green"/> : <XCircle size={14} color="red"/>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PartnerManager;
