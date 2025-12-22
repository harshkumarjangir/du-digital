import data from "../../data/footerCopyright.json";

const Copyright = () => {
    return (
        <div className="bg-gradient-to-r from-[#8b0000] to-[#b30000] text-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row">

                {/* Left */}
                <p className="text-sm">
                    ©{data.year} {data.company}. All rights reserved.
                </p>

                {/* Right */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                    {data.links.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            className="hover:underline transition"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Copyright;
