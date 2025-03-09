export interface Student {
  studentID?: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: string;        // ✅ Keeping it as string for proper handling
  address: string;
  phoneNumber: string;
  email: string;
  enrollmentDate: string;   // ✅ Keeping it as string for proper handling
}
