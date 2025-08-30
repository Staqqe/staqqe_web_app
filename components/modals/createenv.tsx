"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; description: string }) => void;
}

export default function ProjectModal({ isOpen, onClose, onCreate }: ProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name, description });
    setName("");
    setDescription("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white  shadow-xl w-full max-w-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Create Env</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-sm border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm  mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-sm border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  placeholder="Enter project description"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  onClick={onClose}
                  title="Cancel"
                  className="px-4 py-2 rounded-sm border bg-white text-black   border-gray-300 hover:bg-gray-100"
                />
                 
               
                <Button
                  type="submit"
                  title="Create"
                  className="px-4 py-2 rounded-sm bg-primary text-white hover:bg-primary-700"
                />
                  {/* Create */}
             
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
