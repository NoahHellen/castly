import React from "react";
import Welcome from "./Welcome";
import Faq from "./Faq";
import DatabaseError from "../../components/DatabaseError";

function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pt-20">
      <Welcome />
      <Faq />
      <DatabaseError />
    </main>
  );
}

export default HomePage;
