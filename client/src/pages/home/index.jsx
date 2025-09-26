import React from "react";

import Welcome from "./welcome";
import Faq from "./faq";
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
