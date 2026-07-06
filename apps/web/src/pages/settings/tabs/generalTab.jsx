import { Checkbox } from 'primereact/checkbox';
import '../settings.css';
import { Dropdown } from 'primereact/dropdown';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const GeneralTab = ({t}) => {
    return(
        <>
        <div className="users">
            <div className="header">
                <span className='text-xl flex flex-row gap-3 items-center'><i className='pi pi-users'></i>{t('users')}</span>
            </div>

            <div className="users-content">
                <span className='text-xm'>Informações e controle de usuários podem ser fetos através das opções abaixo.</span>
                <div className="invite-wrapper flex-wrap">
                    <div className="input-wrapper">
                        <span className='lp-1'>{t('email_to_invite')}</span>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder={'eg. jhon.doe@gmail.com'} value={null} onChange={() => {}} />
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <span className='lp-1'>{t('permission_attached')}</span>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <Dropdown value={null} onChange={() => {}} options={[]} optionLabel="name" placeholder={t('select_a_permission')} className="w-full md:w-14rem" emptyMessage={t('no_options_available')} />
                        </div>
                    </div>

                    <Button label={t('invite')} icon={'pi pi-send'} onClick={() => {}}/>
                </div>

                <div className="manage-users pl-2 w-[205px]">
                    <span>1 {t('active_users')}</span>
                    <Link to={'/manage-users'} className='flex flex-row items-center gap-2'><i className='pi pi-arrow-right'></i> {t('manage_users')}</Link>
                </div>
            </div>
        </div>

        <div className="system-wrapper">
            <div className="header">
                <span className='text-xl flex flex-row gap-3 items-center'><i className='pi pi-cog'></i>{t('system')}</span>
            </div>

            <div className="system-content pt-2">
                <span className='pl-3 text-xm'>Controle basico do sistema de ERP.</span>
                <div className="system-wrapper flex flex-row items-end gap-5 pl-3 pt-2 pb-4 flex-wrap">
                    <div className="input-wrapper">
                        <span className='lp-1'>{t('language')}</span>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <Dropdown value={null} onChange={() => {}} options={[]} optionLabel="name" placeholder={t('select_a_language')} className="w-full md:w-14rem" emptyMessage={t('no_options_available')} />
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <span className='lp-1'>{t('timezone')}</span>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <Dropdown value={null} onChange={() => {}} options={[]} optionLabel="name" placeholder={t('select_a_timezone_type')} className="w-full md:w-14rem" emptyMessage={t('no_options_available')} />
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <span className='lp-1'>{t('currency')}</span>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <Dropdown value={null} onChange={() => {}} options={[]} optionLabel="name" placeholder={t('select_a_currency_type')} className="w-full md:w-14rem" emptyMessage={t('no_options_available')} />
                        </div>
                    </div>

                    <div className="checkbox-wrapper flex flex-row items-center gap-2 mb-2">
                        <Checkbox inputId='notifications' onChange={() => {}} checked={null} />
                        <label htmlFor="notifications">{t('enable_notifications')}</label>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default GeneralTab;