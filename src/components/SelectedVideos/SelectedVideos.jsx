import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast"

const SelectedVideo = () => {
  const dispatch = useDispatch();
  const savedVideos = useSelector((state) => state.videos.savedVideos);
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (user.id) {
      setIsLoading(true);
      dispatch({ type: 'FETCH_VIDEOS' });
    }
  }, [dispatch, user.id]);

  useEffect(() => {
    if (savedVideos) {
      setIsLoading(false);
    }
  }, [savedVideos]);

  const handleDelete = (videoId) => {
    dispatch({ type: 'DELETE_VIDEO', payload: videoId });
    toast({
      title: "Video successfully Deleted ✌️",
      description: "The video has been removed from your course.",
      variant: "destructive",
      className: "bg-red-500 text-white border-none",
      duration: 3000,
    });
  };

  // Group videos by search query
  const videosByQuery = savedVideos.reduce((acc, video) => {
    if (!acc[video.search_query]) {
      acc[video.search_query] = [];
    }
    acc[video.search_query].push(video);
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="container mx-auto mt-20 px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Selected Videos</h2>
        <Skeleton className="h-48 w-full mb-4" />
        <Skeleton className="h-48 w-full mb-4" />
        <Skeleton className="h-48 w-full mb-4" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Selected Videos</h2>
      {Object.entries(videosByQuery).length === 0 ? (
        <p>No videos have been added to your course yet.</p>
      ) : (
        Object.entries(videosByQuery).map(([query, queryVideos]) => (
          <div key={query} className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-green-400">{query}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {queryVideos.map((video) => (
                <Card key={video.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{video.title}</CardTitle>
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
        ))
      )}
    </div>
  );
};

export default SelectedVideo;