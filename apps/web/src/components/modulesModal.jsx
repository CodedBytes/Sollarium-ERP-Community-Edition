import { useTranslation } from 'react-i18next';
import './styles/modulesModal.css';
import { Button } from 'primereact/button';
import { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';

const ModulesModal = ({module_type, can_install, description, title, icon, already_installed}) => {
    const { t } = useTranslation('common');
    const op = useRef(null);
    
    return(
        <>
            <div className="module-modal-wrapper flex flex-col gap-3 w-[350px] relative">
                <div className="top-wrapper flex flex-row items-center gap-3">
                    <img src={icon} alt="erp_module_icon" />

                    <div className="module-description-area flex flex-col gap-2">
                        <span className='text-xl'>{title}</span>
                        <span className='module-description text-xs'>{t(description)}</span>
                    </div>
                </div>

                <Button icon={'pi pi-ellipsis-v'} className='menu-button' outlined severity='secondary' onClick={(e) => {op.current.toggle(e);}} />
                {
                    module_type !== 1 && (
                        <>
                        {!already_installed ? <Button label={can_install ? t('install') : t('know_more_about')} icon={can_install ? 'pi pi-save' : 'pi pi-info-circle'} />
                        : <span className='text-xs mt-4'>{t('this_module_is_already_installed')}</span>}
                        </>
                    )
                }
            </div>

            <OverlayPanel ref={op} style={{minWidth: 200}}>
                <ul className="module-menu-modal flex flex-col gap-1">
                    <Button icon={'pi pi-info-circle'} label={t('informations')} outlined severity='secondary' onClick={() => {}}/>
                    {already_installed && <Button icon={'pi pi-refresh'} label={t('update_module')} outlined severity='secondary'/>}
                </ul>
            </OverlayPanel>
        </>
    )
}

export default ModulesModal;