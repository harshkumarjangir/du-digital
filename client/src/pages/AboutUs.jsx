import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AboutHero from "../components/about-us/AboutHero";
import OurFootprints from "../components/about-us/OurFootprints";
import OurStrengths from "../components/about-us/OurStrengths";
import TeamGrid from "../components/about-us/TeamGrid";
import Timeline from "../components/about-us/Timeline";
import VisionMission from "../components/about-us/VisionMission";
import WhoWeAre from "../components/about-us/WhoWeAre";
import { fetchTeamMembers } from "../redux/slices/teamSlice";
import data from "../data/aboutPage.json";


const AboutUs = () => {
  const dispatch = useDispatch();
  const { teamMembersByCategory, loading, error } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(fetchTeamMembers());
  }, [dispatch]);

  // Define the order in which categories should be displayed
  const categoryOrder = ["Leadership", "Board of Directors", "Management"];

  // Function to get display title for category
  const getCategoryTitle = (category) => {
    const titleMap = {
      "Management": "Management Team",
      "Board of Directors": "Board of Directors",
      "Leadership": "Leadership"
    };
    return titleMap[category] || category;
  };

  // Sort categories based on the defined order
  const sortedCategories = Object.keys(teamMembersByCategory || {}).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);

    // If both are in the order array, sort by their position
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    // If only a is in the order array, it comes first
    if (indexA !== -1) return -1;
    // If only b is in the order array, it comes first
    if (indexB !== -1) return 1;
    // If neither is in the order array, sort alphabetically
    return a.localeCompare(b);
  });

  return (
    <>
      <AboutHero data={data.hero} />
      <WhoWeAre data={data.whoWeAre} />
      <Timeline data={data.timeline} />
      {loading && <div className="text-center py-8">Loading team members...</div>}
      {error && <div className="text-center py-8 text-red-500">Error loading team members: {error}</div>}
      {!loading && !error && (
        <>
          {sortedCategories.map((category) => (
            teamMembersByCategory[category] && teamMembersByCategory[category].length > 0 && (
              <TeamGrid
                key={category}
                title={getCategoryTitle(category)}
                data={teamMembersByCategory[category]}
              />
            )
          ))}
        </>
      )}
      <VisionMission data={data.visionMission} />
      <OurStrengths data={data.strengths} />
      <OurFootprints aboutSection={data.aboutSection} data={data.footprints} />
    </>
  );
};

export default AboutUs;
