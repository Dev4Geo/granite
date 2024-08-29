const LegendVQAP = () => {
  return (
    <div className="text-start">
      <div className="font-bold text-base">IUGS Classification</div>
      <div className="text-[0.7rem]">Volcanic/Aphanitic Rocks</div>
      <div className="text-[0.7rem]">2a. Volcanic rocks with quartz</div>
      <div className="flex flex-col space-y-2 py-2 text-[0.7rem]">
        <div className="">
          <div className="">Q = Quartz</div>
          <div className="">A = Alkali feldspar</div>
          <div className="">P = Plagioclase feldspar</div>
        </div>
        <div className="">
          <div className="">Q1. Alkali feldspar trachyte</div>
          <div className="">Q2. Quartz alkali feldspar trachyte</div>
        </div>
      </div>
    </div>
  );
};
export default LegendVQAP;
