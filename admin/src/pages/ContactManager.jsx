import { useState, useEffect } from "react";
import { getInquiries } from "../services/api";
import {
  Mail,
  CheckCircle,
  XCircle,
  Phone,
  Clock,
  User,
  MessageSquare,
} from "lucide-react";

const ContactManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        Loading Inquiries...
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="mb-2">Contact Inquiries</h1>
          <p className="text-muted">Manage customer inquiries and messages</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-primary">{inquiries.length} Total</span>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="card">
          <div className="card-body text-center">
            <MessageSquare
              size={48}
              className="text-muted mb-3"
              style={{ opacity: 0.3 }}
            />
            <h3 className="text-muted">No inquiries found</h3>
            <p className="text-muted">
              Customer inquiries will appear here when they contact you.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {inquiries.map((inq) => (
            <div key={inq._id} className="card">
              <div className="card-header">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#dbeafe",
                        color: "#3b82f6",
                      }}>
                      <User size={20} />
                    </div>
                    <div>
                      <h4
                        className="mb-1"
                        style={{ fontSize: "1rem", fontWeight: "600" }}>
                        {inq.fullName}
                      </h4>
                      <div className="d-flex align-items-center gap-2 text-muted">
                        <Mail size={14} />
                        <span style={{ fontSize: "0.875rem" }}>
                          {inq.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 text-muted">
                    <Clock size={14} />
                    <span style={{ fontSize: "0.875rem" }}>
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="mb-3">
                  <h5
                    className="mb-2"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#374151",
                    }}>
                    Message:
                  </h5>
                  <div
                    className="p-3"
                    style={{
                      backgroundColor: "#f8fafc",
                      borderRadius: "0.5rem",
                      border: "1px solid #e2e8f0",
                      fontSize: "0.875rem",
                      lineHeight: "1.6",
                    }}>
                    {inq.message}
                  </div>
                </div>

                <div className="d-flex align-items-center gap-4">
                  <div className="d-flex align-items-center gap-2">
                    <Phone size={16} className="text-muted" />
                    <span style={{ fontSize: "0.875rem" }}>
                      {inq.phone || "Not provided"}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      Marketing Consent:
                    </span>
                    {inq.AllowMsg ? (
                      <div className="d-flex align-items-center gap-1 text-success">
                        <CheckCircle size={16} />
                        <span
                          style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                          Yes
                        </span>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center gap-1 text-danger">
                        <XCircle size={16} />
                        <span
                          style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                          No
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactManager;
