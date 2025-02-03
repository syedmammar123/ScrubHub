import React, { useState } from "react";

const useChallengeFriend = () => {
  const [loading, setLoading] = useState(false);

  const challengeFriend = async () => {
    setLoading(true);
    try {
      console.log("Friend challenged!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { challengeFriend, loading };
};

export default useChallengeFriend;
