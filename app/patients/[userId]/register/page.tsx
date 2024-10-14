"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/forms/RegisterForm";
import { getAppointments, getPatient, getUser } from "@/lib/actions/patient.actions";
import usePatientData from "@/store/patients";
import { useEffect } from "react";

const Register = ({ params: { userId } }: SearchParamProps) => {
  const { users, patients, appointments } = usePatientData();
  const router = useRouter();
  const user = getUser(users, userId);
  const newPatient = getPatient(patients, userId);

  const appointmentsList = getAppointments(appointments, userId);

  useEffect(() => {
    if (newPatient && newPatient.userId) {
      if (appointmentsList && appointmentsList.length > 0) {
        router.push(`/admin/${newPatient.userId}`);
      } else {
        router.push(`/patients/${newPatient.userId}/new-appointment`);
      }
    }
  }, [appointmentsList, newPatient, router]);

  if (!newPatient || !newPatient?.userId) {
    return (
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container">
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
            />

            {user ? (
              <RegisterForm user={user} />
            ) : (
              <div>Loading...</div>
            )}

            <p className="copyright py-12">© 2024 CarePluse</p>
          </div>
        </section>

        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="patient"
          className="side-img max-w-[390px]"
        />
      </div>
    );
  }
  return null;

};

export default Register;
