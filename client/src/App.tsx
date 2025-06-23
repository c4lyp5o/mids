import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

import ProtectedRoute from './pages/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

const Login = React.lazy(() => import('./pages/Login'));
const Interstitial = React.lazy(() => import('./pages/Interstitial'));
const Landing = React.lazy(() => import('./pages/Landing'));
const PrayerNow = React.lazy(() => import('./pages/PrayerNow'));
const Settings = React.lazy(() => import('./pages/Settings'));

const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ErrorBoundary>
      {import.meta.env.MODE !== 'production' && (
        <div className='fixed top-0 right-0 bg-yellow-500 text-black px-2 py-1 text-xs font-mono z-50'>
          {import.meta.env.MODE}
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <React.Suspense fallback={<LoadingSpinner />}>
                <Login />
              </React.Suspense>
            }
          />
          <Route
            path='/interstitial/:mosqueId'
            element={
              <React.Suspense fallback={<LoadingSpinner />}>
                <Interstitial />
              </React.Suspense>
            }
          />
          <Route
            path='/landing/:mosqueId'
            element={
              <React.Suspense fallback={<LoadingSpinner />}>
                <Landing />
              </React.Suspense>
            }
          />
          <Route
            path='/prayernow/:mosqueId'
            element={
              <React.Suspense fallback={<LoadingSpinner />}>
                <PrayerNow />
              </React.Suspense>
            }
          />
          <Route
            path='/settings/:mosqueId'
            element={
              <React.Suspense fallback={<LoadingSpinner />}>
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
