import contactData from '../data/contactData.json'

const ContactUs = () => {
    const { hero, offices, form } = contactData;

    return (
        <div className="w-full">
            {/* ===== Hero ===== */}
            <section
                className="h-[320px] bg-cover bg-center relative flex items-center justify-center"
                style={{ backgroundImage: `url(${hero.backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <h1 className="relative z-10 text-white text-4xl font-semibold">
                    {hero.title}
                </h1>
            </section>

            {/* ===== Offices ===== */}
            <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {offices.map((office, i) => (
                    <div
                        key={i}
                        className="bg-white shadow-md rounded-lg p-6 space-y-3"
                    >
                        <h3 className="font-semibold text-lg">{office.title}</h3>

                        <p className="text-sm text-gray-600">{office.address}</p>

                        <p className="text-sm">
                            📞 <span className="font-medium">{office.phone}</span>
                        </p>

                        <p className="text-sm">
                            ✉️{" "}
                            <a
                                href={`mailto:${office.email}`}
                                className="text-red-600 hover:underline"
                            >
                                {office.email}
                            </a>
                        </p>
                    </div>
                ))}
            </section>

            {/* ===== Contact Form ===== */}
            <section className="max-w-4xl mx-auto px-6 pb-20 text-center">
                <h2 className="text-2xl font-semibold">{form.title}</h2>
                <p className="text-gray-600 mt-2">{form.subtitle}</p>

                <form className="mt-10 space-y-6 text-left">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full border rounded-md px-4 py-3"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full border rounded-md px-4 py-3"
                        required
                    />

                    <input
                        type="tel"
                        placeholder="Phone"
                        className="w-full border rounded-md px-4 py-3"
                        required
                    />

                    <textarea
                        placeholder="Message"
                        rows="5"
                        className="w-full border rounded-md px-4 py-3"
                    />

                    <label className="flex items-start gap-2 text-sm text-gray-600">
                        <input type="checkbox" className="mt-1" />
                        By submitting my details, I authorize DU Global to contact me via
                        Call / SMS / WhatsApp / Email.
                    </label>

                    <button
                        type="submit"
                        className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700"
                    >
                        Submit
                    </button>
                </form>
            </section>

            {/* ===== Maps ===== */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-16">
                {offices.slice(1).map((office, i) => (
                    <iframe
                        key={i}
                        src={office.mapEmbed}
                        className="w-full h-[300px] border rounded-md"
                        loading="lazy"
                    />
                ))}
            </section>
        </div>
    );
}
export default ContactUs;