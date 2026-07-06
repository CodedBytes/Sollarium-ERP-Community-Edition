import GlobalNavbar from '../../components/globalNavbar';
import './installedModules.css';
import { useTranslation } from 'react-i18next';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import ModulesModal from '../../components/modulesModal';

const InstalledModules = () => {
    const { t } = useTranslation('common');
    useEffect(() => {
        document.title = `Sollarium - ${t('modules')}`

        const timer = setTimeout(() => {
            NProgress.done();
        }, 300); // 300ms dá um efeito visual agradável de transição
    
        return () => clearTimeout(timer);
    }, [t])


    return (
        <>
            <GlobalNavbar />

            <main className="modules-main-wrapper pt-2">
                <section className="modules-list flex items-start content-start gap-8 flex-wrap p-5">
                    <ModulesModal can_install={true} description={'purchase_module_description'} icon={'https://placehold.co/64x64/png'} module_type={0} title={'purchase_module_name'} already_installed={true} key={0} />
                    <ModulesModal can_install={false} description={'sales_module_description'} icon={'https://placehold.co/64x64/png'} module_type={0} title={'sales_module_name'} already_installed={false} key={1} />
                    <ModulesModal can_install={true} description={'notification_module_description'} icon={'https://placehold.co/64x64/png'} module_type={1} title={'notification_module_name'} already_installed={true} key={2} />
                    <ModulesModal can_install={true} description={'inventory_module_description'} icon={'https://placehold.co/64x64/png'} module_type={0} title={'inventory_module_name'} already_installed={false} key={3} />
                </section>
            </main>
        </>
    )
}

export default InstalledModules;