import { StudentAccount } from "@/types/student";
import { db } from "./firebase";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { TeachingInstitution } from "@/types/teaching-institution";
import { Certificate } from "@/types/certificate";

export async function getUserDataFromLogin(
  wallet_address: string,
): Promise<StudentAccount | TeachingInstitution> {
  try {
    const q = query(
      collection(db, "teaching-institution"),
      where("wallet_address", "==", wallet_address),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      const q2 = query(
        collection(db, "students"),
        where("wallet_address", "==", wallet_address),
      );
      const querySnapshot2 = await getDocs(q2);

      if (querySnapshot2.size === 0) {
        throw "Account With Wallet Does Not Exist";
      } else {
        return StudentAccount.fromFirebaseDocument(querySnapshot2.docs[0]);
      }
    } else {
      const institutionDoc = querySnapshot.docs[0];
      const institutionData = institutionDoc.data();

      return new TeachingInstitution(
        institutionDoc.id,
        institutionData.wallet_address,
      );
    }
  } catch (err) {
    console.log(err, "OHH SHIT");
    throw "Could Not Get Student's Data";
  }
}

export async function getStudentCertificates(
  student_reg_number: string,
): Promise<Certificate[]> {
  try {
    const q = query(
      collection(db, "certificate"),
      where("student_reg_number", "==", student_reg_number),
    );
    const querySnapshot = await getDocs(q);

    let certificates: Certificate[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      certificates.push(
        new Certificate(
          data.course_name,
          data.university_name,
          data.student_reg_number,
          data.certificate_serial_number,
          data.certificate_image_url,
        ),
      );
    });

    return certificates;
  } catch (err) {
    console.log(err, "OHH SHIT");
    throw "Could Not Get Student's Certificate";
  }
}

export async function searchForCertificate(
  serial_number: string,
  university_name: string,
): Promise<Certificate | void> {
  try {
    const q = query(
      collection(db, "certificate"),
      where("certificate_serial_number", "==", serial_number),
      where("university_name", "==", university_name),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      return;
    }
    const data = querySnapshot.docs[0].data();
    return new Certificate(
      data.course_name,
      data.university_name,
      data.student_reg_number,
      data.certificate_serial_number,
      data.certificate_image_url,
    );
  } catch (err) {
    console.log(err, "OHH SHIT");
    throw "Could Not Search For Certificate";
  }
}

export async function getCourseNamesForUniversity(
  university_name: string,
): Promise<string[]> {
  try {
    const q = query(
      collection(db, "course"),
      where("university", "==", university_name),
    );
    const querySnapshot = await getDocs(q);
    let course_names: string[] = [];

    querySnapshot.forEach((doc) => {
      course_names.push(doc.data().name);
    });

    return course_names;
  } catch (err) {
    console.log(err, "OHH SHIT");
    throw "Could Not Get Courses";
  }
}

export async function getStudentsForAUniversity(
  university_name: string,
): Promise<StudentAccount[]> {
  try {
    const q = query(
      collection(db, "students"),
      where("universityName", "==", university_name),
    );
    const querySnapshot = await getDocs(q);

    let students: StudentAccount[] = [];
    querySnapshot.forEach((doc) => {
      students.push(StudentAccount.fromFirebaseDocument(doc));
    });

    return students;
  } catch (err) {
    console.log(err, "OHH SHIT");
    throw `Could Not Get Students Of ${university_name}`;
  }
}
/**
 * Gets the asset index from firebase
 * @param serial_no number
 */
export async function getIndexFromDb(serial_no: string): Promise<number | void> {
  if (!serial_no) {
    throw new Error("Serial number not provided");
  }
  try {
    console.log("API", process.env.API_KEY);
    console.log("Get Index From DB: Serial Number", serial_no, typeof(serial_no))
    const assetIndexQuery = query(
      collection(db, "certificate"),
      where("certificate_serial_number", "==", serial_no),
    );
    const assetSnapshot = await getDocs(assetIndexQuery);
    // const assetData = assetSnapshot.docs.map((doc) => doc.data());

    if (assetSnapshot.size === 0) {
      console.log("Result Empty")
      return;
    }

    let assetData: any[] = [];
    assetSnapshot.forEach(doc => {
      assetData.push(doc.data())
    });
    console.log("Get Index From DB: Asset Data", assetData);
    return assetData[0].asset_index;
  } catch (e: any) {
    console.log(e, "OHH SHIT");
    throw new Error("Error occured during retrieving asset_index", e);
  }
}
