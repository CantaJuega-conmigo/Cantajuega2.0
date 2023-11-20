import Link from "next/link";
export default function Boxinfo({
  title,
  info,
  BoxStyle,
  BoxTitle,
  seeMoreButton,
  seeMorePath,
  children,
}: {
  title?: string;
  info?: string;
  BoxStyle?: string;
  BoxTitle?: string;
  seeMoreButton?: boolean;
  seeMorePath?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={` ${BoxStyle ?? ""} text-center grow   md:w-1/4  flex flex-col gap-2 `}>
      <article className={`${BoxTitle ?? ""} bg-green rounded-full`}>
        <h2>{title ?? ""}</h2>
      </article>
      <p> {info ?? ""}</p>
      {children}
      {seeMoreButton && (
        <Link href={seeMorePath ?? ""}>
          <button className=" bg-cream px-3 rounded-xl border  border-black text-sm">
            ver mas
          </button>
        </Link>
      )}
    </section>
  );
}
