import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { useDatabase } from "../../state/api";
import { ChevronsRight, PlusCircleIcon } from "lucide-react";

const ChangeDeleteModal = forwardRef((props, ref) => {
  const { formData, setFormData, loading, updateRow, deleteRow } =
    useDatabase();

  const modalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    showModal: () => modalRef.current.showModal(),
    close: () => modalRef.current.close(),
  }));

  const handleUpdate = async () => {
    try {
      await updateRow(formData.id);
    } catch (error) {
      console.error(error);
    } finally {
      modalRef.current.close();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRow(formData.id);
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
          onClick={() => modalRef.current.close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          X
        </button>

        {/* Form title. */}
        <h3 className="font-bold text-lg"> Update data point </h3>

        <form className="space-y-4 pt-4">
          {/* Date. */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">Date</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-10">
                <ChevronsRight className="size-5" />
              </div>
              <input
                type="date"
                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                value={formData.date}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    date: event.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Price. */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">Price</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50 z-10">
                <ChevronsRight className="size-5" />
              </div>
              <input
                type="number"
                min="0.00"
                step="0.01"
                placeholder="0.00"
                className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                value={formData.price}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    price: event.target.value,
                  })
                }
              />
            </div>

            {/* Update or delete buttons. */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => modalRef.current.close()}
              >
                Cancel
              </button>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={handleDelete}
                disabled={loading}
              >
                Delete
              </button>
              <button
                className="btn btn-ghost"
                type="button"
                disabled={loading || !formData.id}
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Click anywhere to close. */}
      <div
        className="modal-backdrop"
        onClick={() => modalRef.current.close()}
      />
    </dialog>
  );
});

export default ChangeDeleteModal;
