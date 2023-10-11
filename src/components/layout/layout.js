import React, { useRef, useState } from "react";
import { Menubar } from "primereact/menubar";
import Router, { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faRightFromBracket, faShip, faTruckArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import Link from "next/link";

export function RootLayout({ children }) {
  const [user, setUser] = useState({
    name: "Abdeltif",
    username: "Admin",
  });
  const menu = useRef(null);

  const router = useRouter();

  const items = [
    {
      label: "Accueil",
      icon: <FontAwesomeIcon icon={faHome} className="mr-2" />,
      className: router.route === "/" ? "p-menuitem-active" : "",
      command: (event) => router.push("/"),
    },
    {
      label: "Fluidification des flux camions",
      icon: <FontAwesomeIcon icon={faTruckArrowRight} className="mr-2" />,
      className: router.route.startsWith("/deployment") ? "p-menuitem-active" : "",
      command: (event) => router.push("/deployment"),
    },
    {
      label: "réduction du délai d'attente des navires en rade",
      icon: <FontAwesomeIcon icon={faShip} className="mr-2" />,
      className: router.route.startsWith("/vessel") ? "p-menuitem-active" : "",
      command: (event) => router.push("/vessel"),
    },
  ];

  const userItems = [
    {
      label: (
        <>
          <span className="font-bold">{user?.name}</span>
          <span className="text-xs"> ({user?.username})</span>
        </>
      ),
      className: "justify-content-between",
    },
    {
      label: <span className="text-red-700">Déconnexion</span>,
      icon: <FontAwesomeIcon icon={faRightFromBracket} className="text-red-700 mr-2" />,
      className: "bg-red-50",
      command: (event) => Router.push("/auth/login"),
    },
  ];

  const start = (
    <div className={"ml-3 mr-6 flex z-40 text-xl font-bold text-gray-900"}>
      <span>SyncUI</span>
      <span className="text-blue-600">/&gt;</span>
    </div>
  );

  const end = (
    <>
      <Menu model={userItems} popup ref={menu} id="user_menu" />
      <Button
        icon={<FontAwesomeIcon icon={faUser} />}
        onClick={(event) => menu.current.toggle(event)}
        aria-controls="user_menu"
        aria-haspopup
        className="p-button-sm p-button-outlined p-button-primary"
      />
    </>
  );

  return (
    <div>
      <Menubar model={items} start={start} end={end} className="surface-0" />
      {children}
    </div>
  );
}
