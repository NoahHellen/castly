import { ChevronsRight } from "lucide-react";
import React, { useRef } from "react";

import { useDatabase } from "../../../services/api/db";

import ModalAdd from "./ModalAdd";

function ChangeTimeSeries() {
  const { removeTimeSeries, newTimeSeries } = useDatabase();
  const modalRef = useRef(null);
  const fileRef = useRef(null);

  const inputFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploading file:", file);
      newTimeSeries(file);
      event.target.value = null;
    }
  };

  return (
    <div className="flex justify-center gap-20 mt-10">
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

      <input
        type="file"
        ref={fileRef}
        className="hidden"
        accept=".csv"
        onChange={inputFile}
      />

      <button className="btn bg-white" onClick={() => fileRef.current.click()}>
        <ChevronsRight className="size-5 mr-2" />
        Replace all
      </button>

      <ModalAdd ref={modalRef} />
    </div>
  );
}

export default ChangeTimeSeries;
