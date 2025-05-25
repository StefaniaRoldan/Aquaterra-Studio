function Navbar() {
    return (
      <nav className="bg-[#eaf6f3] text-[#5F7161] px-6 py-4 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Reemplazá este círculo por una imagen si tenés un logo */}
          <div className="w-10 h-10 bg-[#A0C9B4] rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="text-lg font-semibold">
            Aquaterra Studio
            <div className="text-sm font-light text-[#7A8F86]">
              Pilates & Yoga
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;