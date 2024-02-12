import Link from "next/link";
import { NavBarButton } from "../atoms";
import { useAuth } from "../contexts/AuthContext";
import { deleteAccount, handleLogin, handleLogout } from "../utils/auth";

export const NavBar = () => {
  const { user, loggedIn } = useAuth();
  return (
    <div className="navbar bg-base-100 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  bg-base-200 rounded-box w-52"
          >
            <li className="menu-title">Navigation</li>
            <li>
              <Link className="text-black hover:no-underline" href="/example">
                Example Mealplan
              </Link>
            </li>

            <li>
              <Link
                className="text-black hover:text-blue-700 hover:no-underline"
                href="/create"
              >
                Generate Mealplan
              </Link>
            </li>

            <li>
              <Link
                className="text-black hover:text-blue-700 hover:no-underline"
                href="/explore"
              >
                Explore Recipes
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          WellnessMate.
        </Link>
      </div>

      <NavBarButton
        displayName={user?.displayName || null}
        photoUrl={user?.photoURL || null}
        loggedIn={loggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onDeleteAccount={deleteAccount}
      />
    </div>
  );
};
