"use client"
import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import usePatientData, { Appointment } from "@/store/patients";
import { Button } from "@/components/ui/button";
import { getAppointments } from "@/lib/actions/patient.actions";

const AdminPage = ({ params: { userId } }: SearchParamProps) => {

  const { appointments } = usePatientData();

  const appointmentList = getAppointments(appointments, userId);


  const scheduledAppointments = (
    appointmentList as Appointment[]
  ).filter((appointment) => appointment.status === "scheduled");

  const pendingAppointments = (
    appointmentList as Appointment[]
  ).filter((appointment) => appointment.status === "pending");

  const cancelledAppointments = (
    appointmentList as Appointment[]
  ).filter((appointment) => appointment.status === "cancelled");

  const data = {
    totalCount: appointmentList.length,
    scheduledCount: scheduledAppointments.length,
    pendingCount: pendingAppointments.length,
    cancelledCount: cancelledAppointments.length,
    documents: appointmentList,
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
      <section className="flex justify-between w-full">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        {/* <p className="text-16-semibold">Admin Dashboard</p> */}

        <div>
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>
          <Button variant="outline" className="ml-8 shad-primary-btn" asChild>
            <Link href="/">
              Logout
            </Link>
          </Button>
        </div>
        </section>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={data.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={data.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={data.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns} data={data.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
