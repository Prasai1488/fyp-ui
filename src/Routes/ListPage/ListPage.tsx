import React, { useEffect, useState, Suspense } from 'react';
import './listPage.scss';
import Filter from '../../components/Filter/Filter';
import Card from '../../components/Card/Card';
import Map from '../../components/Map/Map';
import { useSearchParams } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import { PostItem } from '../../types/PropertyTypes'; // Adjust path

const ListPage: React.FC = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const fetchPosts = async (page: number) => {
    
    try {
      const type = searchParams.get('type') || '';
      const city = searchParams.get('city') || '';
      const minPrice = searchParams.get('minPrice') || 0;
      const maxPrice = searchParams.get('maxPrice') || 0;
      const property = searchParams.get('property') || '';
      const bedroom = searchParams.get('bedroom') || '';
      const propertyStatus = searchParams.get('propertyStatus') || '';

      const res = await apiRequest.get(`/posts?page=${page}&limit=5&type=${type}&city=${city}&minPrice=${minPrice}&maxPrice=${maxPrice}&property=${property}&bedroom=${bedroom}&propertyStatus=${propertyStatus}`);
      
      setPosts(res.data.posts);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      console.log("Fetched Posts:", res.data.posts);

    } catch (err) {
      console.error(err);
      setError('Error loading posts!');
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, searchParams]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {error && <div className="error">{error}</div>}
          <Suspense fallback={<p>Loading...</p>}>
            {posts.map((post) => (
              <Card key={post.id} item={post} />
            ))}
          </Suspense>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Map items={posts} />
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
