import { FaLinkedin, FaGithub } from "react-icons/fa";
import Starfield from "../Components/StarField.jsx";

const teams = [
  {
    name: "",
    members: [
      {
        name: "Shloka Mengade",
        role: "President",
        description:
          "President @Coding Club RSCOE | Focused on Databases, Networking and On-Premise Systems | Passionate about Japanese Language and Culture | Inspired by the Kaizen Principle of Continuous Improvement",
        image:
          "https://media.licdn.com/dms/image/v2/D4E03AQHSTLuAAb2_tQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730034710824?e=1747872000&v=beta&t=nGuTBVPitFNUBFObSjpPiS8mop1VXJ2u08g6Vt51tg4",
        socials: {
          linkedin: "https://www.linkedin.com/in/shloka-mengade-6284822b7/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Khushi Rane",
        role: "Vice President",
        description:
          "Building Bridges Between Code and Infrastructure | DevOps Enthusiast | Automating Excellence",
        image:
          "https://media.licdn.com/dms/image/v2/D4D35AQGw9UpYFXpExg/profile-framedphoto-shrink_200_200/B4DZVRGFTYG8Ac-/0/1740822304274?e=1742727600&v=beta&t=PVl7k8p4QmsNn8X6UdTvUzDwvcTt1gstxc5Y1Z9BRkI",
        socials: {
          linkedin: "https://www.linkedin.com/in/khushi-rane-798271345/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Yash Patil",
        role: "Vice President",
        description:
          "Vice President @Coding Club RSCOE | Computer Engineering Student",
        image:
          "https://media.licdn.com/dms/image/v2/D5603AQF-zSHOt4xSnA/profile-displayphoto-shrink_200_200/B56ZSEHyHbHsAY-/0/1737383421182?e=1747872000&v=beta&t=I-BiyMDG6DpYk-ZshHq0-73lVBCnnRbapRNzOJqxuEU",
        socials: {
          linkedin: "https://www.linkedin.com/in/yash-patil-069820252/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Pratibha Jape",
        role: "CTO & Treasurer",
        description:
          "JSPM's Rajarshi Shahu College of Engineering |Treasurer @Coding Club RSCOE | Web Developer | ",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQEAniV2JFbjcw/profile-displayphoto-shrink_200_200/B4DZWepEdrGcAY-/0/1742123322863?e=1747872000&v=beta&t=sdxEz1xz7DtswZe9ZeGzbYSNde7wQEM8jv8y0RnEbcM",
        socials: {
          linkedin: "https://www.linkedin.com/in/pratibha-jape-80182b245/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Shreya Patil",
        role: "Club Admin",
        description:
          "Student at JSPM's Rajarshi Shahu College of Engineering | Club Admin @Coding Club RSCOE",
        image:
          "https://media.licdn.com/dms/image/v2/D5603AQEkelvaapQ9kA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1687515858820?e=1747872000&v=beta&t=oZOQHUy_WVwmj7GlhHMMI3BxWyxxSn0l6el3JbehWx4",
        socials: {
          linkedin: "https://www.linkedin.com/in/shreya-patil-97b3a1257/",
          github: "#",
          twitter: "#",
        },
      },
    ],
  },
  {
    name: "",
    members: [
      {
        name: "Parth Kulkarni",
        role: "Database Lead",
        description: "Developer With Passion",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQHYSUVN8QGW-Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721233425938?e=1747872000&v=beta&t=sn8RBV1CVmAs0ca_I0fsV7GuyzoFEQPWpX72z1g-AaY",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/parth-tulshidas-kulkarni-84b343292/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Radha Supatgaonkar",
        role: "Technical Operations Lead",
        description:
          "JSPM's Rajarshi Shahu College of Engineering • Computer Science and Business Systems (CSBS) Coding Club Of RSCOE",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQF6tYnpy3VGsw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722260217913?e=1747872000&v=beta&t=eVZI_GaqKwESXToHVH2LLOrxabLu1reEQuZwJBOMbMo",
        socials: {
          linkedin: "https://www.linkedin.com/in/radha-supatgaonkar-099aa02b7/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Avanti Rohite",
        role: "Code Warrior",
        description:
          "Pursuing BTech in Computer Science at JSPM's RSCOE || Code Warrior @CodingClubRSCOE || Training and Placement Coordinator || Programmer || Java || Frontend Developer || C || C++ || Collaborative Project Enthusiast",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQGD1EbniE2gJg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1714134538244?e=1747872000&v=beta&t=bka31XyGQfXednwJH8RzaoICBR3cGwhTV0Pn1oe4Xqg",
        socials: {
          linkedin: "https://www.linkedin.com/in/awanti-rohite-a69891297/",
          github: "#",
          twitter: "#",
        },
      },
    ],
  },
  {
    name: "Web Team",
    members: [
      {
        name: "Subhrat Verma",
        role: "Web Lead",
        description:
          "Web team lead @Coding Club RSCOE | MERN STACK | Competitive Programming | S.Y B-Tech Computer Science |",
        image:
          "https://media.licdn.com/dms/image/v2/D5635AQHJby3c-Ex-6g/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1733644779666?e=1742724000&v=beta&t=YM8iQ8hT_fCxTtCWA6TsTfE6s-wmd40T4q-5Eya7S2s",
        socials: {
          linkedin: "https://www.linkedin.com/in/subhrat-verma-006112287/",
          github: "#",
          twitter: "#",
        },
      },

      {
        name: "Atharvashree Padwal",
        role: "Jr. Web Lead",
        description:
          "Jr. Web Lead @CodingClubRSCOE | Driven by Code | MERN Enthusiast | Aspiring Full-Stack Developer",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQHhGaXRbTKCiA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724486142418?e=1747872000&v=beta&t=T9W-OCJGxhD5nETyhVZbsrrQPPJhJhOWvO3Sbu08gDw",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/atharvashree-padwal-253b802b7/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Omanand Swami",
        role: "Backend Lead",
        description:
          "MERN Dev 🧑🏻‍💻| Building with LangFlow | RSCOE'27 | DSY@CSBS (Computer Science & Business Systems) @JSPM's RSCOE, Pune | Under Grad!.",
        image:
          "https://media.licdn.com/dms/image/v2/D5603AQGg8wqpDU1cdQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1728483317208?e=1747872000&v=beta&t=SXPAuDdiSS8CQEwtuHARNEiIwwasyxzheKZOgZ_dDnM",
        socials: {
          linkedin: "https://www.linkedin.com/in/omanandswami2005/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Avdhoot Patankar",
        role: "Web Developer",
        description:
          "Future Engineer | Coding Enthusiast & Problem Solver | Web Dev | IoT & Embedded Systems",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQFMe7xfzZOpeA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722683382494?e=1747872000&v=beta&t=YONYPVjdmDIRjofa5fr6n8ubtuvd_OkYQgvUueDdxaQ",
        socials: {
          linkedin: "https://www.linkedin.com/in/avdhoot-patankar-8b2831299/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Prachi Sukre",
        role: "Web Developer",
        description:
          "Computer Engineering Student | Web Team @Coding Club RSCOE | Member of ISTE student Chapter |",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQG9mYLV1qvkaA/profile-displayphoto-shrink_100_100/B4DZWeVP2IHIAU-/0/1742118158075?e=1747872000&v=beta&t=oRY9Flvsh9Y0591xlJDW5-M5E79QoMIHuZ-tZdNbbeA",
        socials: {
          linkedin: "https://www.linkedin.com/in/prachisukre/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Rahman Khan",
        role: "Web Developer",
        description:
          "Data Science Enthusiast | Web Dev Team Coding Club RSCOE | Competitive Programming",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQGIIOmC46H1Rg/profile-displayphoto-shrink_100_100/B4DZUaSvxTHAAU-/0/1739902878737?e=1747872000&v=beta&t=AqS7F-57FvZ_epeYb7Ch-RzPnyGvKUSksQY2Va91ZHQ",
        socials: {
          linkedin: "https://www.linkedin.com/in/rahmankhan3/",
          github: "#",
          twitter: "#",
        },
      },
    ],
  },
  {
    name: "Operations and Outreach Team",
    members: [
      {
        name: "Ayush Pagar",
        role: "",
        description: "Savitribai Phule Pune University (SPPU).",
        image:
          "https://media.licdn.com/dms/image/v2/D4E03AQF1Ss0oub8DXw/profile-displayphoto-shrink_200_200/B4EZWarQedGgAc-/0/1742056786772?e=1747872000&v=beta&t=nFKXcLddBNihiolaMXk020zZlr8Kadumgh8x8NLQv_o",
        socials: {
          linkedin: "https://www.linkedin.com/in/ayush-pagar-542ab42b1/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Atharva Kulthe",
        role: "",
        description: "Attended JSPM’S RSCOE",
        image: "cc.jpg",
        socials: {
          linkedin: "https://www.linkedin.com/in/atharva-kulthe-1154832b7/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Tanmay Ghodke",
        role: "",
        description:
          "CSE Sophomore | Web Team Coordinator @ IEEE RSCOE Student Branch | PR Team @ Coding Club RSCOE | Web Development & AI/ML Enthusiast",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQEvO0BkshOLRw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1708833327152?e=1747872000&v=beta&t=x47Og4ebql6yr16Ew8RBbAqgDtrEgcdP6TuGQ6zdsyM",
        socials: {
          linkedin: "https://www.linkedin.com/in/tanmay-ghodke/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Prathamesh Shelke",
        role: "",
        description: "Attended JSPM's Rajarshi Shahu College of Engineering",
        image: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/prathamesh-shelke-b524822b7/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Ekta Phople",
        role: "",
        description:
          "Persuing Computer Science Engineering at JSPM's Rajarshi Shahu College of Engineering || Persistent Kiran Scholar",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQE2vqoE9jurTg/profile-displayphoto-shrink_200_200/B4DZVWQjTfHYAc-/0/1740908935711?e=1747872000&v=beta&t=6qpuJQTuBMW_JVggG4U0tlJyXM2ol4o_ivo4GuHtTdM",
        socials: {
          linkedin: "https://www.linkedin.com/in/ekta-phopale-535780292/",
          github: "#",
          twitter: "#",
        },
      },
    ],
  },
  {
    name: "Design Team",
    members: [
      {
        name: "Anushka Pawar",
        role: "Designer",
        description: "",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQHsPUdMxMboZg/profile-displayphoto-shrink_100_100/B4DZWj2CHJH4AY-/0/1742210617205?e=1747872000&v=beta&t=TnpjMvW-cbo_i7pN3xzH449yA9uRvdtzmof4an8aq40",
        socials: {
          linkedin: "https://www.linkedin.com/in/anushka-pawar-26baa02b7/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Adwita Udare",
        role: "Designer",
        description: "",
        image: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/adwita-udare-07a4812b7/",
          github: "#",
          twitter: "#",
        },
      },
    ],
  },
  {
    name: "GFX Team",
    members: [
      /*{
        name: "",
        role: "",
        description:
          "",
        image: "",
        socials: { linkedin: "#", github: "#", twitter: "#" },
      },*/
      {
        name: "Simrah Shaikh",
        role: "GFX Lead",
        description:
          "Exploring AI, ML & Web Dev | Coding My Way to Innovation ",
        image:
          "https://media.licdn.com/dms/image/v2/D4E03AQFnmlnJ3eOU2w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1704919594501?e=1747872000&v=beta&t=hM9Cnz25ewUBnXtDBtwWjPuyTVsQaRDO6-QslSgRzHg",
        socials: {
          linkedin: "https://www.linkedin.com/in/simrah-shaikh-b473ab280/",
          github: "#",
          twitter: "#",
        },
      },
      {
        name: "Saundarya Karhade",
        role: "GFX Creator",
        description: "Programmer |C &C++|DSA|JAVA|editor|Graphic Designing|",
        image:
          "https://media.licdn.com/dms/image/v2/D4D03AQEl7oxv7TCoNA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718176905214?e=1747872000&v=beta&t=De712SV0oag8AgAL8wfDCo5Ph7wf3SfiBaU1Xx3-9Ak",
        socials: {
          linkedin: "https://www.linkedin.com/in/saundarya-karhade-1aa35b26a/",
          github: "#",
          twitter: "#",
        },
      },
    ],
  },
];
const Teams = () => {
  return (
    <>
      <div className="bg fixed w-full h-full -z-10">
        <Starfield />
      </div>
      <div className="min-h-screen text-white py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#ffffff]">Meet Our Team</h1>
          <p className="text-gray-300 mt-2">
            The passionate minds behind our success.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          {teams.map((team, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-3xl font-bold text-[#ccb3e3] mb-20">
                {team.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {team.members.map((member, i) => (
                  <div
                    key={i}
                    className="relative glassmorphism backdrop-blur-lg rounded-lg p-6 text-center shadow-lg hover:scale-105 transition duration-300 border border-white/20"
                  >
                    <div className="absolute -top-5 left-1/2  rounded-full transform -translate-x-1/2">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-28 h-28 rounded-full object-cover border-2 border-[#8e59d3] shadow-md"
                      />
                    </div>
                    <div className="mt-24">
                      <h3 className="text-lg font-semibold text-[#c084fc]">
                        {member.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{member.role}</p>
                      <p className="text-gray-300 mt-3 text-sm">
                        {member.description}
                      </p>
                      <div className="mt-4 flex justify-center space-x-4 text-[#c084fc]">
                        {member.socials.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin className="text-xl hover:text-white transition" />
                          </a>
                        )}

                        {/*member.socials.twitter && (
                          <a
                            href={member.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaTwitter className="text-xl hover:text-white transition" />
                          </a>
                        )*/}

                        {member.socials.github && (
                          <a
                            href={member.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaGithub className="text-xl hover:text-white transition" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Teams;
