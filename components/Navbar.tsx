import Link from "next/link";
import Logout from "./Logout";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between h-15 bg-white mb-5 grow-1">
        <div className="flex gap-7">
          <Link href="/dashboard"><h1 className="text-3xl font-bold ml-3">ticktock</h1></Link>
          <h2 className="font-semibold text-[20px]">Timesheets</h2>
        </div>

        <div className="mr-2">
          <Logout/>
        </div>
        
    </div>
  )
}
