import {IWake_Abstract, IsDevFocused, ShowMessageBox} from '@denjpeters/intelliwakereact';
import {IUserState} from "./Stores/user/types";
import {Session_Login, Session_Logout} from "./Stores/user/actions";
import deepEqual from "deep-equal";
import {Dispatch} from "redux";
import * as serviceWorker from './serviceWorker';
import {UpdateSystem} from "./Stores/system/actions";
import store from "./Stores/store";
import {AppSettingsAllUpdated} from "./Stores/appsettings/actions";

export class IWake extends IWake_Abstract {
    user: IUserState | null;
    dispatch: Dispatch;
    ignoreReload: boolean;

    constructor(user: IUserState | null, dispatch: Dispatch, ignoreReload: boolean = false) {
        super();

        this.user = user;
        this.dispatch = dispatch;
        this.ignoreReload = ignoreReload;
    }

    ReloadApp(): boolean {
        console.log('Do refresh...');
        if (!this.ignoreReload) {
            serviceWorker.unregister();
            window.location.reload();
            return true;
        } else {
            return false;
        }
    }

    IsDevFocused(): boolean {
        return IsDevFocused();
    }

    ShowMessageBox(message: string, color?: string, messageBody?: string | null, autoDismiss?: boolean): void {
        ShowMessageBox(message, color, messageBody, autoDismiss)(this.dispatch);
    }

    APIAmendHeaderAuthorization(headersAuthorization: any): void {
        let settings = {...store.getState().appSettings};
        if (settings.shouldSave) {
            delete settings.shouldSave;

            // console.log('Saving Settings');

            headersAuthorization.Settings = settings;
        }
    }

    // noinspection JSUnusedLocalSymbols
    APIReceiveUser(receivedUser: any, resetSelections: boolean): void {
        if (!!receivedUser && receivedUser.length !== 0) {
            const settings = {...receivedUser.Settings};

            delete receivedUser.Settings;

            const newUser: IUserState = {
                ...receivedUser,
                loggedIn: true,
                Features: (receivedUser.features ?? "").split(',')
            };

            if (newUser.ID) {
                if (!this.user) {
                    // console.log('Adding User');

                    Session_Login(newUser)(this.dispatch);
                    setTimeout(() => {
                        window.sessionStorage.removeItem('referrer');
                    }, 2000);
                } else {
                    if (!deepEqual(this.user, newUser)) {
                        // console.log('Updating User', currentUser, newUser);

                        Session_Login(newUser)(this.dispatch);
                        setTimeout(() => {
                            window.sessionStorage.removeItem('referrer');
                        }, 2000);
                    }
                }

                settings.shouldSave = false;

                if (!deepEqual(settings, store.getState().appSettings)) {
                    // console.log('Updating Settings');
                    AppSettingsAllUpdated(settings)(this.dispatch);
                }
            }
        }
    }

    APIFailedAuthentication(): void {
        window.sessionStorage.setItem('referrer', window.location.pathname);
        console.log("Failed Authentication");
        Session_Logout()(this.dispatch);
    }

    APIUpdateSystem(systemData: any): void {
        UpdateSystem(systemData.app_version,
            systemData.html_version,
            systemData.db_version,
            systemData.environment,
            systemData.environment_name)(this.dispatch);
    }
}
