export const metadata = {
  title: "Create Hostel Listing",
  description: "Add a new hostel listing to the marketplace.",
};

export default function NewHostelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full">{children}</main>;
}
