import { FaPercentage, FaHandshake, FaRegCheckCircle } from "react-icons/fa";

const iconMap = {
  rates: FaPercentage,
  guidance: FaHandshake,
  fast: FaRegCheckCircle
};

const WhyDuGlobal = ({ data }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-16">
          {data.title}
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {data.items.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <div
                key={index}
                className="border-2 border-red-600 rounded-2xl p-10 flex items-center gap-6"
              >
                <Icon className="text-red-600 text-4xl shrink-0" />
                <p className="text-2xl font-semibold text-red-600">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyDuGlobal;
