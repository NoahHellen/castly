import { ChevronsRight } from "lucide-react";
import React, { useRef } from "react";
import { useDatabase } from "../../state/api";
import AddModal from "./AddModal";

function ChangeTimeSeries() {
  const { removeTimeSeries } = useDatabase();
  const modalRef = useRef(null);
  return (
    <div className="flex justify-center gap-5 mt-10">
      <button
        className="btn bg-white"
        onClick={() => modalRef.current.showModal()}
      >
        <ChevronsRight className="size-5 mr-2" />
        Add
      </button>

      <button
        className="btn bg-white"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete all data?")) {
            removeTimeSeries();
          }
        }}
      >
        <ChevronsRight className="size-5 mr-2" />
        Delete all
      </button>

      <button className="btn bg-white" onClick={() => removeTimeSeries()}>
        <ChevronsRight className="size-5 mr-2" />
        Replace all
      </button>

      <AddModal ref={modalRef} />
    </div>
  );
}

export default ChangeTimeSeries;
