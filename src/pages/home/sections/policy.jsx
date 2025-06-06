import PolicyCard from "../../../components/policycard";
import { MapPinned } from "lucide-react";
import { Cog } from "lucide-react";
import { UsersRound } from "lucide-react";
import { GraduationCap } from "lucide-react";
import SectionHeading from "../../../components/SectionHeading";
const PolicySection = () => {
  const policyArray = [
    {
      icon: <MapPinned />,
      title: "Pan India",
      subtitle: "presence",
    },
    {
      icon: <UsersRound />,
      title: "120k+",
      subtitle: "Happy Customers",
    },
    {
      icon: <Cog />,
      title: "Free",
      subtitle: "Installation",
    },
    {
      icon: <GraduationCap />,
      title: "20 years",
      subtitle: "Experience",
    },
  ];
  return (
    <div className='mb-8'>

      <SectionHeading title={"Top Notch Policies"} />

      <div className='w-full flex flex-wrap justify-center items-center gap-8'>
        {policyArray.map((item) => {
          return <PolicyCard {...item} />;
        })}
      </div>
    </div>
  );
};

export default PolicySection;
