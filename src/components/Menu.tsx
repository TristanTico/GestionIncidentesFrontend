import React, { useState } from "react";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonAccordion,
  IonAccordionGroup,
  IonToast,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  mailOutline,
  mailSharp,
  logOutOutline,
  logOutSharp,
} from "ionicons/icons";
import "./Menu.css";
import { useAuth } from "../context/authContext";
import ListaRoles from "./ListaRoles";

interface AppPage {
  url?: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  action?: () => void;
  children?: AppPage[];
}

const Menu: React.FC = () => {
  const location = useLocation();
  const { logout, isAuthenticated, getTokenPayload } = useAuth();
  const [mostrarToast, setMostrarToast] = useState(false);
  const [mensajeToast, setMensajeToast] = useState("");

  const datos = getTokenPayload() || { roles: [] };

  const appPages: AppPage[] = [
    {
      title: "Home",
      url: "/home",
      iosIcon: mailOutline,
      mdIcon: mailSharp,
    },
    {
      title: "Usuario",
      iosIcon: mailOutline,
      mdIcon: mailSharp,
      children: datos.roles.includes("Usuario")
        ? [
            {
              title: "Crear Incidencia",
              url: "/crearIncidencia",
              iosIcon: mailOutline,
              mdIcon: mailSharp,
            },
            {
              title: "Listado de incidencias",
              url: "/listadoIncidencias",
              iosIcon: mailOutline,
              mdIcon: mailSharp,
            },
          ]
        : [],
    },
    {
      title: "Encargado",
      iosIcon: mailOutline,
      mdIcon: mailSharp,
      children: datos.roles.includes("Encargado")
        ? [
            {
              title: "Listar Encargado",
              url: "/listarEncargado",
              iosIcon: mailOutline,
              mdIcon: mailSharp,
            },
          ]
        : [],
    },
    {
      title: "Tecnico",
      iosIcon: mailOutline,
      mdIcon: mailSharp,
      children: datos.roles.includes("Tecnico")
        ? [
            {
              title: "Listar Técnicos",
              url: "/listarTecnico",
              iosIcon: mailOutline,
              mdIcon: mailSharp,
            },
          ]
        : [],
    },
    {
      title: "Cerrar Sesión",
      iosIcon: logOutOutline,
      mdIcon: logOutSharp,
      action: logout,
    },
  ];

  const handleUsuarioClick = (role: string) => {
    if (!datos.roles.includes(role)) {
      setMensajeToast(`No tienes el rol de ${role} para ingresar.`);
      setMostrarToast(true);
    }
  };

  return isAuthenticated ? (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <img
              src="/sgi2.png"
              alt="Logo"
              style={{ width: "40px", marginRight: "10px" }}
            />
            SGI
          </IonListHeader>
          <IonNote>{datos.correo}</IonNote>
          <ListaRoles roles={datos.roles} />
          {appPages.map((appPage, index) => {
            if (appPage.children) {
              return (
                <IonAccordionGroup key={index}>
                  <IonAccordion value={appPage.title}>
                    <IonItem slot="header" onClick={() => handleUsuarioClick(appPage.title)}>
                      <IonIcon
                        aria-hidden="true"
                        slot="start"
                        ios={appPage.iosIcon}
                        md={appPage.mdIcon}
                      />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                    <div slot="content">
                      {appPage.children.map((childPage, childIndex) => (
                        <IonMenuToggle key={childIndex} autoHide={false}>
                          <IonItem
                            className={`sub-item ${
                              location.pathname === childPage.url
                                ? "selected"
                                : ""
                            }`}
                            routerLink={childPage.url}
                            routerDirection="none"
                            lines="none"
                            detail={false}
                            style={{ paddingLeft: "20px" }} // Indent the sub-items
                          >
                            <IonIcon
                              aria-hidden="true"
                              slot="start"
                              ios={childPage.iosIcon}
                              md={childPage.mdIcon}
                            />
                            <IonLabel>{childPage.title}</IonLabel>
                          </IonItem>
                        </IonMenuToggle>
                      ))}
                    </div>
                  </IonAccordion>
                </IonAccordionGroup>
              );
            } else if (appPage.url) {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={
                      location.pathname === appPage.url ? "selected" : ""
                    }
                    routerLink={appPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <IonIcon
                      aria-hidden="true"
                      slot="start"
                      ios={appPage.iosIcon}
                      md={appPage.mdIcon}
                    />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            } else if (appPage.action) {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className=""
                    onClick={appPage.action}
                    lines="none"
                    detail={false}
                  >
                    <IonIcon
                      aria-hidden="true"
                      slot="start"
                      ios={appPage.iosIcon}
                      md={appPage.mdIcon}
                    />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            } else {
              return null;
            }
          })}
        </IonList>
        <IonToast
          isOpen={mostrarToast}
          onDidDismiss={() => setMostrarToast(false)}
          message={mensajeToast}
          duration={3000}
        />
      </IonContent>
    </IonMenu>
  ) : null;
};

export default Menu;
