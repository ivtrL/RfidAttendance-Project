import { Fragment, useContext, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { BiBell } from "react-icons/bi";
import { GrMenu } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Button from "@mui/material/Button";

import { AuthContext } from "../Auth/Auth";
import { NavbarProps } from "../types";

const Navbar = ({ Route }: NavbarProps) => {
  const navigation = ["Início", "Históricos", "Dispositivos", "Usuários"];
  const profile = ["Your Profile", "Settings"];
  const refs = ["/home", "/logs", "/devices", "/users"];
  const activeRoute = handleRoute();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const { SignOut } = useContext(AuthContext);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  async function handleSignOut() {
    if (typeof SignOut === "function") {
      SignOut();
    }
  }

  function handleRoute() {
    switch (Route) {
      case "home":
        return 0;
      case "logs":
        return 1;
      case "devices":
        return 2;
      case "users":
        return 3;
    }
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item, itemIdx) =>
                  itemIdx === activeRoute ? (
                    <Fragment key={item}>
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <a
                        href={refs[itemIdx]}
                        className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {item}
                      </a>
                    </Fragment>
                  ) : (
                    <a
                      key={item}
                      href={refs[itemIdx]}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <BiBell className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Button onClick={handleClick}>
                <Menu
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  className="ml-3 relative"
                >
                  <div>
                    <Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://github.com/ivtrl.png"
                        alt=""
                      />
                    </Button>
                  </div>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuList className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {profile.map((item) => (
                        <MenuItem key={item}>
                          <a
                            href="#"
                            className={classNames(
                              open ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {item}
                          </a>
                        </MenuItem>
                      ))}
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700"
                          onClick={handleSignOut}
                        >
                          Sign out
                        </a>
                      </MenuItem>
                    </MenuList>
                  </Transition>
                </Menu>
              </Button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              {open ? (
                <AiOutlineClose className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <GrMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Disclosure.Button>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigation.map((item, itemIdx) =>
            itemIdx === 0 ? (
              <Fragment key={item}>
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <a
                  href="#"
                  className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item}
                </a>
              </Fragment>
            ) : (
              <a
                key={item}
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {item}
              </a>
            )
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://github.com/ivtrl.png"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                Isaac Vitorino
              </div>
              <div className="text-sm font-medium leading-none text-gray-400">
                isaacvitorinola@gmail.com
              </div>
            </div>
            <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              <BiBell className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-3 px-2 space-y-1">
            {profile.map((item) => (
              <a
                key={item}
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                {item}
              </a>
            ))}
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Sign out
            </a>
          </div>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
};

export default Navbar;
