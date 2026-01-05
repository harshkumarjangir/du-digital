import CardData from "../components/swifttravels/CardData";
import data from "../data/swifttravels.json";
export const Swifttravels = () => {
  return (
    <>
      <section className="relative w-full h-[800px] overflow-hidden">
        {/* IMAGE (Right → Left) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.hero.image})` }}
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          exit={{ x: -200 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT (Bottom → Up) */}
        <div
          className="relative z-20 max-w-7xl mx-auto px-6 md:px-20 h-full flex items-center"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, delay: 0.3 }}>
          <div className="max-w-2xl text-white">
            <h1 className="text-2xl md:text-5xl font-semibold leading-tight">
              {data.hero.title}
            </h1>

            <p className="mt-4 text-base md:text-lg text-gray-200">
              {data.hero.description}
            </p>
          </div>
        </div>
      </section>
      <div className="flex justify-center  items-center my-5 flex-col">
        <h2 class="text-5xl  my-5 font-bold">Travel Packages</h2>
        <div className="border-2 border-red-800 w-20"></div>
      </div>

      <CardData />
    </>
  );
};
