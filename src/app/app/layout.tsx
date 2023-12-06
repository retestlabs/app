interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex">
      <aside className="fixed inset-y-0 w-64 px-6 z-10 hidden lg:block">
        options
      </aside>
      <div className="p-4 border-l bg-background border-border lg:w-full lg:p-6 lg:ml-64 min-h-[160vh]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
