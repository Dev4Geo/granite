import Link from "next/link";

type MyMenuProps = {
  title: string;
  href: string;
  current?: string;
};

function MenuItem({ title, href, current }: MyMenuProps) {
  const isFocus = title === current;
  return (
    //
    <Link href={href}>
      <div className={`${isFocus && "underline"}`}>{title}</div>
    </Link>
  );
}

const MyMenu = ({current }:{current:string}) => {
  return (
    <div className="flex flex-row justify-end w-full my-2 px-2 text-sm text-gray-400 space-x-4 mr-4 z-0">
      <MenuItem title={"Charts"} href={"/charts"} current={current}/>
      <MenuItem title={"Alt-solutions"} href={"/alt-solutions"} current={current}/>
      <MenuItem title={"Contact"} href={"https://github.com/Dev4Geo/Dev4Geo/blob/main/contact.md"} current={current}/>
    </div>
  );
};
export default MyMenu;
