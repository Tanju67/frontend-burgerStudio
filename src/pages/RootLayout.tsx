import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <main className="font-primary flex min-h-screen flex-col scroll-smooth">
        <div className="flex-1 antialiased md:pt-47.5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default RootLayout;
