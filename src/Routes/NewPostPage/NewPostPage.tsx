

// import { useState } from "react";
// import "./newPostPage.scss";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import apiRequest from "../../lib/apiRequest";
// import UploadWidget from "../../components/UploadWidget/UploadWidget";
// import { useNavigate } from "react-router-dom";
// import { useToastStore } from "../../lib/useToastStore";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

// function NewPostPage() {
//   const LocationPicker = ({
//     onSelect,
//   }: {
//     onSelect: (lat: number, lng: number) => void;
//   }) => {
//     useMapEvents({
//       click(e) {
//         onSelect(e.latlng.lat, e.latlng.lng);
//       },
//     });
//     return null;
//   };
//   const [value, setValue] = useState("");
//   const [images, setImages] = useState<string[]>([]);
//   const { setToast } = useToastStore();
//   const [coordinates, setCoordinates] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(null);
//   const [amenities, setAmenities] = useState<string[]>([]);

//   const [error, setError] = useState("");
//   const [descError, setDescError] = useState("");

//   const navigate = useNavigate();

//   const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (e.target.checked) {
//       setAmenities([...amenities, value]);
//     } else {
//       setAmenities(amenities.filter((item) => item !== value));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const form = e.target as HTMLFormElement;
//     const formData = new FormData(form);
//     const rawInputs = Object.fromEntries(formData.entries());

//     const postData = {
//       title: rawInputs.title?.toString().trim(),
//       price: parseFloat(rawInputs.price as string),
//       address: rawInputs.address?.toString().trim(),
//       city: rawInputs.city?.toString().trim(),
//       bedroom: parseInt(rawInputs.bedroom as string),
//       bathroom: parseInt(rawInputs.bathroom as string),
//       type: rawInputs.type?.toString().trim(),
//       property: rawInputs.property?.toString().trim(),
//       latitude: coordinates?.lat,
//       longitude: coordinates?.lng,
//       images: images,
//     };

//     const div = document.createElement("div");
//     div.innerHTML = value;
//     const processedValue = (div.textContent || div.innerText || "").trim();

//     if (processedValue.length > 1000) {
//       setDescError("Description cannot exceed 1000 characters.");
//       return;
//     } else {
//       setDescError("");
//     }

//     const postDetail = {
//       desc: processedValue,
//       utilities: rawInputs.utilities?.toString().trim(),
//       pet: rawInputs.pet?.toString().trim(),
//       income: rawInputs.income?.toString().trim(),
//       size: isNaN(parseInt(rawInputs.size as string))
//         ? undefined
//         : parseInt(rawInputs.size as string),
//       school: isNaN(parseInt(rawInputs.school as string))
//         ? undefined
//         : parseInt(rawInputs.school as string),
//       bus: isNaN(parseInt(rawInputs.bus as string))
//         ? undefined
//         : parseInt(rawInputs.bus as string),
//       restaurant: isNaN(parseInt(rawInputs.restaurant as string))
//         ? undefined
//         : parseInt(rawInputs.restaurant as string),
//       propertyStatus: rawInputs.propertyStatus?.toString().trim(),

//       // Property Area & Road
//       totalArea: isNaN(parseInt(rawInputs.totalArea as string))
//         ? undefined
//         : parseInt(rawInputs.totalArea as string),
//       buildUpArea: isNaN(parseInt(rawInputs.buildUpArea as string))
//         ? undefined
//         : parseInt(rawInputs.buildUpArea as string),
//       dimension: rawInputs.dimension?.toString().trim(),
//       roadType: rawInputs.roadType?.toString().trim(),
//       propertyFace: rawInputs.propertyFace?.toString().trim(),
//       roadAccess: isNaN(parseInt(rawInputs.roadAccess as string))
//         ? undefined
//         : parseInt(rawInputs.roadAccess as string),

//       // Additional Details
//       kitchen: isNaN(parseInt(rawInputs.kitchen as string))
//         ? undefined
//         : parseInt(rawInputs.kitchen as string),
//       livingRoom: isNaN(parseInt(rawInputs.livingRoom as string))
//         ? undefined
//         : parseInt(rawInputs.livingRoom as string),
//       parking: isNaN(parseInt(rawInputs.parking as string))
//         ? undefined
//         : parseInt(rawInputs.parking as string),
//       totalFloors: isNaN(parseInt(rawInputs.totalFloors as string))
//         ? undefined
//         : parseInt(rawInputs.totalFloors as string),
//       builtYear: rawInputs.builtYear?.toString().trim(),
//       furnishing: rawInputs.furnishing?.toString().trim(),
//       plotNumber: rawInputs.plotNumber?.toString().trim(),
//       propertyCode: rawInputs.propertyCode?.toString().trim(),
//       collection: rawInputs.collection?.toString().trim(),
//       amenities: amenities,

