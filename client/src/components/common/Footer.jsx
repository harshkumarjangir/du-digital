import footerData from "../../data/footerData.json";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaXTwitter
} from "react-icons/fa6";

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  x: FaXTwitter
};

export default function Footer() {
  const {
    logo,
    newsletter,
    socials,
    payments,
    links,
    contact
  } = footerData;

  return (
    <footer className="bg-gradient-to-br from-black via-[#1a0f0f] to-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* LEFT */}
        <div>
          <img src={logo.src} alt={logo.alt} className="w-48 mb-6" />

          <p className="font-semibold mb-4">{newsletter.text}</p>

          <div className="flex items-center border border-white/40 rounded-full overflow-hidden max-w-md">
            <input
              type="email"
              placeholder={newsletter.placeholder}
              className="flex-1 bg-transparent px-4 py-3 outline-none text-sm"
            />
            <button className="px-4">
              <img src={newsletter.submitIcon} alt="submit" className="w-6" />
            </button>
          </div>

          <div className="mt-6">
            <p className="mb-3">{socials.title}</p>
            <div className="flex gap-3">
              {socials.items.map((item, i) => {
                const Icon = socialIcons[item.name];
                return (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    className="w-9 h-9 border border-white/50 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2">{payments.title}</p>
            <img src={payments.image} alt="payments" className="w-40" />
          </div>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-6">{links.title}</h3>
          <ul className="space-y-3">
            {links.items.map((link, i) => (
              <li key={i}>
                <a href={link.url} className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-semibold mb-6">{contact.title}</h3>

          <div className="space-y-4 text-sm leading-relaxed">
            {contact.offices.map((office, i) => (
              <div key={i}>
                {office.city && <p className="font-bold">{office.city}</p>}
                {office.type && (
                  <p>
                    <strong>{office.type}:</strong> {office.address}
                  </p>
                )}
                {!office.type && office.address && <p>{office.address}</p>}
                {office.phone && (
                  <p>
                    <strong>Phone:</strong> {office.phone}
                  </p>
                )}
                {office.email && (
                  <p>
                    <strong>Email:</strong> {office.email}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
