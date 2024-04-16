"use server";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../src/db/firebase";

export async function createAdminAccount(
  name: string,
  wallet_address: string,
): Promise<void> {
  try {
    await setDoc(doc(db, "teaching-institution", name), {
      wallet_address,
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
  email: string,
  name: string,
  registrationNumber: string,
  universityName: string,
  courseName: string,
): Promise<void> {
  try {
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
  student_reg_number: string,
  wallet_address: string,
): Promise<void> {
  try {
    await updateDoc(doc(db, "students", student_reg_number), {
      wallet_address,
    });
  } catch (err) {
    console.log(err, "OHH SHIT");
    throw "Could Not Add Student's Wallet";
  }
}