//       // Nearby Location
//       landmark: rawInputs.landmark?.toString().trim(),
//       hospital: rawInputs.hospital?.toString().trim(),
//       airport: rawInputs.airport?.toString().trim(),
//       pharmacy: rawInputs.pharmacy?.toString().trim(),
//       bhatbhateni: rawInputs.bhatbhateni?.toString().trim(),
//       college: rawInputs.college?.toString().trim(),
//       gym: rawInputs.gym?.toString().trim(),
//       publicTransport: rawInputs.publicTransport?.toString().trim(),
//       policeStation: rawInputs.policeStation?.toString().trim(),
//       pashupatinath: rawInputs.pashupatinath?.toString().trim(),
//       boudhanath: rawInputs.boudhanath?.toString().trim(),
//       atm: rawInputs.atm?.toString().trim(),
//       hotel: rawInputs.hotel?.toString().trim(),
//       nearbyRestaurant: rawInputs.nearbyRestaurant?.toString().trim(),
//       banquet: rawInputs.banquet?.toString().trim(),
//       wardOffice: rawInputs.wardOffice?.toString().trim(),
//       ringRoad: rawInputs.ringRoad?.toString().trim(),
//     };

//     try {
//       console.log("Submitting payload:", { postData, postDetail });

//       const res = await apiRequest.post("/posts/create-property", {
//         ...postData,
//         postDetail,
//       });

//       setToast({
//         message: "Your post is under review. You'll be notified if rejected.",
//         type: "success",
//       });

//       navigate("/profile");
//     } catch (err: any) {
//       console.error(err);
//       console.log(err.response?.data);
//       setError("Failed to submit post. Please try again.");
//     }
//   };

//   return (
//     <div className="newPostPage">
//       <div className="formContainer">
//         <h1>Add New Post</h1>
//         <div className="wrapper">
//           <form onSubmit={handleSubmit}>
//             {/* Basic Details */}
//             <h2>Basic Details</h2>
//             <div className="item">
//               <label htmlFor="title">Title</label>
//               <input id="title" name="title" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="price">Price</label>
//               <input
//                 id="price"
//                 name="price"
//                 type="number"
//                 min="1"
//                 max="5000000"
//               />
//             </div>
//             <div className="item">
//               <label htmlFor="address">Address</label>
//               <input id="address" name="address" type="text" />
//             </div>
//             <div className="item description">
//               <label htmlFor="desc">Description</label>
//               <ReactQuill theme="snow" onChange={setValue} value={value} />
//               {descError && <span className="error">{descError}</span>}
//             </div>
//             <div className="item">
//               <label htmlFor="city">City</label>
//               <input id="city" name="city" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="bedroom">Bedroom Number</label>
//               <input min={0} id="bedroom" name="bedroom" type="number" />
//             </div>
//             <div className="item">
//               <label htmlFor="bathroom">Bathroom Number</label>
//               <input min={0} id="bathroom" name="bathroom" type="number" />
//             </div>
//             <div className="item">
//               <label>Select Property Location on Map:</label>
//               <MapContainer
//                 center={[27.7, 85.3]}
//                 zoom={13}
//                 style={{ height: "300px", width: "100%" }}
//               >
//                 <TileLayer
//                   attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <LocationPicker
//                   onSelect={(lat, lng) => setCoordinates({ lat, lng })}
//                 />
//                 {coordinates && (
//                   <Marker position={[coordinates.lat, coordinates.lng]} />
//                 )}
//               </MapContainer>
//             </div>

//             <div className="item">
//               <label htmlFor="type">Type</label>
//               <select name="type">
//                 <option value="rent" defaultChecked>
//                   Rent
//                 </option>
//                 <option value="buy">Buy</option>
//               </select>
//             </div>
//             <div className="item">
//               <label htmlFor="property">Property</label>
//               <select name="property">
//                 <option value="apartment">Apartment</option>
//                 <option value="house">House</option>
//                 <option value="land">Land</option>
//               </select>
//             </div>

