import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useMemo, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { showErrorToast } from "../utils/toastUtils";

import Login from "./Pages/Login";
import LandingPage from "./Pages/LandingPage";
import Events from "./Pages/Events";
import MemberManagement from "./Pages/MemberManagement";
import Teams from "./Pages/Teams";
import ProfilePage from "./Pages/ProfilePage";
import Navbar from "./Components/Navbar";
import AdminContentManagement from "./Components/AdminContentManagement";
import { useSession } from "./lib/auth-client";
import AdminDashboard from "./Pages/AdminDashboard";
import TeamManagement from "./Pages/TeamManagement";
import EventManagement from "./Pages/EventManagement";
import PropTypes from "prop-types";

// ------------------------
// Route Guards
// ------------------------

// While session is being fetched, show a loader
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="shadow-lg p-8 sm:p-12 w-full max-w-md">
        <p className="text-center text-white">Calling Genie ;)</p>
      </div>
    </div>
  );
}

// Protect private routes: if an error occurs or no session, redirect to /login
function PrivateRoute({ children }) {
  const { isPending, error, data: session } = useSession();
  const location = useLocation();

  if (isPending) {
    return <LoadingScreen />;
  }

  if (error || !session) {
    // Show error toast if there's an error
    if (error) {
      showErrorToast("Session expired or not found. Please log in.");
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Protect admin routes: requires both authentication and admin privileges
function AdminRoute({ children }) {
  const { isPending, error, data: session } = useSession();
  const location = useLocation();

  if (isPending) {
    return <LoadingScreen />;
  }

  if (error || !session) {
    // Show error toast if there's an error
    if (error) {
      showErrorToast("Session expired or not found. Please log in.");
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!session.user.isAdmin) {
    showErrorToast("Access denied. Admin privileges required.");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { data: session } = useSession();

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

PublicRoute.propTypes = {
  children: PropTypes.node,
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

// Separate component for the app content that needs access to useLocation
function AppContent() {
  const location = useLocation();

  // List of paths where Navbar should be hidden
  const hiddenNavbarPaths = useMemo(() => ["/login", "/register"], []);

  // Only show Navbar when user is signed in AND not on a hidden path
  const shouldShowNavbar = useMemo(() => {
    return !hiddenNavbarPaths.includes(location.pathname);
  }, [location.pathname, hiddenNavbarPaths]);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Teams />} />
          
          {/* Profile page - only requires authentication, not admin */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          
          {/* Admin-only routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/content"
            element={
              <AdminRoute>
                <AdminContentManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/team-management"
            element={
              <AdminRoute>
                <TeamManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/event-management"
            element={
              <AdminRoute>
                <EventManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/member-management"
            element={
              <AdminRoute>
                <MemberManagement />
              </AdminRoute>
            }
          />
          
          {/* <Route path="/event/:id" element={<EventPage />} /> */}
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen max-w-screen">
      <Router>
        <AppContent />
      </Router>

      {/* Global toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1.2rem",
            fontFamily: "Times New Roman, serif",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            borderRadius: "0px",
          },
        }}
      />
    </div>
  );
}

export default App;