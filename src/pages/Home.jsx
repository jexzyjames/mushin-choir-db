import React from "react";
import ScrollProgress from "../utils/ScollProgress";
import MushinYouthChoir from "../components/MushinYouthChoir";

const Home = () => {
  return (
    <div className="fades w-full">
      <ScrollProgress />
      <MushinYouthChoir />
    </div>
  );
};

export default Home;