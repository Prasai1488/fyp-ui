export interface PostDetail {
  id: string;
  desc: string;
  utilities: string;
  pet: string;
  income: string;
  size: number;
  school: number;
  bus: number;
  restaurant: number;
  propertyStatus: string;
  postId: string;
  // New properties from the form
  totalArea?: number;
  buildUpArea?: number;
  dimension?: string;
  roadType?: string;
  propertyFace?: string;
  roadAccess?: number;
  kitchen?: number;
  livingRoom?: number;
  parking?: number;
  totalFloors?: number;
  builtYear?: string;
  furnishing?: string;
  plotNumber?: string;
  propertyCode?: string;
  collection?: string;
  amenities?: string[];

  // Nearby locations
  landmark?: string;
  hospital?: string;
  airport?: string;
  pharmacy?: string;
  bhatbhateni?: string;
  college?: string;
  gym?: string;
  publicTransport?: string;
  policeStation?: string;
  pashupatinath?: string;
  boudhanath?: string;
  atm?: string;
  hotel?: string;
  nearbyRestaurant?: string;
  banquet?: string;
  wardOffice?: string;
  ringRoad?: string;
}

export interface PostUser {
  id: string;
  username: string;
  avatar: string | null;
}

export interface PostItem {
  id: string;
  title: string;
  price: number;
  images: string[];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  latitude: number;
  longitude: number;
  type: string;
  property: string;
  createdAt: string;
  userId: string;
  views: number;
  status: "APPROVED" | "PENDING" | "REJECTED";
  postDetail?: PostDetail;
  user?: PostUser;
  isSaved?: boolean;
}
