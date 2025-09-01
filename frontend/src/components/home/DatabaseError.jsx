import React from "react";
import { useDatabase } from "../../state/api";

// Component to display if error in API call.
function Error() {
  const { error } = useDatabase;
  return (
    <div>{error && <div className="alert alert-error mb-8">{error}</div>}</div>
  );
}

export default Error;
