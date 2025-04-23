import "./list.scss";
import Card from "../Card/Card";
import { PostItem } from "../../types/PropertyTypes"; // adjust the path as needed

interface ListProps {
  posts: PostItem[];
}

const List: React.FC<ListProps> = ({ posts }) => {
  return (
    <div className="list">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;
