import React, {useState} from 'react';
import './NavBar.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ClassNames, IsDevFocused} from '@denjpeters/intelliwakereact';
import TCSIcon from './Assets/TCSIcon.png';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faAngleDown} from "@fortawesome/pro-light-svg-icons/faAngleDown";
import {faAngleDoubleRight} from "@fortawesome/pro-regular-svg-icons/faAngleDoubleRight";
import {faCommentsAlt} from "@fortawesome/pro-duotone-svg-icons/faCommentsAlt";
import {faInbox} from "@fortawesome/pro-duotone-svg-icons/faInbox";
import {faUserFriends} from "@fortawesome/pro-duotone-svg-icons/faUserFriends";
import {faChartLine} from "@fortawesome/pro-duotone-svg-icons/faChartLine";
import {faArrowAltToLeft, faCars, faPlusHexagon, faSlidersH} from "@fortawesome/pro-duotone-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "./Stores/rootReducer";
import {AppSettingsNavBarLockedUpdated} from "./Stores/appsettings/actions";

interface INavItem {
    title: string,
    url?: string,
    faIcon?: IconProp,
    imgSrc?: any,
    separate?: boolean,
    swapOpacity?: boolean
}

const NavBar = () => {
    const dispatch = useDispatch();
    const {user, appSettings} = useSelector((state: AppState) => state);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDropped, setIsDropped] = useState(false);

    const navItemsFirstRow: INavItem[] = user.loggedIn ? [
            {title: 'Dashboard', imgSrc: TCSIcon},
            {title: 'Trips', faIcon: faCars},
            {title: 'Translations', faIcon: faCommentsAlt, swapOpacity: true},
            {title: 'Messages', faIcon: faInbox}
        ]
        :
        [
            {title: 'Login', imgSrc: TCSIcon}
        ];

    const navItemsSecondRow: INavItem[] = user.loggedIn ? [
            {title: 'Contacts', faIcon: faUserFriends},
            {title: 'Intakes', faIcon: faPlusHexagon, swapOpacity: true},
            {title: 'Reports', faIcon: faChartLine},
            {title: 'Administration', faIcon: faSlidersH, separate: true},
            {title: 'Logout', faIcon: faArrowAltToLeft}
        ]
        :
        IsDevFocused() ?
            [
                {title: 'Administration', faIcon: faSlidersH, separate: true}
            ]
            :
            [];

    const writeNavItem = (navItem: INavItem, idx: number, secondRow = false) => {
        return (
            <a className={"nav-item " + ClassNames({
                'seperate': !!navItem.separate,
                'secondRow': secondRow,
                'isSelected': window.location.pathname.toLowerCase().startsWith('/' + (navItem.url ?? navItem.title).toLowerCase())
            })} title={appSettings.navBarLocked ? navItem.title : ''} key={idx} href={'/' + (navItem.url ?? navItem.title)}>
                <div className="nav-link">
                    {!!navItem.faIcon ?
                        <FontAwesomeIcon icon={navItem.faIcon} className="link-icon" swapOpacity={!!navItem.swapOpacity}/>
                        : null
                    }
                    {!!navItem.imgSrc ?
                        <img src={navItem.imgSrc} alt={navItem.title} className="link-icon-logo"/>
                        : null
                    }
                    <span className="link-text">{navItem.title}</span>
                </div>
            </a>
        )
    };

    return (
        <nav className={"navbar Desktop " + ClassNames({
            Expanded: isExpanded,
            Dropped: isDropped
        })} onMouseEnter={() => {
            setIsExpanded(!appSettings.navBarLocked)
        }} onMouseLeave={() => {
            setIsExpanded(false)
        }}>
            <ul className="navbar-nav">
                {navItemsFirstRow.map((navItem, idx) =>
                    writeNavItem(navItem, idx)
                )}

                <li className="nav-item dropper" onClick={() => {
                    setIsDropped(!isDropped);
                }}>
                    <div className="nav-link">
                        <FontAwesomeIcon icon={faAngleDown} className="link-icon"/>
                    </div>
                </li>
                <div className="dropperBreak"/>

                {navItemsSecondRow.map((navItem, idx) =>
                    writeNavItem(navItem, idx, true)
                )}

                {user.loggedIn ?
                    <li className="nav-item nav-item-pin">
                        <div className="nav-link-pin" onClick={() => {
                            setIsExpanded(appSettings.navBarLocked);
                            AppSettingsNavBarLockedUpdated(!appSettings.navBarLocked)(dispatch);
                        }}>
                            <FontAwesomeIcon icon={faAngleDoubleRight} className={"link-icon-pin " + ClassNames({Off: appSettings.navBarLocked})}/>
                        </div>
                    </li>
                    :
                    null
                }
            </ul>
        </nav>
    );
};

export default NavBar;
