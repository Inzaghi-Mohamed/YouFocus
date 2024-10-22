import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Skeleton } from "@/components/ui/skeleton"
// import { useToast } from "@/hooks/use-toast"

const YouTubeSearch = () => {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [nextPageToken, setNextPageToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const location = useLocation();
  // const { toast } = useToast()
  const user = useSelector((state) => state.user);
  const API_KEY =  "AIzaSyAMFllGUDjvzGORrLjW-nZUr4-U7tKMk20"
  const MAX_RESULTS = 12;
  const MINIMUM_LOADING_TIME = 2000; // 2 seconds

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      setSearchQuery(query);
      fetchVideos(query);
    }
  }, [location]);

  const fetchVideos = async (query, pageToken = '') => {
    setIsLoading(true);
    const startTime = Date.now();
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: query || searchQuery,
          type: 'video',
          maxResults: MAX_RESULTS,
          key: API_KEY,
          pageToken: pageToken
        }
      });
      
      console.log('Response:', response.data);
      
      const endTime = Date.now();
      const loadingTime = endTime - startTime;
      
      if (loadingTime < MINIMUM_LOADING_TIME) {
        setTimeout(() => {
          setFetchedData({ response: response.data, pageToken });
        }, MINIMUM_LOADING_TIME - loadingTime);
      } else {
        setFetchedData({ response: response.data, pageToken });
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fetchedData) {
      if (fetchedData.pageToken === '') {
        setVideos(fetchedData.response.items);
      } else {
        setVideos(prevVideos => [...prevVideos, ...fetchedData.response.items]);
      }
      setNextPageToken(fetchedData.response.nextPageToken || '');
      setIsLoading(false);
      setFetchedData(null);
    }
  }, [fetchedData]);

  const handleLoadMore = () => {
    fetchVideos(searchQuery, nextPageToken);
  };

  const handleAddToCourse = (video) => {
    const videoData = {
      video_id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      search_query: searchQuery
    };
    dispatch({ 
      type: 'ADD_VIDEO', 
      payload: { 
        userId: user.id, 
        videoData 
      } 
    });
   alert('Added to selected videos')
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
        <button 
          onClick={() => fetchVideos(searchQuery)}
          className='w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
        >
          Search Videos
        </button>
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
                <button 
                  onClick={() => handleAddToCourse(video)}
                  className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors'
                >
                  Add To Course
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {nextPageToken && !isLoading && (
        <div className='text-center mt-8'>
          <button 
            onClick={handleLoadMore}
            className='w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default YouTubeSearch;