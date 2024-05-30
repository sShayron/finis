import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Home } from "./pages/Home";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Metas } from "./pages/Metas";
import { Despesas } from "./pages/Despesas";
import { NovaDespesa } from "./pages/Despesas/AddDespesa";
import { EdtDespesa } from "./pages/Despesas/EdtDespesa";

import {
  AuthProvider,
  ClientProvider,
  SessionVaultProvider,
  ToastProvider,
} from "./providers";
import { BottomTabs, PrivateRoute } from "./components";

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

/* Ionic Dark Mode */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/global.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <ToastProvider>
      <SessionVaultProvider>
        <AuthProvider>
          <ClientProvider>
            <IonReactRouter>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/registrar">
                <Register />
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/in">
                <div>
                  <IonRouterOutlet>
                    <Route exact path="/in/home">
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    </Route>
                    <Route exact path="/in/metas">
                      <Metas />
                    </Route>
                    <Route exact path="/in/despesas">
                      <Despesas />
                    </Route>
                    <Route exact path="/in/novadespesa">
                      <NovaDespesa />
                    </Route>
                    <Route exact path="/in/edtdespesa">
                      <EdtDespesa />
                    </Route>
                    <Route exact path="/in/tab2">
                      <PrivateRoute>
                        <Tab2 />
                      </PrivateRoute>
                    </Route>
                    <Route exact path="/in/tab3">
                      <PrivateRoute>
                        <Tab3 />
                      </PrivateRoute>
                    </Route>
                  </IonRouterOutlet>
                  <BottomTabs />
                </div>
              </Route>
            </IonReactRouter>
          </ClientProvider>
        </AuthProvider>
      </SessionVaultProvider>
    </ToastProvider>
  </IonApp>
);

export default App;
