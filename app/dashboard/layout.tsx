// Dashboard has its own sidebar navigation — no global Header needed here.
// This isolated layout prevents the root layout's Header from rendering
// inside the dashboard, which was causing the reload loop.

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
