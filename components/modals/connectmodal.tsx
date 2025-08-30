"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { cleanEnvString } from "@/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Cancel } from "@mui/icons-material";


interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText?: string;
  edit?:boolean
  onCreate?: () => void;
}

export default function ConnectModal({ isOpen, edit,onClose, onCreate,initialText="" }: ConnectModalProps) {
 

console.log(initialText)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!name.trim()) return;
    // onCreate();
    // setName("");
   
    onClose();
  };

  const [selectValue,setSelectValue] = useState("node")
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
            {/* <h2 className="text-xl font-semibold mb-4">{edit?"Edit env":"Add from env"}</h2>
            <p className="text-sm mb-5">Paste your .env contents to add multiple environment variables at once. Read the docs for correct syntax.</p> */}
<div className="flex items-center justify-between mb-5">

       <Select value={selectValue} onValueChange={(value) => {setSelectValue(value)}}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="node">Node js</SelectItem>
        <SelectItem value="go">Golang</SelectItem>
       
      </SelectContent>
    </Select>
    <Cancel onClick={()=>{onClose()}}  />
</div>
          <pre className="whitespace-pre-wrap break-words px-3 ">
            {
                `
 //npm install dotenv

 import dotenv from “dotenv”
 
 dotenv.config({env:”/asd/dfd”,restart:”node nest.js”,key:””,secret:””})

                
                `
            }

          </pre>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
