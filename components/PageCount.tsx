"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PageCountProps } from "@/types/PageCountProps"
import { ChevronDown } from "lucide-react"

export function PageCount({pageCount, setPageCount} : PageCountProps) {

    const counts = [5, 10, 15]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border-1 border-gray-300 flex items-center text-md text-gray-500">{pageCount} per page  <ChevronDown className="w-4 h-4 ml-1 " /> </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {counts.map(c => (
            <DropdownMenuItem key={c} onClick={() => setPageCount(c)}>
          {c} per page
        </DropdownMenuItem>
        ))}

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
