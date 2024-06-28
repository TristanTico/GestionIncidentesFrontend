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

import { useLocation, useHistory } from "react-router-dom";
import {
  mailOutline,
  mailSharp,
  logOutOutline,
  logOutSharp,
  createOutline,
  createSharp,
  homeOutline,
  homeSharp,
  personAddOutline,
  personAddSharp,
  listCircleOutline,
  listCircleSharp,
  hammerOutline,
  hammerSharp,
  analyticsOutline,
  analyticsSharp
} from "ionicons/icons";
import "./Menu.css";
import { useAuth } from "../context/authContext";
import ListaRoles from "./ListaRoles";
import logoSGI from "../assets/sgi2.png";

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
  //const history = useHistory();
  const { logout, isAuthenticated, getTokenPayload, logout2 } = useAuth();
  const [mostrarToast, setMostrarToast] = useState(false);
  const [mensajeToast, setMensajeToast] = useState("");

  const datos = getTokenPayload() || { roles: [] };

  const appPages: AppPage[] = [
    {
      title: "Home",
      url: "/home",
      iosIcon: homeOutline,
      mdIcon: homeSharp,
    },
    {
      title: "Usuario",
      iosIcon: personAddOutline,
      mdIcon: personAddSharp,
      children: datos.roles.includes("Usuario")
        ? [
            {
              title: "Crear Incidencia",
              url: "/crearIncidencia",
              iosIcon: createOutline,
              mdIcon: createSharp,
            },
            {
              title: "Listado de incidencias",
              url: "/listadoIncidencias",
              iosIcon: listCircleOutline,
              mdIcon: listCircleSharp,
            },
          ]
        : [],
    },
    {
      title: "Encargado",
      iosIcon: personAddOutline,
      mdIcon: personAddSharp,
      children: datos.roles.includes("Encargado")
        ? [
            {
              title: "Listar Incidencias Registradas",
              url: "/listarEncargado",
              iosIcon: listCircleOutline,
              mdIcon: listCircleSharp,
            },
            {
              title: "Cargas de Trabajo",
              url: "/cargasTrabajo",
              iosIcon: analyticsOutline,
              mdIcon: analyticsSharp,
            },
          ]
        : [],
    },
    {
      title: "Tecnico",
      iosIcon: personAddOutline,
      mdIcon: personAddSharp,
      children: datos.roles.includes("Tecnico")
        ? [
            {
              title: "Listar Incidencias Asignadas",
              url: "/listarTecnico",
              iosIcon: listCircleOutline,
              mdIcon: listCircleSharp,
            },
            {
              title: "Listado Diagnosticos",
              url: "/listadoDiagnosticos",
              iosIcon: listCircleOutline,
              mdIcon: listCircleSharp,
            },
          ]
        : [],
    },
    {
      title: "Supervisor",
      iosIcon: personAddOutline,
      mdIcon: personAddSharp,
      children: datos.roles.includes("Supervisor")
        ? [
            {
              title: "Listar Incidencias Terminadas",
              url: "/listadoSupervisor",
              iosIcon: listCircleOutline,
              mdIcon: listCircleSharp,
            },
          ]
        : [],
    },
    {
      title: "Cerrar Sesión",
      iosIcon: logOutOutline,
      mdIcon: logOutSharp,
      action: logout2,
    },
  ];

  const handleUsuarioClick = (role: string) => {
    if (!datos.roles.includes(role)) {
      setMensajeToast(`No tienes el rol de ${role} para ingresar.`);
      setMostrarToast(true);
    }
  };

  return isAuthenticated ? (
    <IonMenu contentId="main" type="overlay" >
      <IonContent >
        <IonList id="inbox-list" >
          <IonListHeader>
            <img
              src={logoSGI}
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
                    <IonItem
                      slot="header"
                      onClick={() => handleUsuarioClick(appPage.title)}
                    >
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
          duration={7000}
          color="warning"
        />
      </IonContent>
    </IonMenu>
  ) : null;
};

export default Menu;
