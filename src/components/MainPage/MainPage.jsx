import Button from '../CommonComponents/Button'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth()

const MainPage = () => {
  return (
    <>
    <div className='dark:text-white'>MainPage</div>
    <Button className='dark:text-white' onClick={() => signOut(auth)}>Logout</Button>
    </>
  )
}

export default MainPage