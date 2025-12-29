const TeamMember = require("../dist/models/TeamMember.model.js").default || require("../dist/models/TeamMember.model.js");

const teamMembers = [
    {
        name: "Gagandeep Singh Bhatia",
        designation: "Founder & Managing Director",
        profileImage:
            "https://dudigitalglobal.com/wp-content/uploads/2024/11/Aditya-Sanghi-1.png",
        description:
            "Founder and Managing Director of DU Digital Global with extensive experience in global visa, consular, and mobility services.",
        category: "Leadership"
    },
    {
        name: "Harsh Pradhan",
        designation: "General Manager – Sales",
        profileImage:
            "https://dudigitalglobal.com/wp-content/uploads/2024/11/Aditya-Sanghi-1.png",
        description:
            "Leads the national sales strategy and partner growth initiatives across multiple regions.",
        category: "Management"
    },
    {
        name: "Varghese T C",
        designation: "Senior Manager – Sales",
        profileImage:
            "https://dudigitalglobal.com/wp-content/uploads/2024/11/Aditya-Sanghi-1.png",
        description:
            "Manages sales operations for the southern region and strengthens channel partnerships.",
        category: "Management"
    },
    {
        name: "Anup Kesharinath Jain",
        designation: "General Manager – Sales",
        profileImage:
            "https://dudigitalglobal.com/wp-content/uploads/2024/11/Aditya-Sanghi-1.png",
        description:
            "Oversees western region sales operations with a focus on business expansion and service excellence.",
        category: "Management"
    },
    {
        name: "Satyabrata Singh",
        designation: "Deputy General Manager – Sales",
        profileImage:
            "https://dudigitalglobal.com/wp-content/uploads/2024/11/Aditya-Sanghi-1.png",
        description:
            "Handles eastern region sales and supports strategic partnerships for market expansion.",
        category: "Management"
    },
    {
        name: "Varghese T C",
        designation: "Chairman",
        profileImage:
            "https://dudigitalglobal.com/wp-content/uploads/2024/11/Aditya-Sanghi-1.png",
        description:
            "Manages sales operations for the southern region and strengthens channel partnerships.",
        category: "Board of Directors"
    },
    {
        name: "Anup Kesharinath Jain",
        designation: "Managing Director",
        profileImage:
            "https://dudigitalglobal.com/wp-content/uploads/2024/11/Aditya-Sanghi-1.png",
        description:
            "Oversees western region sales operations with a focus on business expansion and service excellence.",
        category: "Board of Directors"
    },
    {
        name: "Satyabrata Singh",
        designation: "Executive Director",
        profileImage:
            "https://dudigitalglobal.com/wp-content/uploads/2024/11/Aditya-Sanghi-1.png",
        description:
            "Handles eastern region sales and supports strategic partnerships for market expansion.",
        category: "Board of Directors"
    }
];

const seedTeamMembers = async () => {
    try {
        for (const member of teamMembers) {
            await TeamMember.updateOne(
                { name: member.name },
                { $setOnInsert: member },
                { upsert: true },
                {new:true}
            );
        }

        console.log("✅ Team members seeded successfully");
    } catch (error) {
        console.error("❌ Error seeding team members:", error);
    }
};

module.exports = seedTeamMembers;
