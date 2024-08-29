const LegendVQAPF = () => {
  return (
    <div className="text-start">
      <div className="font-bold text-base">IUGS Classification</div>
      <div className="text-[0.7rem]">2b. Volcanic/Aphanitic Rocks</div>
      <div className="flex flex-col space-y-2 py-2 text-[0.7rem]">
        <div className="">
          <div className="">Q = Quartz</div>
          <div className="">A = Alkali feldspar</div>
          <div className="">P = Plagioclase feldspar</div>
          <div className="">F = Feldspathoid (Foid)</div>
        </div>
        <div className="">
          <div className="">Q1. Alkali feldspar trachyte</div>
          <div className="">Q2. Quartz alkali feldspar trachyte</div>
          <div className="">F1. Foid-bearing alkali feldspar trachyte</div>
          <div className="">F2. Foidite</div>
        </div>
      </div>
    </div>
  );
};
export default LegendVQAPF;
