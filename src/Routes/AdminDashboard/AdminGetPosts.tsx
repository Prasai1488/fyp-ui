// import { useEffect, useState } from "react";
// import apiRequest from "../../lib/apiRequest";
// import "./adminPosts.scss";

// interface AdminPost {
//   id: string;
//   title: string;
//   city: string;
//   type: string;
//   status: string;
//   createdAt: string;
//   user: {
//     id: string;
//     username: string;
//     email: string;
//   };
// }

// const AdminGetPosts = () => {
//   const [posts, setPosts] = useState<AdminPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filters, setFilters] = useState({
//     status: "",
//     city: "",
//     type: "",
//   });
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       try {
//         const query = new URLSearchParams({
//           ...filters,
//           page: page.toString(),
//           limit: "10",
//         });

//         const res = await apiRequest.get(`/admin/posts?${query}`);
//         setPosts(res.data.data);
//         setTotalPages(res.data.totalPages);
//       } catch (err) {
//         setError("Failed to fetch posts");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [filters, page]);

//   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     setPage(1); // reset to first page when filter changes
//   };

//   return (
//     <div className="adminPosts">
//       <h1>Manage Posts</h1>

//       <div className="filters">
//         <select name="status" onChange={handleFilterChange} value={filters.status}>
//           <option value="">All Statuses</option>
//           <option value="APPROVED">Approved</option>
//           <option value="PENDING">Pending</option>
//           <option value="REJECTED">Rejected</option>
//         </select>

//         <select name="type" onChange={handleFilterChange} value={filters.type}>
//           <option value="">All Types</option>
//           <option value="buy">Buy</option>
//           <option value="rent">Rent</option>
//         </select>

//         <select name="city" onChange={handleFilterChange} value={filters.city}>
//           <option value="">All Cities</option>
//           <option value="Kathmandu">Kathmandu</option>
//           <option value="Lalitpur">Lalitpur</option>
//           <option value="Bhaktapur">Bhaktapur</option>
//         </select>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="error">{error}</p>
//       ) : posts.length === 0 ? (
//         <p>No posts found.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>User</th>
//               <th>City</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {posts.map((post) => (
//               <tr key={post.id}>
//                 <td>{post.title}</td>
//                 <td>{post.user?.username}</td>
//                 <td>{post.city}</td>
//                 <td>{post.type}</td>
//                 <td>{post.status}</td>
//                 <td>{new Date(post.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="pagination">
//         <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
//           Prev
//         </button>
//         <span>
//           Page {page} of {totalPages}
//         </span>
//         <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminGetPosts;

import { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import "./adminPosts.scss";

interface AdminPost {
  id: string;
  title: string;
  city: string;
  type: string;
  status: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

const AdminGetPosts = () => {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    city: "",
    type: "",
    from: "",
    to: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          ...filters,
          page: page.toString(),
          limit: "10",
        });

        const res = await apiRequest.get(`/admin/posts?${query}`);
        setPosts(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        setError("Failed to fetch posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filters, page]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setPage(1);
  };

  return (
    <div className="adminPosts">
      <h1>Manage Posts</h1>

      <div className="filters">
        <select
          name="status"
          onChange={handleFilterChange}
          value={filters.status}
        >
          <option value="">All Statuses</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <select name="type" onChange={handleFilterChange} value={filters.type}>
          <option value="">All Types</option>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>

        <select name="city" onChange={handleFilterChange} value={filters.city}>
          <option value="">All Cities</option>
          <option value="Kathmandu">Kathmandu</option>
          <option value="Lalitpur">Lalitpur</option>
          <option value="Bhaktapur">Bhaktapur</option>
        </select>

        <input
          type="date"
          name="from"
          value={filters.from}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="to"
          value={filters.to}
          onChange={handleFilterChange}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>City</th>
              <th>Type</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.user?.username}</td>
                <td>{post.city}</td>
                <td>{post.type}</td>
                <td>{post.status}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminGetPosts;
