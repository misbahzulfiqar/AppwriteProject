import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

// export default function Protected({children, authentication = true}) {

//     const navigate = useNavigate()
//     const [loader] = useState(false)
//     const authStatus = useSelector(state => state.auth.status)
    

// useEffect(() => {
//     if(authStatus === undefined) return

//     if(authentication && !authStatus) {
//         navigate("/login")
//     }

//     if(!authentication && authStatus) {
//         navigate("/")
//     }
// }, [authStatus, authentication, navigate])

//   return loader ? <h1>Loading...</h1> : <>{children}</>
// }
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus === undefined) return;  // wait until Redux loads

    // Only redirect if the user is actually logged out or logged in
    if (authentication && authStatus === false) {
      navigate("/login");
    }

    if (!authentication && authStatus === true) {
      navigate("/");
    }
  }, [authStatus, authentication, navigate]);

  return <>{children}</>;
}