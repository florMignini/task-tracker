import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Welcome to Task Tracker App",
  description: "Manage your task, schedule and projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-slate-100">
      <main className="pt-40 pb-20 ">{children}</main>
    </div>
  );
}
