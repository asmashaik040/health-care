import Appointment from "@/app/patients/[userId]/new-appointment/page";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  $id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Patient {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  privacyConsent: boolean;
}

export interface Appointment {
  appointmentId: string;
  userId: string;
  patient: Patient;
  primaryPhysician: string;
  reason: string | undefined;
  schedule: Date;
  status: Status;
  note: string | undefined;
  cancellationReason: string | undefined;
}

interface UserState {
  users: User[];
  patients: Patient[];
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  addUser: (id: string, name: string, email: string, phone: string) => void;
  addPatient: (
    userId: string,
    name: string,
    email: string,
    phone: string,
    birthDate: Date,
    gender: Gender,
    address: string,
    occupation: string,
    emergencyContactName: string,
    emergencyContactNumber: string,
    primaryPhysician: string,
    insuranceProvider: string,
    insurancePolicyNumber: string,
    allergies: string | undefined,
    currentMedication: string | undefined,
    familyMedicalHistory: string | undefined,
    pastMedicalHistory: string | undefined,
    identificationType: string | undefined,
    identificationNumber: string | undefined,
    privacyConsent: boolean
  ) => void;
  createAppointment: (
    appointmentId: string,
    userId: string,
    patient: Patient,
    primaryPhysician: string,
    reason: string,
    schedule: Date,
    status: Status,
    note: string,
    cancellationReason: string
  ) => void;
}

const usePatientData = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        users: [],
        patients: [],
        appointments: [],
        isLoading: false,
        error: null,
        addUser: ($id, name, email, phone) =>
          set((state) => ({
            users: [
              ...state.users,
              {
                $id,
                name,
                email,
                phone,
              },
            ],
          })),
        addPatient: (
          userId,
          name,
          email,
          phone,
          birthDate,
          gender,
          address,
          occupation,
          emergencyContactName,
          emergencyContactNumber,
          primaryPhysician,
          insuranceProvider,
          insurancePolicyNumber,
          allergies,
          currentMedication,
          familyMedicalHistory,
          pastMedicalHistory,
          identificationType,
          identificationNumber,
          privacyConsent
        ) =>
          set((state) => ({
            patients: [
              ...state.patients,
              {
                userId,
                name,
                email,
                phone,
                birthDate,
                gender,
                address,
                occupation,
                emergencyContactName,
                emergencyContactNumber,
                primaryPhysician,
                insuranceProvider,
                insurancePolicyNumber,
                allergies,
                currentMedication,
                familyMedicalHistory,
                pastMedicalHistory,
                identificationType,
                identificationNumber,
                privacyConsent,
              },
            ],
          })),
        createAppointment: (
          userId,
          appointmentId,
          patient,
          primaryPhysician,
          reason,
          schedule,
          status,
          note,
          cancellationReason
        ) =>
          set((state) => ({
            appointments: [
              ...state.appointments,
              {
                appointmentId,
                userId,
                patient,
                primaryPhysician,
                reason,
                schedule,
                status,
                note,
                cancellationReason,
              },
            ],
          })),
      }),

      {
        name: "patient-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default usePatientData;
