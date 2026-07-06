import { Link, Navigate } from "react-router-dom";
import './styles/GlobalNavbar.css';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'primereact/avatar';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef, useState } from "react";
import { useAuth } from "../hooks/hooks";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";

const GlobalNavbar = () => {
    const { t } = useTranslation('common');
    const op = useRef(null);
    const [rightMenuView, setrightMenuView] = useState(false);
    const [activeRequests, setActiveRequests] = useState(0);
    const { logout } = useAuth();

    // Fazendo logout
    const DoLogout = async () => {
        setActiveRequests(prev => prev + 1);

        try {
            await logout();
            Navigate('/login');
        } 
        catch (error) {
            console.log(error);
            setActiveRequests(prev => Math.max(0, prev - 1));
        }
    }

    // Render
    return(
        <>
        {
            (activeRequests > 0) && (
                <div className="backdrop-loading flex flex-column justify-content-center align-items-center fixed top-0 left-0 w-full h-full z-9999 bg-black-alpha-60">
                    <i className="pi pi-spin pi-spinner" style={{ fontSize: '4rem' }}></i>
                </div>
            )
        }

        <header>
            <nav>
                <div className="left-wrapper flex flex-row gap-10">
                    <span className="flex items-center"><Link className="custom-link text-4xl" to={'/home'}>Sollarium</Link></span>

                    <ul className="flex flex-row flex-nowrap gap-2 items-center">
                        <li className="flex items-center gap-2"><i className="pi pi-folder"></i> <Link className="custom-link text-xl" to={'/modules'}>{t('modules')}</Link></li>
                        <li className="flex items-center gap-2"><i className="pi pi-wrench"></i> <Link className="custom-link text-xl" to={'/settings'}>{t('general_settings')}</Link></li>
                    </ul>
                </div>

                <div className="right-wrapper flex flex-wrap gap-4" onClick={(e) => op.current.toggle(e)} >
                    <Avatar label="J" image="" size="large" shape="circle" />

                    <div className="user-area-button flex flex-col">
                        <span><b>João Victor</b></span>
                        <span>Desenvolvedor Web</span>
                    </div>

                    <i className="pi pi-arrow-down self-center"></i>
                </div>

                <Button icon={'pi pi-bars'} className="mobile-button" outlined severity="secondary" onClick={() => {setrightMenuView(true);}}/>
            </nav>
        </header>

        <Sidebar visible={rightMenuView} position="right" onHide={() => setrightMenuView(false)}>
            
        </Sidebar>

        <OverlayPanel ref={op} style={{minWidth: 200}}>
            <ul className="user-menu flex flex-col gap-1">
                <li className="text-xl">
                    <Link to={'/profile'}>{t('profile')}</Link>
                </li>
                <li onClick={(e) => {DoLogout(); op.current.toggle(e)}}><span className="text-xl">{t('logout')}</span></li>
            </ul>
        </OverlayPanel>
        </>
    )
}

export default GlobalNavbar;