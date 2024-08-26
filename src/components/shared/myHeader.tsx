import Image from "next/image";
const topLogoSize = 60;
const MyHeader = ({ }) => {
  return (
    <div className="text-start w-full bg-gray-100 py-5 px-6 shadow z-50">
      <div className="flex flex-row items-center space-x-2">
        <Image
          src={"/stone.png"}
          alt={""}
          width={topLogoSize}
          height={topLogoSize}
        />
        <div className="flex flex-col">
          <div className="text-4xl font-bold text-gray-700">Granite</div>
          <div className="text-sm text-gray-500 ml-1">
            QAP plotter by Dev4Geo
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyHeader;
