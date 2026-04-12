export const metadata = {
  title: "Castcadia CMS",
  description: "Content management for Castcadia Outfitters",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ height: "100vh" }}>
      {children}
    </div>
  );
}
