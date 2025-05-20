import { useState } from "react";
import TitleOverviewForm from "../ui/TitleOverviewForm";

const TitleOverviewPage = () => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");

  return (
    <TitleOverviewForm
      title={title}
      overview={overview}
      onTitleChange={setTitle}
      onOverviewChange={setOverview}
      onBack={() => (window.location.href = "/listingtrek/listingtrek.html")}
      onNext={() => (window.location.href = "itinerary.html")}
    />
  );
};

export default TitleOverviewPage;
