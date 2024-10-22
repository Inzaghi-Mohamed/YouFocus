// SelectedVideo.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SelectedVideo = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.id) {
      dispatch({ type: 'FETCH_VIDEOS', payload: user.id });
    }
  }, [dispatch, user.id]);

  const handleDelete = (videoId) => {
    dispatch({ type: 'DELETE_VIDEO', payload: { userId: user.id, videoId } });
  };

  // Group videos by search query
  const videosByQuery = videos.reduce((acc, video) => {
    if (!acc[video.search_query]) {
      acc[video.search_query] = [];
    }
    acc[video.search_query].push(video);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Selected Videos</h2>
      {Object.entries(videosByQuery).map(([query, queryVideos]) => (
        <div key={query} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Search: {query}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {queryVideos.map((video) => (
              <Card key={video.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{video.title}</CardTitle>
                  <CardDescription>Added on: {new Date(video.added_at).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.video_id}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <p className="text-sm text-gray-500">{video.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="destructive" onClick={() => handleDelete(video.id)}>Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedVideo;