"use client"
import MembershipCard from "@/components/MembershipsCards/MembershipsCards";
import { useGetMembershipByIdQuery } from "@/store/apis/CantajuegaApi";

export default function Page( { params }: { params: { id: string } } ) {
    const { data: membership } = useGetMembershipByIdQuery(params.id);
    const color: string[] = ["#f08d0d", "#39a1bb", "#5e139c", "#eb2f06"];
    return (
        <>
            <h1>Membresia {membership?.name}</h1>
            <section className="flex justify-center w-full ">
                <MembershipCard image={null} membership={membership} color={color[0]} Admin={true}/>
            </section>
        </>
    )
}