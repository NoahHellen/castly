import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { ChevronsRight } from "lucide-react";

import { useDatabase } from "../../../services/api/db";

const ModalAdd = forwardRef((props, ref) => {
  const { addRow, formData, setFormData, loading } = useDatabase();

  const modalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    showModal: () => modalRef.current.showModal(),
    close: () => modalRef.current.close(),
  }));

  const handleSubmit = async (e) => {
    try {
      await addRow(e);
    } catch (error) {
      console.error(error);
    } finally {
      modalRef.current.close();
    }
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box relative">
        {/* Close button. */}
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => modalRef.current.close()}
        >
          X
        </button>

        {/* Title. */}
        <h3 className="font-bold"> Add to time series </h3>

        <form onSubmit={handleSubmit} className="space-y-6 pt-5">
          {/* Date. */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">Date</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-es-none text-base-content/50 z-10">
                <ChevronsRight className="size-5" />
              </div>
              <input
                type="date"
                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">Price</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-es-none text-base-content/50 z-10">
                <ChevronsRight className="size-5" />
              </div>
              <input
                type="number"
                min="0.00"
                step="0.01"
                placeholder="0.00"
                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Actions. */}
          <div className="flex justify-between modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => modalRef.current.close()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!formData.date || !formData.price || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>Add</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Click anywhere to close */}
      <div
        className="modal-backdrop"
        onClick={() => modalRef.current.close()}
      />
    </dialog>
  );
});

export default ModalAdd;
