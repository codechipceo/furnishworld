import SectionHeading from "../../components/SectionHeading";
import legalContent from "./legalContent.json";

export default function LegalPage({ type = "privacyPolicy" }) {
  const content = legalContent[type];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <SectionHeading title={content.title} />
      <div className="space-y-6">
        {content.sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
            <p className="text-gray-700">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
