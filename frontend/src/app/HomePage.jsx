import React from "react";
import Faq from "../components/home/Faq";
import DatabaseError from "../components/home/DatabaseError";
import Welcome from "../components/home/Welcome";

function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pt-20">
      <Welcome />
      <DatabaseError />
      <Faq />
    </main>
  );
}

export default HomePage;
