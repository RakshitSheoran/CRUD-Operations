import axios from "axios";
const api = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });

export function getPosts() {
  const result = api.get("/posts");
  return result;
}

export function deletePosts(id) {
  const result = api.delete(`/posts/${id}`);
  return result;
}

export function addPosts(post) {
  const result = api.post("/posts", post);
  return result;
}
export function updateData(id, post) {
  const result = api.put(`/posts/${id}`, post);
  return result;
}
