import {
  useGetNotificationsQuery,
  useUpdateNotificationMutation,
} from '@/store/apis/CantajuegaApi';
import { transformDate } from '@/utils/general';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';

export default function Notifications() {
  const {
    data: notifications,
    isLoading,
    isFetching,
  } = useGetNotificationsQuery(null, {
    refetchOnMountOrArgChange: 60000, ///cada 1 minuto revalidaremos  (si es que se abren las notis)
  });

  const [updateNotification] = useUpdateNotificationMutation();

  const [show, setShow] = useState<boolean>(false);
  const openNotifications = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShow(!show);
  };
  const totalNotifications =
    notifications?.filter((notification) => !notification.is_read) ?? [];
  return (
    <>
      <IoMdNotifications
        className='text-4xl text-blue cursor-pointer hover:text-[#423579] '
        onClick={openNotifications}
      />
      {show && (
        <div className=' z-50 absolute min-w-[15rem] max-h-[20rem] top-[130%]  flex flex-col  w-full  border-black border    left-0  overflow-auto'>
          {(!isFetching || !isLoading) &&
            notifications?.map((notification, key) => (
              <Link
                onClick={() => updateNotification(notification.id)}
                key={key}
                href={
                  notification.notification_type == 'Report'
                    ? `/dashboard/reportes/${notification.Report?.UserId ?? ''}`
                    : `/dashboard`
                }
              >
                <article
                  className={`${
                    notification.is_read ? 'bg-white' : ' bg-green'
                  } flex flex-col gap-2 border-b  border-dashed border-orangeicons  hover:bg-orange cursor-pointer p-2`}
                >
                  <span className='text-sm'>
                    {transformDate(notification?.createdAt)}
                  </span>
                  <span>
                    {notification.notification_type == 'Report'
                      ? `Tienes un nuevo reporte de ${notification.Report?.User?.firstName}`
                      : notification.notification_type}
                  </span>
                </article>
              </Link>
            ))}
        </div>
      )}
      {totalNotifications?.length > 0 ? (
        <span className='absolute -top-1 -right-1 text-white bg-red w-5 h-5 rounded-full flex justify-center items-center'>
          {totalNotifications.length}
        </span>
      ) : null}
    </>
  );
}
