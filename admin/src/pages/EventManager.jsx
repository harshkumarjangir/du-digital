import React, { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Edit3,
  Trash2,
  Images,
  Upload,
  X,
  Eye,
  MapPin,
  Clock,
  Users,
} from "lucide-react";
import {
  PageHeader,
  Button,
  FormGroup,
  Input,
  EmptyState,
} from "../components/UI";
import { useToast, ToastContainer } from "../components/Toast";
import {
  EventLoadingCard,
  FormLoadingOverlay,
  SkeletonForm,
} from "../components/LoadingStates";
import axios from "axios";

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image: null,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { toasts, removeToast, showSuccess, showError } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      showError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("date", formData.date);
    data.append("location", formData.location);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (selectedEvent) {
        // Edit mode
        await axios.put(
          `http://localhost:5000/api/events/${selectedEvent._id}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        showSuccess("Event updated successfully");
      } else {
        // Create mode
        await axios.post("http://localhost:5000/api/events", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showSuccess("Event created successfully");
      }
      fetchEvents();
      resetForm();
      setIsEventModalOpen(false);
    } catch (error) {
      console.error("Error saving event:", error);
      showError(`Failed to ${selectedEvent ? "update" : "create"} event`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (eventId, eventTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${eventTitle}"?`))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      showSuccess("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      showError("Failed to delete event");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      location: "",
      description: "",
      image: null,
    });
    setImagePreview(null);
    setSelectedEvent(null);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      date: event.date ? event.date.split("T")[0] : "",
      location: event.location || "",
      description: event.description || "",
      image: null,
    });
    if (event.imageUrl) {
      setImagePreview(`http://localhost:5000/api${event.imageUrl}`);
    } else {
      setImagePreview(null);
    }
    setIsEventModalOpen(true);
  };

  const openGalleryManager = async (event) => {
    setSelectedEvent(event);
    setIsGalleryModalOpen(true);
    fetchGalleryImages(event._id);
  };

  const fetchGalleryImages = async (eventId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/events/${eventId}/images`
      );
      setGalleryImages(response.data);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      showError("Failed to load gallery images");
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const data = new FormData();
    files.forEach((file) => {
      data.append("images", file);
    });

    setUploading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/events/${selectedEvent._id}/images`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      showSuccess(`${files.length} image(s) uploaded successfully`);
      fetchGalleryImages(selectedEvent._id);
    } catch (error) {
      console.error("Error uploading gallery images:", error);
      showError("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Event Manager" description="Loading events..." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventLoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <PageHeader
        title="Event Manager"
        description="Create and manage events with image galleries"
        stats={[
          { label: `${events.length} Total Events`, variant: "bg-primary" },
        ]}
        actions={
          <Button
            onClick={() => {
              resetForm();
              setIsEventModalOpen(true);
            }}>
            <Plus size={16} />
            Add Event
          </Button>
        }
      />

      {events.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events found"
          description="Start by creating your first event to engage your audience."
          action={
            <Button
              onClick={() => {
                resetForm();
                setIsEventModalOpen(true);
              }}>
              <Plus size={16} />
              Create Your First Event
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="card card-hover">
              <div className="card-body">
                {event.imageUrl && (
                  <div className="image-upload-preview has-image mb-3">
                    <img
                      src={`http://localhost:5000/api${event.imageUrl}`}
                      alt={event.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="image-upload-overlay">
                      <div className="image-upload-actions">
                        <button onClick={() => openGalleryManager(event)}>
                          <Images size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <h3
                  className="mb-2"
                  style={{ fontSize: "1.125rem", fontWeight: "600" }}>
                  {event.title}
                </h3>

                <div className="d-flex align-items-center gap-2 mb-2 text-muted">
                  <Clock size={14} />
                  <span style={{ fontSize: "0.875rem" }}>
                    {formatDate(event.date)}
                  </span>
                </div>

                {event.location && (
                  <div className="d-flex align-items-center gap-2 mb-3 text-muted">
                    <MapPin size={14} />
                    <span style={{ fontSize: "0.875rem" }}>
                      {event.location}
                    </span>
                  </div>
                )}

                {event.description && (
                  <p
                    className="text-muted mb-3"
                    style={{ fontSize: "0.875rem", lineHeight: "1.5" }}>
                    {event.description.length > 100
                      ? `${event.description.substring(0, 100)}...`
                      : event.description}
                  </p>
                )}

                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openGalleryManager(event)}>
                    <Images size={14} />
                    Gallery ({galleryImages.length || 0})
                  </Button>

                  <div className="action-buttons">
                    <button
                      className="action-btn btn-edit"
                      title="Edit event"
                      onClick={() => handleEdit(event)}>
                      <Edit3 size={14} />
                    </button>
                    <button
                      className="action-btn btn-delete"
                      onClick={() => handleDelete(event._id, event.title)}
                      title="Delete event">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Event Modal */}
      {isEventModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "600px" }}>
            <div className="modal-header">
              <h2>{selectedEvent ? "Edit Event" : "Add New Event"}</h2>
              <button
                className="modal-close"
                onClick={() => setIsEventModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="form-section">
              {saving && <FormLoadingOverlay message="Creating event..." />}

              <div className="modal-body">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <FormGroup label="Event Title" required>
                    <Input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter event title..."
                      required
                    />
                  </FormGroup>

                  <FormGroup label="Event Date" required>
                    <Input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </div>

                <FormGroup label="Location">
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Event location..."
                  />
                </FormGroup>

                <FormGroup label="Description">
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Event description..."
                    rows={4}
                  />
                </FormGroup>

                <FormGroup label="Thumbnail Image">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                    accept="image/*"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          maxHeight: "200px",
                          objectFit: "cover",
                          borderRadius: "0.5rem",
                        }}
                      />
                    </div>
                  )}
                </FormGroup>
              </div>

              <div className="modal-footer">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsEventModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={saving}
                  disabled={!formData.title || !formData.date}>
                  {selectedEvent ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Manager Modal */}
      {isGalleryModalOpen && selectedEvent && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{ maxWidth: "900px", maxHeight: "80vh" }}>
            <div className="modal-header">
              <h2>Gallery: {selectedEvent.title}</h2>
              <button
                className="modal-close"
                onClick={() => setIsGalleryModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ overflowY: "auto" }}>
              <div className="mb-4">
                <FormGroup label="Upload Images (Multiple Selection)">
                  <input
                    type="file"
                    multiple
                    onChange={handleGalleryUpload}
                    className="form-control"
                    accept="image/*"
                    disabled={uploading}
                  />
                  {uploading && (
                    <div className="d-flex align-items-center gap-2 mt-2 text-primary">
                      <div className="spinner"></div>
                      <span>Uploading images...</span>
                    </div>
                  )}
                </FormGroup>
              </div>

              {galleryImages.length === 0 ? (
                <EmptyState
                  icon={Images}
                  title="No images uploaded"
                  description="Upload images to create a gallery for this event."
                />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((img) => (
                    <div key={img._id} className="card card-hover">
                      <div className="card-body p-2">
                        <img
                          src={`http://localhost:5000/api${img.fileUrl}`}
                          alt="Gallery"
                          style={{
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "0.375rem",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManager;
