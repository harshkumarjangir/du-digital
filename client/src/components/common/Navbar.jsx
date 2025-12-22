
import { useState } from "react";
import siteData from "../../data/navigationData.json";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { navbar } = siteData;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [activeChild, setActiveChild] = useState(null);

  return (
    <header className="bg-white relative z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href={navbar.logo.link} className="flex items-center gap-2">
          <img src={navbar.logo.src} alt={navbar.logo.alt} className="h-20" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-8">
          {navbar.items.map((item, i) => (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => {
                setActive(null);
                setActiveChild(null);
              }}
            >
              <a
                href={item.link || "#"}
                className="font-medium text-gray-800 hover:text-red-600 flex items-center gap-1"
              >
                {item.label}
                {item.children && "▾"}
              </a>

              {/* Mega Menu */}
              {item.children && active === i && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-6 w-[900px] bg-white shadow-xl rounded-xl flex overflow-hidden">
                  {/* Level 1 */}
                  <div className="w-1/2 border-r">
                    {item.children.map((child, cIndex) => (
                      <div
                        key={cIndex}
                        onMouseEnter={() => setActiveChild(cIndex)}
                        className={`px-6 py-3 cursor-pointer flex justify-between items-center
                          ${activeChild === cIndex
                            ? "bg-gray-100 text-red-600"
                            : "hover:bg-gray-50"
                          }`}
                      >
                        <span>{child.label}</span>
                        {child.children && "›"}
                      </div>
                    ))}
                  </div>

                  {/* Level 2 */}
                  <div className="w-1/2 bg-gray-50">
                    {item.children[activeChild]?.children ? (
                      <ul className="py-4">
                        {item.children[activeChild].children.map(
                          (sub, sIndex) => (
                            <li key={sIndex}>
                              <a
                                href={sub.link}
                                className="block px-6 py-2 hover:bg-white hover:text-red-600"
                              >
                                {sub.label}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <div className="p-6 text-gray-400">
                        Select a category
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="lg:hidden flex items-center gap-6">
          {/* Phone Number */}
          <div className="text-gray-600">
            <a href="tel:+919876543210" className="flex items-center gap-2">
              <img src="/assets/navbar/phone.png" alt="Phone" className="w-8 h-8" />
              {/* <Phone className="w-8 h-8 text-red-600 bg-red-600 bg-clip-text" /> */}
            </a>
          </div>


          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-3xl font-bold"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* {open && (
        <div className="lg:hidden bg-white border-t">
          {navbar.items.map((item, i) => (
            <MobileItem key={i} item={item} />
          ))}
        </div>
      )} */}
      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40">
          <div className="h-full w-[80vw] bg-[#252423] text-white overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setOpen(false)} className="text-2xl">
                ✕
              </button>
            </div>

            <div className="divide-y divide-white/10">
              {navbar.items.map((item, i) => (
                <MobileItem key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}

    </header>
  );
}

/* ---------- Mobile Recursive Item ---------- */

// function MobileItem({ item }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="border-b h-screen w-[80vw] inset-y-0 left-0  fixed z-50 bg-[#252423] text-white">
//       <div
//         className="px-6 py-4 flex justify-between items-center"
//         onClick={() => setOpen(!open)}
//       >
//         <a href={item.link || "#"}>{item.label}</a>
//         {item.children && <span>{open ? "−" : "+"}</span>}
//       </div>

//       {open && item.children && (
//         <div className="pl-6 bg-gray-50 text-[#252423]  ">
//           {item.children.map((child, i) => (
//             <MobileItem key={i} item={child} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState } from "react";

function MobileItem({ item, level = 0 }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children?.length > 0;

  return (
    <div>
      {/* Item Row */}
      <div
        className={`flex justify-between items-center px-6 py-4 cursor-pointer ${level === 0 ? "text-white" : "text-gray-300"
          }`}
        onClick={() => hasChildren && setOpen(!open)}
      >
        <a href={item.link || "#"} className="block w-full">
          {item.label}
        </a>

        {hasChildren && (
          <span className="ml-2 text-xl">
            {open ? "−" : "+"}
          </span>
        )}
      </div>

      {/* Children */}
      {open && hasChildren && (
        <div className="pl-4 bg-[#2f2e2d]">
          {item.children.map((child, i) => (
            <MobileItem key={i} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// export default MobileItem;

export default Navbar;