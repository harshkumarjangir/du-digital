import { useState } from 'react';

const ReportForm = ({ categoryId, onUploadSuccess }) => {
    const [title, setTitle] = useState('');
    const [financialYear, setFinancialYear] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryId || !file) {
            alert("Please select a category and a file.");
            return;
        }

        const formData = new FormData();
        formData.append('categoryId', categoryId);
        formData.append('title', title);
        formData.append('financialYear', financialYear);
        formData.append('pdf', file);

        setLoading(true);
        try {
            await onUploadSuccess(formData);
            setTitle('');
            setFinancialYear('');
            setFile(null);
            // Reset file input value manually if needed
            e.target.reset(); 
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>Upload New Report</h3>
            <div>
                <label>Title:</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                />
            </div>
            <div>
                <label>Financial Year (e.g. 2023-24):</label>
                <input 
                    type="text" 
                    value={financialYear} 
                    onChange={(e) => setFinancialYear(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                />
            </div>
            <div>
                <label>PDF File:</label>
                <input 
                    type="file" 
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                    style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                />
            </div>
            <button type="submit" disabled={loading} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                {loading ? 'Uploading...' : 'Upload Report'}
            </button>
        </form>
    );
};

export default ReportForm;
