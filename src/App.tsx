import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
//import RutasProtegidas from "./RutasProtegidas";

import { ProtectedRoute } from "./routes";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import { AuthProvider } from "./context/authContext";
//import Login from "./pages/Login";
import LoginComponent from "./components/LoginComponent";
import Prueba1 from "./pages/Prueba1";
import Prueba2 from "./pages/Prueba2";
import Menu from "./components/Menu";
import { SgiProvider } from "./context/sgiContext";
import ListadoIncidencias from "./components/ListadoIncidencias";
import CrearIncidencia from "./components/incidencias/CrearIncidencia";
import ListadoIncidenciasRegistradas from "./components/ListadoIncidenciasRegistradas";
import ListadoIncidenciasAsignadas from "./components/ListadoIncidenciasAsignadas";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <SgiProvider>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Switch>
                  <Route path="/login" component={LoginComponent} />
                  <ProtectedRoute path="/home" component={Home} />
                  <ProtectedRoute
                    path="/listadoIncidencias"
                    component={ListadoIncidencias}
                  />
                  <ProtectedRoute path="/listarTecnico" component={ListadoIncidenciasAsignadas} />
                  <ProtectedRoute path="/listarEncargado" component={ListadoIncidenciasRegistradas} />
                  <ProtectedRoute path="/crearIncidencia" component={CrearIncidencia} />
                </Switch>
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </SgiProvider>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
