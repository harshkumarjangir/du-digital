import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TravelPackage,
  SendQueryTravelPackage,
  resetFormState,
} from "../../redux/slices/travelPackagesSlice";

const CardData = () => {
  const dispatch = useDispatch();
  const { loading, error, data, formLoading, formError, formSuccess } = useSelector(
    (state) => state.travelPackages
  );

  const [modelId, setModelId] = useState(null);

  useEffect(() => {
    dispatch(TravelPackage());
  }, [dispatch]);

  // Handle success after form submission
  useEffect(() => {
    if (formSuccess) {
      // Close modal after 2 seconds on success
      setTimeout(() => {
        setModelId(null);
        dispatch(resetFormState());
      }, 2000);
    }
  }, [formSuccess, dispatch]);

  const handleClick = (e) => {
    setModelId(e);
    dispatch(resetFormState()); // Reset form status when opening modal
  };

  const handleCloseModal = () => {
    setModelId(null);
    dispatch(resetFormState());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetFormState()); // Clear previous messages
    dispatch(SendQueryTravelPackage({
      name: e.target.customerName.value,
      email: e.target.email.value,
      mobileNumber: e.target.mobileNumber.value,
      adult: e.target.adult.value,
      child: e.target.child.value,
      infant: e.target.infant.value,
      travelDate: e.target.travelDate.value,
      packageId: modelId
    }));
  };

  // Get selected package data
  const selectedPackage = modelId ? data.find((event) => event._id === modelId) : null;

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-xl">Loading...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-xl text-red-600">Error: {error}</div>
        </div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((event) => (
              <div
                key={event._id}
                className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                onClick={() => handleClick(event._id)}>
                {/* IMAGE */}
                <div className="h-[420px] relative">
                  {event.bannerImage ? (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_IMAGES_URL}${
                        event.bannerImage
                      }`}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300" />
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
                </div>

                {/* CONTENT */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="font-semibold text-lg leading-snug mb-4">
                    {event.title.split("-")[0]}
                  </h3>
                  <p>
                    {event.title.split("-").length > 1 &&
                      event.title.split("-")[1]}
                  </p>
                  <p>Starting INR {event.startingPrice}</p>
                </div>
              </div>
            ))}
          </div>

          {/* MODAL */}
          {modelId && selectedPackage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="relative w-full max-w-5xl mx-4 bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* LEFT SIDE */}
                <div className="bg-[#b53034] text-white p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    {selectedPackage.title.split("-")[0]}
                    <br />
                    {selectedPackage.title.split("-").length > 1 &&
                      selectedPackage.title.split("-")[1]}
                  </h2>

                  <ul className="space-y-3 text-sm">
                    {selectedPackage.description.split("\n").map((highlight, index) => (
                      <li key={index}>✔ {highlight}</li>
                    ))}
                  </ul>
                </div>

                {/* RIGHT SIDE FORM */}
                <div className="p-6">
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl">
                    ✕
                  </button>

                  <h3 className="text-xl font-semibold mb-4">Travel Inquiry</h3>

                  {/* Success Message */}
                  {formSuccess && (
                    <div className="p-3 rounded-md mb-4 text-center font-medium bg-green-100 text-green-700">
                      ✅ Inquiry submitted successfully!
                    </div>
                  )}

                  {/* Error Message */}
                  {formError && (
                    <div className="p-3 rounded-md mb-4 text-center font-medium bg-red-100 text-red-700">
                      ❌ Error: {formError}
                    </div>
                  )}

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="customerName"
                      placeholder="Name"
                      className="w-full border rounded-md px-3 py-2"
                      required
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="tel"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        className="border rounded-md px-3 py-2"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="border rounded-md px-3 py-2"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="number"
                        name="adult"
                        placeholder="Adult"
                        defaultValue={1}
                        min={1}
                        className="border rounded-md px-3 py-2"
                        required
                      />
                      <input
                        type="number"
                        name="child"
                        placeholder="Child"
                        defaultValue={0}
                        min={0}
                        className="border rounded-md px-3 py-2"
                        required
                      />
                      <input
                        type="number"
                        name="infant"
                        placeholder="Infant"
                        defaultValue={0}
                        min={0}
                        className="border rounded-md px-3 py-2"
                      />
                    </div>

                    <input
                      type="date"
                      name="travelDate"
                      className="w-full border rounded-md px-3 py-2"
                      required
                    />

                    <button
                      type="submit"
                      disabled={formLoading || formSuccess}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-2 rounded-md font-semibold">
                      {formLoading ? "Submitting..." : formSuccess ? "Submitted!" : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CardData;
