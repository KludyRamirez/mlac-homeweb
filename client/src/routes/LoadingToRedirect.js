import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && history.push("/login");
    // cleanup
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container p-5 text-center d-flex flex-column justify-content-center">
      <h4 className="fw-bold">Redirecting you in {count} seconds</h4>
      <br></br>
      <div className="d-flex justify-content-center">
        <PuffLoader color="#f5b301" size={400} />
      </div>
    </div>
  );
};

export default LoadingToRedirect;
