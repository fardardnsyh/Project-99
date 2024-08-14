import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Landing, Error, ProtectedRoute } from './pages'
import { AddJob, AllJobs, Profile, SharedLayout, Stats } from './pages/dasboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Stats />}></Route>
          <Route path='Profile' element={<Profile />}></Route>
          <Route path='AllJobs' element={<AllJobs />}></Route>
          <Route path='AddJob' element={<AddJob />}></Route>
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
