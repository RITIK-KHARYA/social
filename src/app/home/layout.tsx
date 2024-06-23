
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";
import { AnimatedTooltipPreview } from "../components/tooltip";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  return (
    <main className="overflow-hidden">
      <div className="h-screen flex gap-x-2 ">
        <Sidebar />
        {children}
        <RightSidebar />
      </div>
    </main>
  );
}
