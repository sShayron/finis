import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { SessionVaultProvider } from "./providers/SessionVaultProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { PrivateRoute } from "./components/PrivateRoute";

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
import "./theme/global.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <SessionVaultProvider>
      <AuthProvider>
        <IonReactRouter>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/registrar">
            <Register />
          </Route>
          <Route exact path="/">
            <Redirect to="/in/tab1" />
          </Route>
          <Route path="/in">
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/in/tab1">
                  <PrivateRoute>
                    <Tab1 />
                  </PrivateRoute>
                </Route>
                <Route exact path="/in/tab2">
                  <PrivateRoute>
                    <Tab2 />
                  </PrivateRoute>
                </Route>
                <Route path="/in/tab3">
                  <Tab3 />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/in/tab1">
                  <IonIcon aria-hidden="true" icon={triangle} />
                  <IonLabel>Tab 1</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/in/tab2">
                  <IonIcon aria-hidden="true" icon={ellipse} />
                  <IonLabel>Tab 2</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/in/tab3">
                  <IonIcon aria-hidden="true" icon={square} />
                  <IonLabel>Tab 3</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </Route>
        </IonReactRouter>
      </AuthProvider>
    </SessionVaultProvider>
  </IonApp>
);

export default App;
