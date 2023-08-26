import '../components/Navbar.css'
const Navbar = () => {
  return (
    <div className="my-4 flex h-[60px] items-center justify-center gap-4 bg-white text-[23px] py-5 rounded-2xl font-medium">
      <img src="/firebase.svg" />
      <h1>Firebase Contact App</h1>
    </div>
  );
};

export default Navbar;
