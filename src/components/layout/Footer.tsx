import Logo from "@/assets/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto container px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-foreground sm:justify-start items-center gap-2 font-black">
            <Logo /> Chatify
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; {new Date().getFullYear()}. All rights reserved by{" "}
            {""}
            <a className="font-bold" target="_blank" href="https://mdranju.xyz">
              Md. Ranju
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
