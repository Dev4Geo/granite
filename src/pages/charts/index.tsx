import MyCard from "@/components/charts/myCard";
import MyMenu from "@/components/shared/myMenu";
import Image from "next/image";

type SubHeaderProps = {
  title: string;
};
function SubHeader({ title }: SubHeaderProps) {
  return (
    <div className="text-[0.7rem] text-gray-400 mb-[-0.2rem] pb-0">{title}</div>
  );
}

const ChartsPage = ({ }) => {
  const monsterSize = 20;
  return (
    <div className="flex flex-col items-center text-gray-600 w-full">
      <MyMenu current="" />
      <div className="w-fit">
        <div className="flex flex-row items-end justify-start w-full">
          <Image
            src={"/monster.png"}
            alt={""}
            width={monsterSize}
            height={monsterSize}
            priority={false}
            className="w-auto"
          />
          <div className="text-gray-500 font-bold ml-2 mb-[-0.25rem]">
            All Charts
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex flex-col">
            <SubHeader title={"Volcanic"} />
            <MyCard
              href={"/charts/qap"}
              title={"Volcanic QAPF, QAP, FAP"}
              // subtitle={"IUGS Classifications"}
              desc={
                "Volcanic/Aphanitic igneous rocks based on the proportions of Quartz (Q), Alkali Feldspar (A), Plagioclase (P) and Feldspathoid minerals (F)."
              }
            />
          </div>
          <div className="flex flex-col">
            <SubHeader title={"Plutonic"} />
            <MyCard
              href={"/charts/qap"}
              title={"Plutonic QAPF, QAP, FAP"}
              subtitle={"Mafic < 90%"}
              desc={
                "Plutonic/Phaneritic igneous rocks based on the proportions of Quartz (Q), Alkali Feldspar (A), Plagioclase (P) and Feldspathoid minerals (F)."
              }
            />
            <MyCard
              href={"/charts/qap"}
              title={"Gabbroic Rocks Px-Pl-Ol-Hbl"}
              subtitle={"Mafic > 90%, Plagioclase appears"}
              desc={
                "Gabbroic igneous rocks based on the proportions of pyroxene (Px), plagioclase (Pl), Olivine (Ol) and Hornblende (Hbl)."
              }
            />
            <MyCard
              href={"/charts/qap"}
              title={"Ultramafic Rocks Opx-Cpx-Ol-Hbl"}
              subtitle={"Mafic > 90%, no Plagioclase"}
              desc={
                "Ultramafic igneous rocks based on the proportions of orthopyroxene (Opx), clinopyroxene (Cpx), Olivine (Ol) and Hornblende (Hbl)."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChartsPage;
