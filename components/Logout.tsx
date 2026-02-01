"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export default function Logout() {
  const {data : session} = useSession()

  if(!session) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
            <span className="text-[16px] text-gray-500"> {session?.user?.name} </span>
            <ChevronDown className="mr-2" /> 
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-100">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onClick={() => signOut({callbackUrl : "/"})}>
            <span className="font-bold text-red-500 text-[16px] mx-auto hover:text-shadow-md hover:text-shadow-red-300"> Sign Out </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
