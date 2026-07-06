import { useEffect } from 'react';
import GlobalNavbar from '../../components/globalNavbar';
import NProgress from 'nprogress';
import { useTranslation } from 'react-i18next';
import './settings.css';
import { Button } from 'primereact/button';
import { useState } from 'react';
import GeneralTab from './tabs/generalTab';
import SecurityTab from './tabs/securityTab';
import IntegrationTab from './tabs/integrationTab';

const Settings = () => {
    const { t } = useTranslation('common');
    const [tabIndex, setTabIndex] = useState(0);
    const [tabsStateOpen, setTabsStateOpen] = useState(window.screen.width <= 900 ? false : true);
    useEffect(() => {
        document.title = `Sollarium - ${t('settings')}`

        const timer = setTimeout(() => {
            NProgress.done();
        }, 300); // 300ms dá um efeito visual agradável de transição
    
        return () => clearTimeout(timer);
    }, [t]);

    return (
        <>
            <GlobalNavbar />

            <main className="full-page-wrapper">
                <section className={`left-menu ${tabsStateOpen ? 'w-[260px]' : 'w-[75px]'}`}>
                    <div className="menu-full-wrapper flex flex-col gap-6">
                        <div className="menu-header flex flex-row justify-between pl-2 pr-2">
                            <Button icon={tabsStateOpen ? 'pi pi-arrow-left' : 'pi pi-arrow-right'} outlined severity='secondary' onClick={() => {setTabsStateOpen(prev => !prev)}}/>
                        </div>

                        <div className="menu-content">
                            <div className={`menu-item flex flex-row items-center gap-2 ${tabIndex == 0 && 'active'}`} onClick={() => {setTabIndex(0);}}>
                                <i className='pi pi-cog'></i>
                                {(tabsStateOpen && <span>{t('general')}</span>)}
                            </div>

                            <div className={`menu-item flex flex-row items-center gap-2 ${tabIndex == 1 && 'active'}`} onClick={() => {setTabIndex(1);}}>
                                <i className='pi pi-shield'></i>
                                {(tabsStateOpen && <span>{t('security')}</span>)}
                            </div>

                            <div className={`menu-item flex flex-row items-center gap-2 ${tabIndex == 2 && 'active'}`} onClick={() => {setTabIndex(2);}}>
                                <i className='pi pi-sync'></i>
                                {(tabsStateOpen && <span>{t('api_integration')}</span>)}
                            </div>
                        </div>
                    </div>
                </section>

                <section className='items-wrapper flex flex-col gap-5 flex-1'>
                    <div className="actions pl-3">
                        <Button label={t('save')} icon={'pi pi-save'}/>
                    </div>
                    
                    {(tabIndex == 0) && (<GeneralTab t={t} />)}
                    {(tabIndex == 1) && (<SecurityTab t={t} />)}
                    {(tabIndex == 2) && (<IntegrationTab t={t} />)}
                </section>
            </main>
        </>
    )
}

export default Settings;