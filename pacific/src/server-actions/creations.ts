"use server";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/db/firebase";
import z from "zod";
import {
  connectWalletSchema,
  createStudentSchema,
} from "@/validation/students";
import { createAdminSchema } from "@/validation/admin";
export async function createAdminAccount(
  values: z.infer<typeof createAdminSchema>,
): Promise<void> {
  const { name, walletAddress } = values;
  try {
    await setDoc(doc(db, "teaching-institution", name), {
      walletAddress,
    });
  } catch (err) {
    console.log(err, "OHH SHIT");
    throw "Could Not Create Teaching Institution";
  }
}

export async function createCourse(
  name: string,
  university: string,
): Promise<void> {
  try {
    await addDoc(collection(db, "course"), {
      university,
      name,
    });
  } catch (err) {
    console.log(err, "OHH SHIT");
    throw "Could Not Create Course";
  }
}

export async function createStudentAccount(
  /*email: string,
  name: string,
  registrationNumber: string,
  universityName: string,
  courseName: string,*/
  values: z.infer<typeof createStudentSchema>,
): Promise<void> {
  try {
    const { email, name, registrationNumber, universityName, courseName } =
      values;
    const password = "someRandomBS";
    await setDoc(doc(db, "students", registrationNumber), {
      email,
      name,
      walletAddress: "",
      password,
      universityName,
      courseName,
    });

    // Send user email with password
  } catch (err) {
    console.log(err, "OHH SHIT");
    throw "Could Not Create Student Account";
  }
}

export async function assignCertificate(
  course_name: string,
  university_name: string,
  student_reg_number: string,
  certificate_serial_number: string,
  certificate_image_url: string,
): Promise<void> {
  try {
    await addDoc(collection(db, "certificate"), {
      course_name,
      university_name,
      student_reg_number,
      certificate_serial_number,
      certificate_image_url,
    });
  } catch (err) {
    console.log(err, "OHH SHIT");
    throw "Could Not Assign Certificate";
  }
}

export async function addStudentWalletToDB(
  values: z.infer<typeof connectWalletSchema>,
): Promise<void> {
  const { walletAddress, registrationNumber } = values;
  try {
    await updateDoc(doc(db, "students", registrationNumber), {
      walletAddress,
    });
  } catch (err) {
    console.log(err, "OHH SHIT");
    throw "Could Not Add Student's Wallet";
  }
}
