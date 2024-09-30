export type TDistrict =
  | "Dhaka"
  | "Faridpur"
  | "Gazipur"
  | "Gopalganj"
  | "Jamalpur"
  | "Kishoreganj"
  | "Madaripur"
  | "Manikganj"
  | "Munshiganj"
  | "Mymensingh"
  | "Narayanganj"
  | "Narsingdi"
  | "Netrokona"
  | "Rajbari"
  | "Shariatpur"
  | "Sherpur"
  | "Tangail"
  | "Bogra"
  | "Joypurhat"
  | "Naogaon"
  | "Natore"
  | "Chapainawabganj"
  | "Pabna"
  | "Rajshahi"
  | "Sirajganj"
  | "Dinajpur"
  | "Gaibandha"
  | "Kurigram"
  | "Lalmonirhat"
  | "Nilphamari"
  | "Panchagarh"
  | "Rangpur"
  | "Thakurgaon"
  | "Barguna"
  | "Barishal"
  | "Bhola"
  | "Jhalokati"
  | "Patuakhali"
  | "Pirojpur"
  | "Bandarban"
  | "Brahmanbaria"
  | "Chandpur"
  | "Chattogram"
  | "Cumilla"
  | "Cox's Bazar"
  | "Feni"
  | "Khagrachari"
  | "Lakshmipur"
  | "Noakhali"
  | "Rangamati"
  | "Habiganj"
  | "Moulvibazar"
  | "Sunamganj"
  | "Sylhet"
  | "Bagerhat"
  | "Chuadanga"
  | "Jessore"
  | "Jhenaidah"
  | "Khulna"
  | "Kushtia"
  | "Magura"
  | "Meherpur"
  | "Narail"
  | "Satkhira";
export type TGender = "Male" | "Female" | "Other";
export type TUserRole = "admin" | "traveler";

export type TTraveler = {
  _id: string;
  user: string; // ObjectId reference to User
  name: string;
  email: string;
  phone: string;
  bio: string;
  postsCount?: number;
  profileImg?: string; // Optional field
  gender: "Male" | "Female" | "Other";
  followers?: string[]; // Array of ObjectId references to Traveler
  following?: string[]; // Array of ObjectId references to Traveler
  district: string;
  dateOfBirth: Date;
  createdAt?: Date; // Timestamp field
  updatedAt?: Date; // Timestamp field
};

export type TUser = {
  _id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  role: TUserRole;
  status: "basic" | "premium";
  isBlocked: boolean;
};
export type TDecodedUser = {
  _id: string;
  email: string;
  role: TUserRole;
};

export type TSignin = {
  email: string;
  password: string;
};
