interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex justify-center items-center flex-col gap-y-4">
      <h1 className="text-4xl font-bold">🔐 Auth</h1>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};
export default Header;
