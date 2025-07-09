import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import ProtectedRoute from "./pages/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";

const Login = lazy(() => import("./pages/Login"));
const Interstitial = lazy(() => import("./pages/Interstitial"));
const Landing = lazy(() => import("./pages/Landing"));
const PrayerNow = lazy(() => import("./pages/PrayerNow"));
const Settings = lazy(() => import("./pages/Settings"));
const ClockDemo = lazy(() => import("./pages/ClockDemo"));
const InfoDemo = lazy(() => import("./pages/InfoDemo"));

const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
	return (
		<ErrorBoundary>
			{import.meta.env.MODE !== "production" && (
				<div className="fixed top-0 right-0 bg-yellow-500 text-black px-2 py-1 text-xs font-mono z-50">
					{import.meta.env.MODE}
				</div>
			)}
			<BrowserRouter>
				<Routes>
					<Route
						index
						element={
							<Suspense fallback={<LoadingSpinner />}>
								<Login />
							</Suspense>
						}
					/>
					<Route
						path="/interstitial/:mosqueId"
						element={
							<Suspense fallback={<LoadingSpinner />}>
								<Interstitial />
							</Suspense>
						}
					/>
					<Route
						path="/landing/:mosqueId"
						element={
							<Suspense fallback={<LoadingSpinner />}>
								<Landing />
							</Suspense>
						}
					/>
					<Route
						path="/prayernow/:mosqueId"
						element={
							<Suspense fallback={<LoadingSpinner />}>
								<PrayerNow />
							</Suspense>
						}
					/>
					<Route
						path="/settings/:mosqueId"
						element={
							<Suspense fallback={<LoadingSpinner />}>
								<ProtectedRoute>
									<Settings />
								</ProtectedRoute>
							</Suspense>
						}
					/>
					{import.meta.env.MODE !== "production" && (
						<>
							<Route
								path="/clock-demo"
								element={
									<Suspense fallback={<LoadingSpinner />}>
										<ProtectedRoute>
											<ClockDemo />
										</ProtectedRoute>
									</Suspense>
								}
							/>
							<Route
								path="/info-demo"
								element={
									<Suspense fallback={<LoadingSpinner />}>
										<ProtectedRoute>
											<InfoDemo />
										</ProtectedRoute>
									</Suspense>
								}
							/>
						</>
					)}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
