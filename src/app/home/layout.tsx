import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";
import { AnimatedTooltipPreview } from "../components/tooltip";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="h-screen flex gap-x-2">
        <AnimatedTooltipPreview />
        <Sidebar />
        {children}
        <RightSidebar />
      </div>
    </main>
  );
}
