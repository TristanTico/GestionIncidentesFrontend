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
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  logOutOutline,
  logOutSharp,
} from "ionicons/icons";
import "./Menu.css";
import { useAuth } from "../context/authContext";

interface AppPage {
  url?: string; // url is optional to allow for logout action
  iosIcon: string;
  mdIcon: string;
  title: string;
  action?: () => void; // action is optional to allow for logout action
  children?: AppPage[]; // allow for nested pages
}

const Menu: React.FC = () => {
  const location = useLocation();
  const { correo, logout, isAuthenticated } = useAuth(); // Get the logout function from useAuth

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
      children: [
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
      ],
    },
    {
      title: "Cerrar Sesión",
      iosIcon: logOutOutline,
      mdIcon: logOutSharp,
      action: logout, // Use the logout action
    },
  ];

  return isAuthenticated ? (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
          <img src="/sgi2.png" alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
            SGI</IonListHeader>
          <IonNote>{correo}</IonNote>
          {appPages.map((appPage, index) => {
            if (appPage.children) {
              return (
                <IonAccordionGroup key={index}>
                  <IonAccordion value={appPage.title}>
                    <IonItem slot="header">
                      <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                    <div slot="content">
                      {appPage.children.map((childPage, childIndex) => (
                        <IonMenuToggle key={childIndex} autoHide={false}>
                          <IonItem
                            className={`sub-item ${location.pathname === childPage.url ? "selected" : ""}`}
                            routerLink={childPage.url}
                            routerDirection="none"
                            lines="none"
                            detail={false}
                            style={{ paddingLeft: "20px" }} // Indent the sub-items
                          >
                            <IonIcon aria-hidden="true" slot="start" ios={childPage.iosIcon} md={childPage.mdIcon} />
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
                    className={location.pathname === appPage.url ? "selected" : ""}
                    routerLink={appPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            } else if (appPage.action) {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className="" onClick={appPage.action} lines="none" detail={false}>
                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            } else {
              return null;
            }
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  ) : null;
};

export default Menu;
