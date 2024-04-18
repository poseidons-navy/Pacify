"use server";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/db/firebase";

import z from "zod";
import {
  connectWalletSchema,
} from "@/validation/students";
import { createInstitutionSchema } from "@/validation/institution";

interface CreateTeachingInstitution {
  name: string,
  walletAddress: string,
  asset_index: number,
  transaction_hash: string
}

export async function createTeachingInstitution(
  values: CreateTeachingInstitution,
): Promise<void> {
  const { name, walletAddress, asset_index, transaction_hash } = values;
  try {
    await setDoc(doc(db, "teaching-institution", name), {
      walletAddress,
      asset_index,
      transaction_hash,
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

interface CreateStudentAccount {
  email: string,
  name: string, 
  registrationNumber: string,
  universityName: string,
  courseName: string,
  asset_index: number,
  transaction_hash: string
}

export async function createStudentAccount(
  values: CreateStudentAccount,
): Promise<void> {
  try {
    const {
      email,
      name,
      registrationNumber,
      universityName,
      courseName,
      asset_index,
      transaction_hash,
    } = values;
    const password = "someRandomBS";
    await setDoc(doc(db, "students", registrationNumber), {
      email,
      name,
      walletAddress: "",
      password,
      universityName,
      courseName,
      asset_index,
      transaction_hash,
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
  asset_index: number,
  transaction_hash: string,
): Promise<void> {
  try {
    await addDoc(collection(db, "certificate"), {
      course_name,
      university_name,
      student_reg_number,
      certificate_serial_number,
      certificate_image_url,
      asset_index,
      transaction_hash,
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
