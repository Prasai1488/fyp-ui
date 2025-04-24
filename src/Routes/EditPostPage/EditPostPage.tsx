import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import "./editPostPage.scss";
import { PostItem } from "../../types/PropertyTypes";
import { useToastStore } from "../../lib/useToastStore";

interface PostFormData {
  title: string;
  price: string;
  description: string;
  income: string;
  school: string;
  bus: string;
  restaurant: string;
  propertyStatus: string;
  images: string[];
}

const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setToast } = useToastStore();

  const [post, setPost] = useState<PostFormData>({
    title: "",
    price: "",
    description: "",
    income: "",
    school: "",
    bus: "",
    restaurant: "",
    propertyStatus: "",
    images: [],
  });

  const [value, setValue] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiRequest.get(`/posts/${id}`);
        const { title, price, postDetail, images } = response.data as PostItem;

        setPost({
          title,
          price: price.toString(),
          description: postDetail?.desc || "",
          income: postDetail?.income || "",
          school: postDetail?.school?.toString() || "",
          bus: postDetail?.bus?.toString() || "",
          restaurant: postDetail?.restaurant?.toString() || "",
          propertyStatus: postDetail?.propertyStatus || "",
          images,
        });

        setValue(postDetail?.desc || "");
        setImages(images);
      } catch (err) {
        console.error("Failed to fetch post", err);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const div = document.createElement("div");
    div.innerHTML = value;
    const processedValue = (div.textContent || div.innerText || "").trim();

    try {
      await apiRequest.put(`/posts/update-property/${id}`, {
        title: post.title.trim(),
        price: parseInt(post.price),
        images: images,
        postDetail: {
          desc: processedValue,
          income: post.income.trim(),
          school: isNaN(parseInt(post.school))
            ? undefined
            : parseInt(post.school),
          bus: isNaN(parseInt(post.bus)) ? undefined : parseInt(post.bus),
          restaurant: isNaN(parseInt(post.restaurant))
            ? undefined
            : parseInt(post.restaurant),
          propertyStatus: post.propertyStatus,
        },
      });

      setToast({
        message: "Post updated successfully!",
        type: "success",
      });

      navigate("/profile");
    } catch (err: any) {
      console.error("Failed to update post", err);
      console.log(err.response?.data);
      setError("Failed to update post. Please check your inputs.");
    }
  };

  return (
    <div className="editPost">
      <div className="formContainer">
        <h1>Edit Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={post.title}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                value={post.price}
                onChange={handleChange}
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="propertyStatus">Property Status</label>
              <select
                id="propertyStatus"
                name="propertyStatus"
                value={post.propertyStatus}
                onChange={handleChange}
              >
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="SoldOut">Sold Out</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input
                id="school"
                name="school"
                type="number"
                value={post.school}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus</label>
              <input
                id="bus"
                name="bus"
                type="number"
                value={post.bus}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input
                id="restaurant"
                name="restaurant"
                type="number"
                value={post.restaurant}
                onChange={handleChange}
              />
            </div>
            <button className="sendButton">Update</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="Uploaded preview" />
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
};

export default EditPostPage;
