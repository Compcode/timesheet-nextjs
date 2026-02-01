"use client"

import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";

export default function DateRange() {
  const [selectRange, setSelectedRange] = useState<string>("Date Range")

  const selectOptions = ['First Range', 'Second Range', 'Third Range']

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="hover:bg-gray-200">
            <span className="text-[16px]"> {selectRange} </span>
            <ChevronDown className="ml-auto" /> 
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-100">
        <DropdownMenuGroup>
          {selectOptions.map(o => (
            <DropdownMenuItem className="cursor-pointer" key={o} onClick={() => setSelectedRange(o)}>
            <span className="font-bold"> {o} </span>
          </DropdownMenuItem>
          ))}

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
