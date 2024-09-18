export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center overflow-x-hidden">
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
