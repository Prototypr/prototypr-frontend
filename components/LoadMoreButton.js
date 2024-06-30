import React from 'react';
import Button from './Primitives/Button';

const LoadMoreButton = ({ 
  total, 
  pageSize, 
  currentCount, 
  onLoadMore, 
  loading 
}) => {
  const hasMore = currentCount < total;

  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-2 pb-12 md:pb-4">
      <Button
        onClick={onLoadMore}
        disabled={loading}
        className={`!rounded-full ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Loading...' : 'Load more'}
      </Button>
    </div>
  );
};

export default LoadMoreButton;