//             <div className="item">
//               <label htmlFor="utilities">Utilities Policy</label>
//               <select name="utilities">
//                 <option value="owner">Owner is responsible</option>
//                 <option value="tenant">Tenant is responsible</option>
//                 <option value="shared">Shared</option>
//               </select>
//             </div>
//             <div className="item">
//               <label htmlFor="pet">Pet Policy</label>
//               <select name="pet">
//                 <option value="allowed">Allowed</option>
//                 <option value="not allowed">Not Allowed</option>
//               </select>
//             </div>
//             <div className="item">
//               <label htmlFor="income">Income Policy</label>
//               <input
//                 id="income"
//                 name="income"
//                 type="text"
//                 placeholder="Income Policy"
//               />
//             </div>
//             <div className="item">
//               <label htmlFor="size">Total Size (sqft)</label>
//               <input min={0} id="size" name="size" type="number" />
//             </div>

//             {/* Property Area & Road Section */}
//             <h2>Property Area & Road</h2>
//             <div className="item">
//               <label htmlFor="totalArea">Total Area (sqft)</label>
//               <input min={0} id="totalArea" name="totalArea" type="number" />
//             </div>
//             <div className="item">
//               <label htmlFor="buildUpArea">Build Up Area (sqft)</label>
//               <input
//                 min={0}
//                 id="buildUpArea"
//                 name="buildUpArea"
//                 type="number"
//               />
//             </div>
//             <div className="item">
//               <label htmlFor="dimension">Dimension</label>
//               <input
//                 id="dimension"
//                 name="dimension"
//                 type="text"
//                 placeholder="e.g., 30x40 ft"
//               />
//             </div>
//             <div className="item">
//               <label htmlFor="roadType">Road Type</label>
//               <select name="roadType">
//                 <option value="paved">Paved</option>
//                 <option value="gravel">Gravel</option>
//                 <option value="dirt">Dirt</option>
//                 <option value="asphalt">Asphalt</option>
//               </select>
//             </div>
//             <div className="item">
//               <label htmlFor="propertyFace">Property Face</label>
//               <select name="propertyFace">
//                 <option value="east">East</option>
//                 <option value="west">West</option>
//                 <option value="north">North</option>
//                 <option value="south">South</option>
//                 <option value="northeast">North East</option>
//                 <option value="northwest">North West</option>
//                 <option value="southeast">South East</option>
//                 <option value="southwest">South West</option>
//               </select>
//             </div>
//             <div className="item">
//               <label htmlFor="roadAccess">Road Access (ft)</label>
//               <input min={0} id="roadAccess" name="roadAccess" type="number" />
//             </div>

//             {/* Additional Details Section */}
//             <h2>Additional Details</h2>
//             <div className="item">
//               <label htmlFor="kitchen">Number of Kitchens</label>
//               <input min={0} id="kitchen" name="kitchen" type="number" />
//             </div>
//             <div className="item">
//               <label htmlFor="livingRoom">Number of Living Rooms</label>
//               <input min={0} id="livingRoom" name="livingRoom" type="number" />
//             </div>
//             <div className="item">
//               <label htmlFor="parking">Number of Parking Spaces</label>
//               <input min={0} id="parking" name="parking" type="number" />
//             </div>
//             <div className="item">
//               <label htmlFor="totalFloors">Total Floors</label>
//               <input
//                 min={0}
//                 id="totalFloors"
//                 name="totalFloors"
//                 type="number"
//               />
//             </div>
//             <div className="item">
//               <label htmlFor="builtYear">Built Year</label>
//               <input
//                 id="builtYear"
//                 name="builtYear"
//                 type="text"
//                 placeholder="e.g., 2015"
//               />
//             </div>
//             <div className="item">
//               <label htmlFor="furnishing">Furnishing</label>
//               <select name="furnishing">
//                 <option value="unfurnished">Unfurnished</option>
//                 <option value="semi-furnished">Semi-furnished</option>
//                 <option value="fully-furnished">Fully-furnished</option>
//               </select>
//             </div>
//             <div className="item">
//               <label htmlFor="plotNumber">Plot Number</label>
//               <input id="plotNumber" name="plotNumber" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="propertyCode">Property Code</label>
//               <input id="propertyCode" name="propertyCode" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="collection">Collection</label>
//               <input id="collection" name="collection" type="text" />
//             </div>

