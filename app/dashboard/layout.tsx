import FooterBar from "@/components/FooterBar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({children} : {children: React.ReactNode}) {
  return (
    <div className="bg-gray-200">
        <Navbar />
        <div className="flex flex-col justify-around gap-5 mx-38">
          {children}
          <FooterBar />
        </div>
    </div>
  )
}
