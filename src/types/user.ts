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

export type TTraveler = {
  _id: string;
  user: TUser;
  name: string;
  email: string;
  phone: string;
  bio: string;
  postsCount: number;
  profileImg: string;
  gender: "Male" | "Female" | "Other";
  followers: TTraveler[];
  following: TTraveler[];
  district: string;
  dateOfBirth: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TAdmin = {
  _id: string;
  user: TUser;
  name: string;
  email: string;
  phone: string;
  gender: string;
  profileImg: string;
  dateOfBirth: string;
  district: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
