"use client";
import MembershipCard from "@/components/MembershipsCards/MembershipsCards";
import firstbackground from "../../../public/img/Untitled_Artwork 3.png";
import secondbackground from "../../../public/img/Untitled_Artwork 5.png";
// import { Membership } from "@/types/membership.type";
import { useGetMembershipQuery } from "@/store/apis/CantajuegaApi";
import Loading from "../loading";

export default function Membresias() {
  const { data: memberships, isLoading } = useGetMembershipQuery(null);
  const color: string[] = ["#f08d0d", "#39a1bb", "#5e139c", "#eb2f06"];
  const image: any[] = [
    firstbackground,
    secondbackground,
    firstbackground,
    secondbackground,
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col gap-5 " id="MembresiasPage">
      <header>
        <div className="h-60 bg-[#fada4d]">
          <div
            className="w-full h-full bg-cover sm:bg-center flex justify-center items-center"
            style={{
              backgroundImage:
                "url('img/Untitled_Artwork 1.png'), url('img/Untitled_Artwork 5.png')",
            }}>
            <h1 className="font-[Kidz] text-6xl text-white">MEMBRESÍAS</h1>
          </div>
        </div>
      </header>
      <section>
        <div className="container mx-auto px-4 lg:px-2 ">
          <header className="my-6">
            <h1 className="font-[Kidz] text-center text-5xl text-blue">
              Membresías Canta Juega Conmigo
            </h1>
          </header>
        </div>
      </section>

      <main className="flex justify-around flex-wrap gap-4">
        {memberships?.map((i, key) => (
          <article key={key}>
            <MembershipCard
              membership={i}
              image={image[key]}
              color={color[key]}
            />
          </article>
        ))}
      </main>
    </main>
  );
}
