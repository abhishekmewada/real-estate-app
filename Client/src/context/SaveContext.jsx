

export const SaveContext = createContext();

export const SaveContextProvider = ({ children }) => {
  const [savedPosts, setSavedPosts] = useState([]);
    const addSavedPost = (post) => {
    setSavedPosts((prevPosts) => [...prevPosts, post]);
  };

  const removeSavedPost = (postId) => {
    setSavedPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== postId)
    );
  };    
}