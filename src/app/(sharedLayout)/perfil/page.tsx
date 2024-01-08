"use client";
import AdultSection from "@/components/Profile/AdultSection";
import ChildSection from "@/components/Profile/ChildSection";
import {
  useGetMembershipByIdQuery,
  useGetProgressChildQuery,
  useGetStageByIdQuery,
} from "@/store/apis/CantajuegaApi";
import { useAppSelector } from "@/store/hooks";
import { Suspense } from "react";
import { RotatingLines } from "react-loader-spinner";

export default function Page() {
  const user = useAppSelector((state) => state.userReducer.user);
  const userMembershipexist = user?.MembershipId ? true : false;
  const child = useAppSelector((state) => state.childReducer.child);
  const childStageExist = child?.StageId ? true : false;
  const {
    data: membership,
    error,
    isLoading,
    isFetching,
  } = useGetMembershipByIdQuery(user?.MembershipId!, {
    skip: !userMembershipexist,
  });
  const { data: stage } = useGetStageByIdQuery(
    { id: child?.StageId! },
    {
      skip: !childStageExist,
    }
  );
  const { data: progress, isLoading: progresloading } =
    useGetProgressChildQuery({ ProgressId: child?.ProgressId! });

  return (
    <div className="min-h-screen  flex  h-screen text-sm ">
      <AdultSection
        user={user!}
        membership={membership!}
        isLoading={isLoading}
        isFetching={isFetching}
      />
      <ChildSection
        child={child!}
        stage={stage!}
        progresloading={progresloading}
        progress={progress!}
      />
    </div>
  );
}
