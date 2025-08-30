"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button"; // shadcn/ui button (optional)
import { X } from "lucide-react";
import Button from "../ui/Button";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void> | void;
};

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
}: DeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onDelete();
    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-sm shadow-lg p-6 w-[350px] relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 text-gray-500 hover:text-black"
            >
              <X className="h-5 w-5" />
            </button>

            {!success ? (
              <>
                <h2 className="text-lg font-semibold mb-2">Delete Item?</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>

                <div className="flex justify-end gap-3">
                  <Button
                  className="rounded-sm border border-gray-300 bg-white text-black hover:bg-gray-100"
                    variant="default"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    className="rounded-sm "
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    ✅
                  </motion.div>
                </div>
                <h3 className="text-base font-semibold">
                  Deleted Successfully
                </h3>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
