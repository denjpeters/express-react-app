import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
import {Environments, IsDevFocused} from '@denjpeters/intelliwakereact';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "./Stores/rootReducer";
import {HasFeature, TCSFeature} from "./Data/Feature";
import {APIProcess, ShowActivityOverlay, ShowMessageBox, HideActivityOverlay} from '@denjpeters/intelliwakereact';
import axios, {CancelTokenSource} from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt} from "@fortawesome/pro-regular-svg-icons";
import {IWake} from "./IWake";

interface IUsers {
    ID: number,
    Name: string,
    IsVendor: number
}

const Footer = () => {
    const dispatch = useDispatch();
    const isMounted = useRef(true);
    const {user, messageFooter} = useSelector((state: AppState) => state);
    const [users, setUsers] = useState([] as IUsers[]);

    const iWake = useMemo(() => new IWake(user, dispatch), [user, dispatch]);

    const impersonate = async (id: number) => {
        ShowActivityOverlay()(dispatch);
        window.sessionStorage.setItem("device_token_for", id.toString());
        APIProcess('User', 'Impersonate', {UserID: id})(iWake)
            .then(() => {
                ShowMessageBox('Impersonated')(dispatch);
            })
            .catch(() => {
                window.sessionStorage.removeItem("device_token_for");
            })
            .finally(() => {
                HideActivityOverlay()(dispatch);
            });
    };

    const deImpersonate = async () => {
        ShowActivityOverlay()(dispatch);
        APIProcess('User', 'DeImpersonate')(iWake)
            .then(() => {
                ShowMessageBox('De-Impersonated')(dispatch);
            })
            .catch()
            .finally(() => {
                HideActivityOverlay()(dispatch);
            });
    };

    useEffect(() => {
        if (user.loggedIn && ((HasFeature(user, TCSFeature.UserAdmin) || window.sessionStorage.getItem('device_token_for') !== undefined || IsDevFocused()))) {
            let cancelTokenSource: CancelTokenSource | null = axios.CancelToken.source();
            isMounted.current = true;

            APIProcess('User', 'GetToImpersonate', {}, cancelTokenSource)(iWake)
                .then((results) => {
                    if (isMounted.current && cancelTokenSource) {
                        setUsers((results.Users as IUsers[]).sort(function (a, b) {
                            return (a.Name ?? "").localeCompare(b.Name ?? "", undefined, {sensitivity: 'base'})
                        }));
                    }
                })
                .catch()
                .finally(() => {
                    cancelTokenSource = null;
                });

            return () => {
                isMounted.current = false;
                if (cancelTokenSource) {
                    cancelTokenSource.cancel();
                    cancelTokenSource = null;
                }
            }
        } else {
            setUsers([]);
        }
    }, [iWake, user]);

    return (
        <footer className="footer small">
            <Row>
                <Col className="text-left ml-4">
                    {process.env.REACT_APP_ENV_NAME === Environments.ENV_Prod ? "" : process.env.REACT_APP_ENV_NAME}
                </Col>
                <Col className="text-center">TransCom</Col>
                <Col className="text-right mr-4">
                    {!!messageFooter.message ?
                        <div className={"mr-3 d-inline-block text-" + messageFooter.color}>
                            {messageFooter.message}
                        </div>
                    :
                    null
                    }
                    {user.loggedIn ?
                        (HasFeature(user, TCSFeature.UserAdmin) || window.sessionStorage.getItem('device_token_for') !== undefined || IsDevFocused()) ?
                            <UncontrolledDropdown direction="up" className="d-inline-block">
                                <DropdownToggle color="link" className="undecoratedTextSmall">
                                    {user.Name}
                                </DropdownToggle>
                                <DropdownMenu className="pre-scrollable" right>
                                    {!!window.sessionStorage.getItem('device_token_for') ?
                                        <>
                                            <DropdownItem onClick={deImpersonate}>
                                                <FontAwesomeIcon icon={faExternalLinkAlt} fixedWidth/>
                                                De-Impersonate
                                            </DropdownItem>
                                            <DropdownItem divider/>
                                        </>
                                        :
                                        null
                                    }
                                    <DropdownItem header>TransCom Users</DropdownItem>
                                    {users.length > 0 ?
                                        users
                                            .filter(userItem => !userItem.IsVendor)
                                            .sort((a, b) => a.Name.localeCompare(b.Name, undefined, {sensitivity: 'base'}))
                                            .map((user) =>
                                            <DropdownItem key={user.ID} onClick={() => impersonate(user.ID)}>
                                                {user.Name}
                                            </DropdownItem>
                                        )
                                        :
                                        <DropdownItem disabled>Loading users...</DropdownItem>
                                    }
                                    <DropdownItem divider/>
                                    <DropdownItem header>Vendors</DropdownItem>
                                    {users.length > 0 ?
                                        users
                                            .filter(userItem => !!userItem.IsVendor)
                                            .sort((a, b) => a.Name.localeCompare(b.Name, undefined, {sensitivity: 'base'}))
                                            .map((user) =>
                                            <DropdownItem key={user.ID} onClick={() => impersonate(user.ID)}>
                                                {user.Name}
                                            </DropdownItem>
                                        )
                                        :
                                        <DropdownItem disabled>Loading users...</DropdownItem>
                                    }
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            :
                            user.Name
                        :
                        null
                    }
                </Col>
            </Row>
        </footer>
    );
};

export default Footer;
