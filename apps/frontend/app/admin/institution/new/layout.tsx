export const metadata = {
  title: "Create Institution",
  description: "Add an Institution to the marketplace.",
};

export default function CreateInstitutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full">{children}</main>;
}
