"use client";

import { parseStringify } from "../utils";
import { Patient, User, Appointment } from "@/store/patients";

// GET USER
export const getUser = (users: User[], userId: string) => {
  try {
    const user = users.find((patient) => patient.$id === userId) as User;

    if (!user) return;
    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// GET PATIENT
export const getPatient = (patients: Patient[], userId: string) => {
  try {
    const newPatient = patients.find(
      (patient) => patient.userId === userId
    ) as Patient;
    if (!newPatient) return;
    return parseStringify(newPatient);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};

// GET Appointment
export const getAppointment = (
  appointments: Appointment[],
  appointmentId: string
) => {
  try {
    const newAppointment = appointments.find((appointment) => {
      return appointment.appointmentId === appointmentId;
    });
    if (!newAppointment) return;
    return parseStringify(newAppointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};

// GET all available Appointments
export const getAppointments = (
  appointments: Appointment[],
  userId: string
) => {
  try {
    const newAppointment = appointments.filter((appointment) => {
      return appointment.userId === userId;
    });
    if (!newAppointment) return;
    return parseStringify(newAppointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};

// Update Appointment
export const updateAppointment = (
  appointments: Appointment[],
  appointmentToUpdate: Appointment
) => {
  try {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.userId === appointmentToUpdate.userId) {
        return {
          ...appointment,
          primaryPhysician: appointmentToUpdate.primaryPhysician,
          schedule: new Date(appointmentToUpdate.schedule),
          status: appointmentToUpdate.status as Status,
          reason: appointmentToUpdate.reason,
          note: appointmentToUpdate.note,
        };
      }
      return appointment;
    });

    return parseStringify(updatedAppointments[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
