import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from './pages/loginpage/loginpage';
import { SignUpPage } from './pages/loginpage/signuppage';
import { ArtworkGallery } from './pages/artworkspage/artworkspage';
import { ArtworksHome } from './components/artworks-components/artworkshome';
import { NewPost } from './components/artworks-components/newpost';
import { EditPost } from './components/artworks-components/editpost';
import { PublishPost } from './components/artworks-components/publishpost';
import { AuthProvider } from './context/auth-provider';
import RequireAuth from './components/authentication/require-auth';
import { AllPosts } from './components/artworks-components/allposts';
import { SinglePost } from './components/artworks-components/singlepost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} ></Route>
            <Route path="/signup" element={<SignUpPage />} ></Route>

            <Route element={<RequireAuth allowedRoles={"0001"} />}>
              <Route path="/wizardgram" element={<ArtworkGallery />} >
                <Route path='' element={<ArtworksHome />} />
                <Route path='newpost' element={<NewPost />} />
                <Route path='editpost' element={<EditPost />} />
                <Route path='createpost' element={<PublishPost />} />
                <Route path='allposts' element={<AllPosts />} />
                <Route path='posts/:id' element={<SinglePost />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


