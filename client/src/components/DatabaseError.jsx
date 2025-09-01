import React from "react";
import { useDatabase } from "../services/api/db";

// Component to display if error in API call.
function DatabaseError() {
  const { error } = useDatabase;
  return (
    <div>{error && <div className="alert alert-error mb-8">{error}</div>}</div>
  );
}

export default DatabaseError;
