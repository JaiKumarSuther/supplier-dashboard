import { useState } from "react";
import TitleOverviewForm from "../ui/TitleOverviewForm";


const TitleOverviewPage = () => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");

  return (
    <div className="listing-tour-right active px-6 py-4 bg-white shadow-sm rounded-lg" data-index="">
 
      <TitleOverviewForm
        title={title}
        overview={overview}
        onTitleChange={setTitle}
        onOverviewChange={setOverview}
        onBack={() => (window.location.href = "listingtourguides.html")}
        onNext={() => (window.location.href = "destinations.html")}
      />
    </div>
  );
};

export default TitleOverviewPage;
