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

// import AboutHero from "./AboutHero";
// import WhoWeAre from "./WhoWeAre";
// import Timeline from "./Timeline";
// import BoardOfDirectors from "./BoardOfDirectors";
// import ManagementTeam from "./ManagementTeam";
// import Leadership from "./Leadership";
// import VisionMission from "./VisionMission";
// import OurStrengths from "./OurStrengths";
// import OurFootprints from "./OurFootprints";

const AboutUs = () => {
  const dispatch = useDispatch();
  const { teamMembersByCategory, loading, error } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(fetchTeamMembers());
  }, [dispatch]);

  return (
    <>
      <AboutHero data={data.hero} />
      <WhoWeAre data={data.whoWeAre} />
      <Timeline data={data.timeline} />
      {loading && <div className="text-center py-8">Loading team members...</div>}
      {error && <div className="text-center py-8 text-red-500">Error loading team members: {error}</div>}
      {!loading && !error && (
        <>
          {teamMembersByCategory["Board of Directors"] && (
            <TeamGrid 
              title="Board of Directors" 
              data={teamMembersByCategory["Board of Directors"]} 
            />
          )}
          {teamMembersByCategory["Management"] && (
            <TeamGrid 
              title="Management Team" 
              data={teamMembersByCategory["Management"]} 
            />
          )}
          {teamMembersByCategory["Leadership"] && (
            <TeamGrid 
              title="Leadership" 
              data={teamMembersByCategory["Leadership"]} 
            />
          )}
        </>
      )}
      <VisionMission data={data.visionMission} />
      <OurStrengths data={data.strengths} />
      <OurFootprints data={data.footprints} />
    </>
  );
};

export default AboutUs;
