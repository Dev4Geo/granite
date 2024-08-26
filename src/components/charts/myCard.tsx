import Image from "next/image";
import Link from "next/link";

const MyCard = ({ href, title, subtitle, desc }: any) => {
  const imgSize = 100;
  return (
    <Link href={href as string}>
      <div className="flex flex-row justify-start bg-gray-100 shadow w-[30rem] my-1 rounded-md">
        <div className="flex flex-row border rounded m-0 w-[20rem] bg-white items-center justify-center">
          <Image
            src={"/monster.png"}
            width={imgSize}
            height={imgSize}
            alt={""}
          ></Image>
        </div>
        <div className=" flex flex-col space-y-1 pt-2 px-2">
          <div className="text-gray-500 text-[1rem] font-bold">{title}</div>
          <div className="text-gray-500 text-[0.8rem] font-semibold pt-0">
            {subtitle}
          </div>
          <div className="text-gray-400 text-[0.7rem] ">{desc}</div>
        </div>
      </div>
    </Link>
  );
};
export default MyCard;
