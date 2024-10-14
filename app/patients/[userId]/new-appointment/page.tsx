"use client";

import Image from "next/image";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import usePatientData from "@/store/patients";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const { patients } = usePatientData();

  const patient = await getPatient(patients, userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <section className="flex justify-between w-full">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="logo"
              className="mb-12 h-10 w-fit"
            />

            <div>
              <Button variant="outline" className="shad-primary-btn" asChild>
                <Link href={`/admin/${userId}`}>
                  Dashboard
                </Link>
              </Button>

              <Button variant="outline" className="ml-8 shad-primary-btn" asChild>
                <Link href="/">
                  Logout
                </Link>
              </Button>
            </div>
          </section>

          <AppointmentForm
            patientId={patient?.userId}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
