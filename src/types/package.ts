export interface TPackage {
  _id: string;
  name:
    | "Basic"
    | "Standard"
    | "Premium"
    | "Explorer"
    | "Backpacker"
    | "Adventurer";
  shortBio: string;
  description: string;
  price: number;
  durationInMonths: number;
  benefits: string[];
  currencyType: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