//             {/* Amenities */}
//             <div className="item amenities">
//               <label>Amenities</label>
//               <div className="checkbox-group">
//                 <div className="checkbox-item">
//                   <input
//                     type="checkbox"
//                     id="wifi"
//                     value="wifi"
//                     onChange={handleAmenityChange}
//                   />
//                   <label htmlFor="wifi">WiFi</label>
//                 </div>
//                 <div className="checkbox-item">
//                   <input
//                     type="checkbox"
//                     id="ac"
//                     value="ac"
//                     onChange={handleAmenityChange}
//                   />
//                   <label htmlFor="ac">AC</label>
//                 </div>
//                 <div className="checkbox-item">
//                   <input
//                     type="checkbox"
//                     id="garden"
//                     value="garden"
//                     onChange={handleAmenityChange}
//                   />
//                   <label htmlFor="garden">Garden</label>
//                 </div>
//                 <div className="checkbox-item">
//                   <input
//                     type="checkbox"
//                     id="pool"
//                     value="pool"
//                     onChange={handleAmenityChange}
//                   />
//                   <label htmlFor="pool">Swimming Pool</label>
//                 </div>
//                 <div className="checkbox-item">
//                   <input
//                     type="checkbox"
//                     id="gym-amenity"
//                     value="gym"
//                     onChange={handleAmenityChange}
//                   />
//                   <label htmlFor="gym-amenity">Gym</label>
//                 </div>
//                 <div className="checkbox-item">
//                   <input
//                     type="checkbox"
//                     id="elevator"
//                     value="elevator"
//                     onChange={handleAmenityChange}
//                   />
//                   <label htmlFor="elevator">Elevator</label>
//                 </div>
//                 <div className="checkbox-item">
//                   <input
//                     type="checkbox"
//                     id="security"
//                     value="security"
//                     onChange={handleAmenityChange}
//                   />
//                   <label htmlFor="security">24/7 Security</label>
//                 </div>
//                 <div className="checkbox-item">
//                   <input
//                     type="checkbox"
//                     id="balcony"
//                     value="balcony"
//                     onChange={handleAmenityChange}
//                   />
//                   <label htmlFor="balcony">Balcony</label>
//                 </div>
//               </div>
//             </div>

//             {/* Nearby Location Details */}
//             <h2>Nearby Location Details</h2>
//             <div className="item">
//               <label htmlFor="school">School nearby (in meter)</label>
//               <input min={0} id="school" name="school" type="number" />
//             </div>
//             <div className="item">
//               <label htmlFor="bus">Bus station nearby (in meter)</label>
//               <input min={0} id="bus" name="bus" type="number" />
//             </div>
//             <div className="item">
//               <label htmlFor="restaurant">Restaurants nearby (in meter)</label>
//               <input min={0} id="restaurant" name="restaurant" type="number" />
//             </div>
//             <div className="item">
//               <label htmlFor="landmark">Landmark</label>
//               <input
//                 id="landmark"
//                 name="landmark"
//                 type="text"
//                 placeholder="Nearest landmark"
//               />
//             </div>
//             <div className="item">
//               <label htmlFor="hospital">Hospital (in meter)</label>
//               <input id="hospital" name="hospital" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="airport">Airport (in km)</label>
//               <input id="airport" name="airport" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="pharmacy">Pharmacy (in meter)</label>
//               <input id="pharmacy" name="pharmacy" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="bhatbhateni">Bhatbhateni (in meter)</label>
//               <input id="bhatbhateni" name="bhatbhateni" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="college">College (in meter)</label>
//               <input id="college" name="college" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="gym">Gym (in meter)</label>
//               <input id="gym" name="gym" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="publicTransport">
//                 Public Transport (in meter)
//               </label>
//               <input id="publicTransport" name="publicTransport" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="policeStation">Police Station (in meter)</label>
//               <input id="policeStation" name="policeStation" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="pashupatinath">Pashupatinath (in km)</label>
//               <input id="pashupatinath" name="pashupatinath" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="boudhanath">Boudhanath (in km)</label>
//               <input id="boudhanath" name="boudhanath" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="atm">ATM (in meter)</label>
//               <input id="atm" name="atm" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="hotel">Hotel (in meter)</label>
//               <input id="hotel" name="hotel" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="nearbyRestaurant">
//                 Nearby Restaurant (in meter)
//               </label>
//               <input
//                 id="nearbyRestaurant"
//                 name="nearbyRestaurant"
//                 type="text"
//               />
//             </div>
//             <div className="item">
//               <label htmlFor="banquet">Banquet (in meter)</label>
//               <input id="banquet" name="banquet" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="wardOffice">Ward Office (in meter)</label>
//               <input id="wardOffice" name="wardOffice" type="text" />
//             </div>
//             <div className="item">
//               <label htmlFor="ringRoad">Ring Road (in km)</label>
//               <input id="ringRoad" name="ringRoad" type="text" />
//             </div>

