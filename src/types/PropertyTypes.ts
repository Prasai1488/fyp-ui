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
  