import data from "../../data/footerCopyright.json";

const Copyright = () => {
    return (
        <div className="bg-[#AC0826] text-white px-8">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:px-10 py-4 md:flex-row">

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
