import { useState, useEffect } from "react";
import {
  getCategories,
  getReportsByCategory,
  createReport,
  updateReport,
  deleteReport,
} from "../services/api";
import ReportForm from "../components/ReportForm";
import { Trash2, FileText, Folder, Edit3 } from "lucide-react";

const InvestorRelations = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  const backendUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchReports(selectedCategory.slug);
    } else {
      setReports([]);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
      if (data.length > 0) setSelectedCategory(data[0]);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchReports = async (slug) => {
    setLoading(true);
    try {
      const data = await getReportsByCategory(slug);
      // data contains { category, reports }
      setReports(data.reports);
    } catch (error) {
      console.error("Error fetching reports", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (formData, reportId) => {
    try {
      if (reportId) {
        // Update existing report
        await updateReport(reportId, formData);
        setEditingReport(null);
      } else {
        // Create new report
        await createReport(formData);
      }
      if (selectedCategory) {
        fetchReports(selectedCategory.slug);
      }
    } catch (error) {
      console.error("Error saving report:", error);
      throw error;
    }
  };

  const handleEdit = (report) => {
    setEditingReport(report);
  };

  const handleCancelEdit = () => {
    setEditingReport(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    try {
      await deleteReport(id);
      if (selectedCategory) {
        fetchReports(selectedCategory.slug);
      }
    } catch (error) {
      console.error("Error deleting report", error);
      alert("Failed to delete report");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
      {/* Sidebar / Category List */}
      <div
        style={{
          flex: "1",
          minWidth: "250px",
          borderRight: "1px solid #eee",
          paddingRight: "1rem",
        }}>
        <h2>Categories</h2>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "10px",
                borderRadius: "4px",
                cursor: "pointer",
                background:
                  selectedCategory?._id === cat._id ? "#e6f0ff" : "transparent",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
              <Folder size={18} />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: "3" }}>
        {selectedCategory ? (
          <>
            <h1 style={{ marginBottom: "20px" }}>
              {selectedCategory.name} Reports
            </h1>

            <div style={{ marginBottom: "2rem" }}>
              <ReportForm
                categoryId={selectedCategory._id}
                onUploadSuccess={handleUpload}
                editingReport={editingReport}
                onCancelEdit={handleCancelEdit}
              />
            </div>

            <h2>Existing Reports</h2>
            {loading ? (
              <p>Loading reports...</p>
            ) : (
              <div style={{ display: "grid", gap: "1rem" }}>
                {reports.length === 0 ? (
                  <p>No reports found.</p>
                ) : (
                  reports.map((report) => (
                    <div
                      key={report._id}
                      style={{
                        padding: "1rem",
                        border: "1px solid #eee",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: editingReport?._id === report._id ? "#fff9e6" : "#fff",
                      }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}>
                        <FileText size={24} color="#555" />
                        <div>
                          <div style={{ fontWeight: "bold" }}>
                            {report.title}
                          </div>
                          <div style={{ fontSize: "0.9rem", color: "#666" }}>
                            {report.financialYear} •{" "}
                            {new Date(report.uploadedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <a
                          href={`${backendUrl}${report.fileUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ textDecoration: "none", color: "#007bff" }}>
                          View
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            console.log("Edit clicked", report);
                            handleEdit(report);
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#007bff",
                            padding: "5px",
                          }}
                          title="Edit report">
                          <Edit3 size={20} style={{ pointerEvents: "none" }} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(report._id)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#dc3545",
                          }}
                          title="Delete report">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        ) : (
          <p>Select a category to manage reports.</p>
        )}
      </div>
    </div>
  );
};

export default InvestorRelations;
