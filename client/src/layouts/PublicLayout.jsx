const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      {children}
    </div>
  );
};

export default PublicLayout;
