import { useEffect, useState } from "react";
import { app } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LogoutPage from "./components/LogoutPage/LogoutPage";
import MainPage from "./components/MainPage/MainPage";

function App() {
  const auth = getAuth()
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])

  if (user === null) {
    return (
      <LogoutPage />
    )
  }

  return (
    <MainPage />
  )
}

export default App