//             {/* Property Status */}
//             <div className="item">
//               <label htmlFor="propertyStatus">Property Status</label>
//               <select name="propertyStatus">
//                 <option value="Available">Available</option>
//                 <option value="Booked">Booked</option>
//                 <option value="SoldOut">Sold Out</option>
//               </select>
//             </div>

//             <button className="sendButton">Add</button>
//             {error && <span className="error">{error}</span>}
//           </form>
//         </div>
//       </div>
//       <div className="sideContainer">
//         {images.map((image, index) => (
//           <img src={image} key={index} alt="" />
//         ))}
//         <UploadWidget
//           uwConfig={{
//             multiple: true,
//             cloudName: "lamadev",
//             uploadPreset: "estate",
//             folder: "posts",
//           }}
//           setState={setImages}
//         />
//       </div>
//     </div>
//   );
// }

// export default NewPostPage;











import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "../../lib/useToastStore";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

// Define the form values interface
interface FormValues {
  title: string;
  price: string;
  address: string;
  city: string;
  bedroom: string;
  bathroom: string;
  type: string;
  property: string;
  utilities: string;
  pet: string;
  income: string;
  size: string;
  totalArea: string;
  buildUpArea: string;
  dimension: string;
  roadType: string;
  propertyFace: string;
  roadAccess: string;
  kitchen: string;
  livingRoom: string;
  parking: string;
  totalFloors: string;
  builtYear: string;
  furnishing: string;
  plotNumber: string;
  propertyCode: string;
  collection: string;
  school: string;
  bus: string;
  restaurant: string;
  landmark: string;
  hospital: string;
  airport: string;
  pharmacy: string;
  bhatbhateni: string;
  college: string;
  gym: string;
  publicTransport: string;
  policeStation: string;
  pashupatinath: string;
  boudhanath: string;
  atm: string;
  hotel: string;
  nearbyRestaurant: string;
  banquet: string;
  wardOffice: string;
  ringRoad: string;
  propertyStatus: string;
}

