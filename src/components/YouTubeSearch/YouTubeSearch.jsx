import React, { useState, useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

const YouTubeSearch = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const location = useLocation();
  const { toast } = useToast()
  const user = useSelector((state) => state.user);
  const { items: videos, nextPageToken } = useSelector((state) => state.videos.youtubeSearchResults);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const MAX_RESULTS = 12;
  const MINIMUM_LOADING_TIME = 2000; // 2 seconds

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [location]);

  const handleSearch = (query) => {
    setIsLoading(true);
    dispatch({ type: 'SEARCH_YOUTUBE_VIDEOS', payload: { query } });
    setTimeout(() => setIsLoading(false), MINIMUM_LOADING_TIME);
  };

  const handleLoadMore = () => {
    dispatch({ type: 'SEARCH_YOUTUBE_VIDEOS', payload: { query: searchQuery, pageToken: nextPageToken } });
  };

  const handleAddToCourse = (video) => {
    const videoData = {
      video_id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      search_query: searchQuery
    };
    dispatch({ type: 'ADD_VIDEO', payload: videoData });
    toast({
      title: "Video Added",
      description: "The video has been added to your course.",
    });
    // Removed the immediate navigation to allow the user to see the toast
    // and potentially add more videos before going to the selected videos page
  };

  const SkeletonVideo = () => (
    <div className='flex flex-col bg-white rounded-lg shadow-md overflow-hidden'>
      <Skeleton className="w-full pt-[56.25%]" />
      <div className='p-4 flex-grow'>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
  return (
    <div className='container mx-auto px-4 py-8 '>
      <h2 className='text-center mb-4 font-bold'>YouTube Search View</h2>
      <div className='search-section mb-8'>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for Videos"
          className='w-full p-2 border border-gray-300 rounded mb-4'
        />
        <Button 
          onClick={() => handleSearch(searchQuery)}
          className='w-full bg-blue-600 hover:bg-blue-500'
        >
          Search Videos
        </Button>
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {isLoading ? (
          Array(MAX_RESULTS).fill().map((_, index) => (
            <SkeletonVideo key={index} />
          ))
        ) : (
          videos.map((video) => (
            <div key={video.id.videoId} className='flex flex-col bg-white rounded-lg shadow-md overflow-hidden container mx-auto p-2 mb-2'>
              <div className='relative pt-[56.25%] '>
                <iframe
                  className='absolute inset-0 w-full h-full'
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title={video.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className='p-4 flex-grow'>
                <h3 className='text-lg font-semibold mb-2 truncate'>{video.snippet.title}</h3>
                <p className='text-sm text-gray-600 mb-4 truncate'>{video.snippet.description}</p>
                <Button 
                  onClick={() => handleAddToCourse(video)}
                  variant="secondary"
                  className='bg-green-600 hover:bg-green-500 text-white'
                >
                  Add To Course
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {nextPageToken && !isLoading && (
        <div className='text-center mt-8'>
          <Button 
            onClick={handleLoadMore}
            className='w-full'
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default YouTubeSearch;