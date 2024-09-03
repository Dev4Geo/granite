import MyLink from "@/components/altSolutions/link";
import MyMenu from "@/components/shared/myMenu";
import Image from "next/image";

const AltSolutions = () => {
  // const monsterSize = 20;
  const monsterSize = 200;
  return (
    //
    <div className="flex flex-col items-center w-full">
      <MyMenu current="" />
      <div className="flex flex-col ">
        <div className="flex flex-col items-center justify-center w-full">
          <Image
            src={"/monster.png"}
            alt={""}
            width={monsterSize}
            height={monsterSize}
          />
          <div className="text-gray-500 font-bold ml-2 my-4 text-lg">
            Alternative Solutions
          </div>
        </div>
        {
          // content
        }
        <div className="flex flex-col mt-4 text-gray-500 space-y-2">
          <MyLink title="Science Smith" href="https://www.science.smith.edu/~jbrady/petrology/rock-library/rl-page09.php" />
          <MyLink title="Geology.Csupomona" href={`https://web.archive.org/web/20080730160310/http:\/\/geology.csupomona.edu/alert/igneous/igclass.htm`} />
          <MyLink title="Planetearth" href="https://planetearth.utsc.utoronto.ca/VirtualMic/charts/index.html"  />
          <MyLink title="Physci" href="https://physci.mesacc.edu/Geology/Luther/GLG101IN/GLG101IN_Lab06_VolcanicRocks/GLG101IN_Lab06_VolcanicRocks3.html" />
          <MyLink title="Rockware" href="https://www.rockware.com/support/knowledge_base/QAPF.pdf" />
          <MyLink title="Wikipedia" href="https://en.wikipedia.org/wiki/QAPF_diagram" />
        </div>
      </div>
    </div>
  );
};
export default AltSolutions;
