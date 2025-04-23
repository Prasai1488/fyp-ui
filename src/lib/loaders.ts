import { defer, LoaderFunctionArgs } from "react-router-dom";
import apiRequest from "./apiRequest";
import { PostItem } from "../types/PropertyTypes";
import { AxiosResponse } from "axios";

export const singlePageLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<PostItem> => {
  const res: AxiosResponse<PostItem> = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request }: LoaderFunctionArgs) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/posts?" + query); // returns Promise<AxiosResponse<{ posts: PostItem[], ... }>>
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/user/profilePosts");
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
