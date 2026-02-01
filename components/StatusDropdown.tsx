"use client"

import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";

export default function StatusDropdown() {
  const [status, setStatus] = useState<string>("Status")

  const options = ['COMPLETED', 'INCOMPLETE', 'MISSING']
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="hover:bg-gray-200">
            <span className="text-[16px]"> {status} </span>
            <ChevronDown className="ml-auto" /> 
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-100">
        <DropdownMenuGroup>
          {options.map(option => (
            <DropdownMenuItem className="cursor-pointer" key={option} onClick={() => setStatus(option)}>
            <span className="font-bold"> {option} </span>
          </DropdownMenuItem>
          ))}

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
