export const searchVideos = async (messageText: string) => {
  return fetch('http://localhost:8000/search-videos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: messageText }),
  });
}
