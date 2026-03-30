import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <main className="grow animate-in fade-in duration-500">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
