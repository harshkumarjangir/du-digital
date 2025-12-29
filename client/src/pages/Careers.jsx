import { useState } from "react";
import data from "../data/careers.json";

import CareersHero from "../components/careers/CareersHero";
import WorkingAt from "../components/careers/WorkingAt";
import CareerOpportunities from "../components/careers/CareerOpportunities";
import ApplyModal from "../components/careers/ApplyModal";
import JobDescriptionModal from "../components/careers/JobDescriptionModal";

const Careers = () => {
    const [applyOpen, setApplyOpen] = useState(false);
    const [jobView, setJobView] = useState(null);

    return (
        <>
            <CareersHero data={data.hero} />
            <WorkingAt data={data.working} />
            <CareerOpportunities
                jobs={data.jobs}
                onApply={() => setApplyOpen(true)}
                onView={setJobView}
            />

            <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
            <JobDescriptionModal job={jobView} onClose={() => setJobView(null)} />
        </>
    );
};

export default Careers;
