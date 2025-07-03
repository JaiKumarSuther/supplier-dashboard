import { useState } from "react";
import TitleOverviewForm from "../ui/TitleOverviewForm";

interface TitleOverviewPageProps {
  onNext: () => void;
  onBack: () => void;
}

const TitleOverviewPage: React.FC<TitleOverviewPageProps> = ({ onNext, onBack }) => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");

  return (
    <div className="listing-tour-right active px-6 py-4 bg-white shadow-sm rounded-lg">
      <TitleOverviewForm
        title={title}
        overview={overview}
        onTitleChange={setTitle}
        onOverviewChange={setOverview}
        onBack={onBack}
        onNext={onNext}
      />
    </div>
  );
};

export default TitleOverviewPage;
