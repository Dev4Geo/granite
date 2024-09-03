import Link from "next/link";

type MyLinkProps = {
  title: string;
  href: string;
};
const MyLink = ({ title, href }: MyLinkProps) => {
  return (
    //
    <Link href={href} target="_blank">
        <div className="flex flex-row space-x-2 bg-gray-100 shadow rounded p-1">
          <div className="text-[1rem] font-bold text-green-700">{title}</div>
          <div className="">{href}</div>
        </div>
    </Link>
  );
};
export default MyLink;
