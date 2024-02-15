import { useState } from "react";
import { GithubIcon } from "../icons";
import { NavbarButtonProps } from "../interfaces";
import Link from "next/link";

export const NavBarButton = ({
  loggedIn,
  displayName,
  photoUrl,
  onLogin,
  onLogout,
  onDeleteAccount,
}: NavbarButtonProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
              <Link
                className="text-black hover:no-underline"
                href="/profile/recipes"
              >
                Saved Recipes
              </Link>
            </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
            <li>
              <button onClick={() => setShowDeleteModal(true)}>
                Delete Account
              </button>
            </li>
          </ul>
          {showDeleteModal && (
            <dialog className="modal opacity-100 modal-open">
              <div className="modal-box">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => setShowDeleteModal(false)}
                >
                  ✕
                </button>
                <h3 className="font-bold text-lg">Delete account</h3>
                <p className="py-5">
                  Are you sure you want to unlink your Github account?
                </p>
                <button
                  onClick={() => {
                    onDeleteAccount();
                    setShowDeleteModal(false);
                  }}
                  className="btn"
                >
                  Delete account
                </button>
              </div>
            </dialog>
          )}
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
