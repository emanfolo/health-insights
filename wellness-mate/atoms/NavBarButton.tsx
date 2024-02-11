import { GithubIcon } from "../icons";
import { NavbarButtonProps } from "../interfaces";

export const NavBarButton = ({
  loggedIn,
  displayName,
  photoUrl,
  onLogin,
  onLogout,
}: NavbarButtonProps) => {
  return (
    <div className="navbar-end mt-3">
      {loggedIn ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {photoUrl ? (
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={photoUrl} />
              </div>
            ) : (
              <span className=" w-10 h-10 bg-gray-200 text-black rounded-full text-xs flex items-center justify-center">
                {displayName?.at(0)}
              </span>
            )}
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
          >
            <li className="menu-title">Options</li>

            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <button onClick={onLogin} className="btn-circle btn md:hidden">
            <GithubIcon />
          </button>
          <button onClick={onLogin} className="btn hidden  md:flex">
            <GithubIcon />

            <text className="">Sign In With Github</text>
          </button>
        </>
      )}
    </div>
  );
};
