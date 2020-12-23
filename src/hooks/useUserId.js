import { v4 as uuid } from "uuid";

const useUserId = () => {
  let id = sessionStorage.getItem("GamesCenterUserId");
  if (!id) {
    id = uuid();
    sessionStorage.setItem("GamesCenterUserId", id);
  }
  return id;
};

export default useUserId;