function NewPostPage() {
  const LocationPicker = ({
    onSelect,
  }: {
    onSelect: (lat: number, lng: number) => void;
  }) => {
    useMapEvents({
      click(e) {
        onSelect(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const { setToast } = useToastStore();
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [descError, setDescError] = useState("");

  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required").positive("Price must be positive"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    bedroom: Yup.number().min(0, "Cannot be negative"),
    bathroom: Yup.number().min(0, "Cannot be negative"),
  });

  const initialValues: FormValues = {
    title: "",
    price: "",
    address: "",
    city: "",
    bedroom: "0",
    bathroom: "0",
    type: "rent",
    property: "apartment",
    utilities: "owner",
    pet: "allowed",
    income: "",
    size: "",
    totalArea: "",
    buildUpArea: "",
    dimension: "",
    roadType: "paved",
    propertyFace: "east",
    roadAccess: "",
    kitchen: "",
    livingRoom: "",
    parking: "",
    totalFloors: "",
    builtYear: "",
    furnishing: "unfurnished",
    plotNumber: "",
    propertyCode: "",
    collection: "",
    school: "",
    bus: "",
    restaurant: "",
    landmark: "",
    hospital: "",
    airport: "",
    pharmacy: "",
    bhatbhateni: "",
    college: "",
    gym: "",
    publicTransport: "",
    policeStation: "",
    pashupatinath: "",
    boudhanath: "",
    atm: "",
    hotel: "",
    nearbyRestaurant: "",
    banquet: "",
    wardOffice: "",
    ringRoad: "",
    propertyStatus: "Available",
  };

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((item) => item !== value));
    }
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>
  ) => {
    // Process description
    const div = document.createElement("div");
    div.innerHTML = description;
    const processedDescription = (div.textContent || div.innerText || "").trim();

    if (processedDescription.length > 1000) {
      setDescError("Description cannot exceed 1000 characters.");
      setSubmitting(false);
      return;
    } else {
      setDescError("");
    }

    // Check if coordinates are selected
    if (!coordinates) {
      setErrors({ address: "Please select a location on the map" });
      setSubmitting(false);
      return;
    }

    const postData = {
      title: values.title,
      price: parseFloat(values.price),
      address: values.address,
      city: values.city,
      bedroom: parseInt(values.bedroom),
      bathroom: parseInt(values.bathroom),
      type: values.type,
      property: values.property,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      images: images,
    };

    const postDetail = {
      desc: processedDescription,
      utilities: values.utilities,
      pet: values.pet,
      income: values.income,
      size: values.size ? parseInt(values.size) : undefined,
      school: values.school ? parseInt(values.school) : undefined,
      bus: values.bus ? parseInt(values.bus) : undefined,
      restaurant: values.restaurant ? parseInt(values.restaurant) : undefined,
      propertyStatus: values.propertyStatus,

      // Property Area & Road
      totalArea: values.totalArea ? parseInt(values.totalArea) : undefined,
      buildUpArea: values.buildUpArea ? parseInt(values.buildUpArea) : undefined,
      dimension: values.dimension,
      roadType: values.roadType,
      propertyFace: values.propertyFace,
      roadAccess: values.roadAccess ? parseInt(values.roadAccess) : undefined,

      // Additional Details
      kitchen: values.kitchen ? parseInt(values.kitchen) : undefined,
      livingRoom: values.livingRoom ? parseInt(values.livingRoom) : undefined,
      parking: values.parking ? parseInt(values.parking) : undefined,
      totalFloors: values.totalFloors ? parseInt(values.totalFloors) : undefined,
      builtYear: values.builtYear,
      furnishing: values.furnishing,
      plotNumber: values.plotNumber,
      propertyCode: values.propertyCode,
      collection: values.collection,
      amenities: amenities,

      // Nearby Location
      landmark: values.landmark,
      hospital: values.hospital,
      airport: values.airport,
      pharmacy: values.pharmacy,
      bhatbhateni: values.bhatbhateni,
      college: values.college,
      gym: values.gym,
      publicTransport: values.publicTransport,
      policeStation: values.policeStation,
      pashupatinath: values.pashupatinath,
      boudhanath: values.boudhanath,
      atm: values.atm,
      hotel: values.hotel,
      nearbyRestaurant: values.nearbyRestaurant,
      banquet: values.banquet,
      wardOffice: values.wardOffice,
      ringRoad: values.ringRoad,
    };

    try {
      console.log("Submitting payload:", { postData, postDetail });

      const res = await apiRequest.post("/posts/create-property", {
        ...postData,
        postDetail,
      });

      setToast({
        message: "Your post is under review. You'll be notified if rejected.",
        type: "success",
      });

      navigate("/profile");
    } catch (err: any) {
      console.error(err);
      console.log(err.response?.data);
      setErrors({ title: "Failed to submit post. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                {/* Basic Details */}
                <h2>Basic Details</h2>
                <div className="item">
                  <label htmlFor="title">Title</label>
                  <Field id="title" name="title" type="text" />
                  <ErrorMessage name="title" component="div" className="error" />
                </div>
                <div className="item">
                  <label htmlFor="price">Price</label>
                  <Field
                    id="price"
                    name="price"
                    type="number"
                    min="1"
                    max="5000000"
                  />
                  <ErrorMessage name="price" component="div" className="error" />
                </div>
                <div className="item">
                  <label htmlFor="address">Address</label>
                  <Field id="address" name="address" type="text" />
                  <ErrorMessage name="address" component="div" className="error" />
                </div>
                <div className="item description">
                  <label htmlFor="desc">Description</label>
                  <ReactQuill theme="snow" onChange={setDescription} value={description} />
                  {descError && <span className="error">{descError}</span>}
                </div>
                <div className="item">
                  <label htmlFor="city">City</label>
                  <Field id="city" name="city" type="text" />
                  <ErrorMessage name="city" component="div" className="error" />
                </div>
                <div className="item">
                  <label htmlFor="bedroom">Bedroom Number</label>
                  <Field min={0} id="bedroom" name="bedroom" type="number" />
                  <ErrorMessage name="bedroom" component="div" className="error" />
                </div>
                <div className="item">
                  <label htmlFor="bathroom">Bathroom Number</label>
                  <Field min={0} id="bathroom" name="bathroom" type="number" />
                  <ErrorMessage name="bathroom" component="div" className="error" />
                </div>
                <div className="item">
                  <label>Select Property Location on Map:</label>
                  <MapContainer
                    center={[27.7, 85.3]}
                    zoom={13}
                    style={{ height: "300px", width: "100%" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationPicker
                      onSelect={(lat, lng) => setCoordinates({ lat, lng })}
                    />
                    {coordinates && (
                      <Marker position={[coordinates.lat, coordinates.lng]} />
                    )}
                  </MapContainer>
                  {errors.address && touched.address && (
                    <div className="error">{errors.address}</div>
                  )}
                </div>

                <div className="item">
                  <label htmlFor="type">Type</label>
                  <Field as="select" name="type">
                    <option value="rent">Rent</option>
                    <option value="buy">Buy</option>
                  </Field>
                </div>
                <div className="item">
                  <label htmlFor="property">Property</label>
                  <Field as="select" name="property">
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="land">Land</option>
                  </Field>
                </div>

                <div className="item">
                  <label htmlFor="utilities">Utilities Policy</label>
                  <Field as="select" name="utilities">
                    <option value="owner">Owner is responsible</option>
                    <option value="tenant">Tenant is responsible</option>
                    <option value="shared">Shared</option>
                  </Field>
                </div>
                <div className="item">
                  <label htmlFor="pet">Pet Policy</label>
                  <Field as="select" name="pet">
                    <option value="allowed">Allowed</option>
                    <option value="not allowed">Not Allowed</option>
                  </Field>
                </div>
                <div className="item">
                  <label htmlFor="income">Income Policy</label>
                  <Field
                    id="income"
                    name="income"
                    type="text"
                    placeholder="Income Policy"
                  />
                </div>
                <div className="item">
                  <label htmlFor="size">Total Size (sqft)</label>
                  <Field min={0} id="size" name="size" type="number" />
                </div>

                {/* Property Area & Road Section */}
                <h2>Property Area & Road</h2>
                <div className="item">
                  <label htmlFor="totalArea">Total Area (sqft)</label>
                  <Field min={0} id="totalArea" name="totalArea" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="buildUpArea">Build Up Area (sqft)</label>
                  <Field
                    min={0}
                    id="buildUpArea"
                    name="buildUpArea"
                    type="number"
                  />
                </div>
                <div className="item">
                  <label htmlFor="dimension">Dimension</label>
                  <Field
                    id="dimension"
                    name="dimension"
                    type="text"
                    placeholder="e.g., 30x40 ft"
                  />
                </div>
                <div className="item">
                  <label htmlFor="roadType">Road Type</label>
                  <Field as="select" name="roadType">
                    <option value="paved">Paved</option>
                    <option value="gravel">Gravel</option>
                    <option value="dirt">Dirt</option>
                    <option value="asphalt">Asphalt</option>
                  </Field>
                </div>
                <div className="item">
                  <label htmlFor="propertyFace">Property Face</label>
                  <Field as="select" name="propertyFace">
                    <option value="east">East</option>
                    <option value="west">West</option>
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="northeast">North East</option>
                    <option value="northwest">North West</option>
                    <option value="southeast">South East</option>
                    <option value="southwest">South West</option>
                  </Field>
                </div>
                <div className="item">
                  <label htmlFor="roadAccess">Road Access (ft)</label>
                  <Field min={0} id="roadAccess" name="roadAccess" type="number" />
                </div>

                {/* Additional Details Section */}
                <h2>Additional Details</h2>
                <div className="item">
                  <label htmlFor="kitchen">Number of Kitchens</label>
                  <Field min={0} id="kitchen" name="kitchen" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="livingRoom">Number of Living Rooms</label>
                  <Field min={0} id="livingRoom" name="livingRoom" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="parking">Number of Parking Spaces</label>
                  <Field min={0} id="parking" name="parking" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="totalFloors">Total Floors</label>
                  <Field
                    min={0}
                    id="totalFloors"
                    name="totalFloors"
                    type="number"
                  />
                </div>
                <div className="item">
                  <label htmlFor="builtYear">Built Year</label>
                  <Field
                    id="builtYear"
                    name="builtYear"
                    type="text"
                    placeholder="e.g., 2015"
                  />
                </div>
                <div className="item">
                  <label htmlFor="furnishing">Furnishing</label>
                  <Field as="select" name="furnishing">
                    <option value="unfurnished">Unfurnished</option>
                    <option value="semi-furnished">Semi-furnished</option>
                    <option value="fully-furnished">Fully-furnished</option>
                  </Field>
                </div>
                <div className="item">
                  <label htmlFor="plotNumber">Plot Number</label>
                  <Field id="plotNumber" name="plotNumber" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="propertyCode">Property Code</label>
                  <Field id="propertyCode" name="propertyCode" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="collection">Collection</label>
                  <Field id="collection" name="collection" type="text" />
                </div>

                {/* Amenities */}
                <div className="item amenities">
                  <label>Amenities</label>
                  <div className="checkbox-group">
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="wifi"
                        value="wifi"
                        onChange={handleAmenityChange}
                      />
                      <label htmlFor="wifi">WiFi</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="ac"
                        value="ac"
                        onChange={handleAmenityChange}
                      />
                      <label htmlFor="ac">AC</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="garden"
                        value="garden"
                        onChange={handleAmenityChange}
                      />
                      <label htmlFor="garden">Garden</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="pool"
                        value="pool"
                        onChange={handleAmenityChange}
                      />
                      <label htmlFor="pool">Swimming Pool</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="gym-amenity"
                        value="gym"
                        onChange={handleAmenityChange}
                      />
                      <label htmlFor="gym-amenity">Gym</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="elevator"
                        value="elevator"
                        onChange={handleAmenityChange}
                      />
                      <label htmlFor="elevator">Elevator</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="security"
                        value="security"
                        onChange={handleAmenityChange}
                      />
                      <label htmlFor="security">24/7 Security</label>
                    </div>
                    <div className="checkbox-item">
                      <input
                        type="checkbox"
                        id="balcony"
                        value="balcony"
                        onChange={handleAmenityChange}
                      />
                      <label htmlFor="balcony">Balcony</label>
                    </div>
                  </div>
                </div>

                {/* Nearby Location Details */}
                <h2>Nearby Location Details</h2>
                <div className="item">
                  <label htmlFor="school">School nearby (in meter)</label>
                  <Field min={0} id="school" name="school" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="bus">Bus station nearby (in meter)</label>
                  <Field min={0} id="bus" name="bus" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="restaurant">Restaurants nearby (in meter)</label>
                  <Field min={0} id="restaurant" name="restaurant" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="landmark">Landmark</label>
                  <Field
                    id="landmark"
                    name="landmark"
                    type="text"
                    placeholder="Nearest landmark"
                  />
                </div>
                <div className="item">
                  <label htmlFor="hospital">Hospital (in meter)</label>
                  <Field id="hospital" name="hospital" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="airport">Airport (in km)</label>
                  <Field id="airport" name="airport" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="pharmacy">Pharmacy (in meter)</label>
                  <Field id="pharmacy" name="pharmacy" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="bhatbhateni">Bhatbhateni (in meter)</label>
                  <Field id="bhatbhateni" name="bhatbhateni" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="college">College (in meter)</label>
                  <Field id="college" name="college" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="gym">Gym (in meter)</label>
                  <Field id="gym" name="gym" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="publicTransport">
                    Public Transport (in meter)
                  </label>
                  <Field id="publicTransport" name="publicTransport" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="policeStation">Police Station (in meter)</label>
                  <Field id="policeStation" name="policeStation" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="pashupatinath">Pashupatinath (in km)</label>
                  <Field id="pashupatinath" name="pashupatinath" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="boudhanath">Boudhanath (in km)</label>
                  <Field id="boudhanath" name="boudhanath" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="atm">ATM (in meter)</label>
                  <Field id="atm" name="atm" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="hotel">Hotel (in meter)</label>
                  <Field id="hotel" name="hotel" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="nearbyRestaurant">
                    Nearby Restaurant (in meter)
                  </label>
                  <Field
                    id="nearbyRestaurant"
                    name="nearbyRestaurant"
                    type="text"
                  />
                </div>
                <div className="item">
                  <label htmlFor="banquet">Banquet (in meter)</label>
                  <Field id="banquet" name="banquet" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="wardOffice">Ward Office (in meter)</label>
                  <Field id="wardOffice" name="wardOffice" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="ringRoad">Ring Road (in km)</label>
                  <Field id="ringRoad" name="ringRoad" type="text" />
                </div>

                {/* Property Status */}
                <div className="item">
                  <label htmlFor="propertyStatus">Property Status</label>
                  <Field as="select" name="propertyStatus">
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="SoldOut">Sold Out</option>
                  </Field>
                </div>

                <button className="sendButton" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;