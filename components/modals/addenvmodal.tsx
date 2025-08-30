"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { cleanEnvString } from "@/utils";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText?: string;
  edit?:boolean
  onCreate: (data: {  envs: string }) => void;
}

export default function AddEnvModal({ isOpen, edit,onClose, onCreate,initialText="" }: ProjectModalProps) {
  // const [name, setName] = useState("");
  const [envs, setEnvs] = useState("");
  useEffect(()=>{

    if(isOpen){
        setEnvs(initialText)
    }
  },[initialText,isOpen])
console.log(initialText)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!name.trim()) return;
    onCreate({  envs });
    // setName("");
    setEnvs("");
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
            className="bg-tertiary  shadow-xl w-full max-w-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4">{edit?"Edit env":"Add from env"}</h2>
            <p className="text-sm mb-5">Paste your .env contents to add multiple environment variables at once. Read the docs for correct syntax.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
          

              <div>
               
                <textarea
                // defaultValue={initialText}
                  value={envs}
                  onChange={(e) => setEnvs((e.target.value))}
                  className="w-full rounded-sm bg-white border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  placeholder={
`
  Key1=Value1                    
  Key2=Value2                    
  Key3=Value3                    
                    
                    `
                  }
                
                  rows={6}
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
                  title={edit?"Done":"Create"}
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
