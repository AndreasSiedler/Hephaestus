import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { wrapper } from "../../store/store";
import { LoggedInSession } from "../../types";
import DashLayout from "../../components/layout/DashLayout";
import { LOGIN_ROUTE } from "../login";
import Bookings from "../../components/booking/Bookings";

export const USER_BOOKINGS_ROUTE = "/user/bookings";

const UserBookings: NextPage = () => {
  return (
    <DashLayout title="Bookings">
      <Bookings />
    </DashLayout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = (await getSession({ req })) as LoggedInSession;
      if (!session) {
        return {
          redirect: {
            destination: LOGIN_ROUTE,
            permanent: false,
          },
        };
      }
      return {
        props: {
          ...session,
          // Pass id as key here, remember that the file name is [id].tsx
          key: Date.now(),
        },
      };
    }
);
export default UserBookings;
