import { Checkbox } from 'primereact/checkbox';
import '../settings.css';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link, Navigate } from "react-router-dom";

const SecurityTab = ({t}) => {
    return(
        <>
        <div className="security-wrapper">
            <div className="header">
                <span className='text-xl flex flex-row gap-3 items-center'><i className='pi pi-shield'></i>{t('athentication_policy')}</span>
            </div>

            <div className="security-content mt-3 pl-3 ">
                <div className="security-items-wrapper flex flex-col gap-1">
                    <div className="checkbox-wrapper flex flex-row items-center gap-2 mb-2">
                        <Checkbox inputId='notifications' onChange={() => {}} checked={null} />
                        <label htmlFor="notifications">{t('make_users_use_two_fa')}</label>
                    </div>

                    <div className="security-fields-wrapper flex gap-5 flex-wrap">
                        <div className="input-wrapper">
                            <span className='lp-1'>{t('advise_user_for_changing_password')}</span>
                            <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <Dropdown value={null} onChange={() => {}} options={[]} optionLabel="name" placeholder={t('select_quantity_of_days')} className="w-full md:w-14rem" emptyMessage={t('no_options_available')} />
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <span className='lp-1'>{t('inactivity_time_until_session_expire')}</span>
                            <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <Dropdown value={null} onChange={() => {}} options={[]} optionLabel="name" placeholder={t('select_quantity_of_minutes')} className="w-full md:w-14rem" emptyMessage={t('no_options_available')} />
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>

        <div className="activity-regitry-wrapper">
            <div className="header">
                <span className='text-xl flex flex-row gap-3 items-center'><i className='pi pi-list'></i>{t('activity_registry')}</span>
            </div>

            <div className="active-registry-content mt-2">
                <div className="active-registry-items-wrapper flex gap-5 items-end pl-3 flex-wrap">
                    <div className="input-wrapper">
                        <span className='lp-1'>{t('detail_level')}</span>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <Dropdown value={null} onChange={() => {}} options={[]} optionLabel="name" placeholder={t('select_the_detail_level')} className="w-full md:w-14rem" emptyMessage={t('no_options_available')} />
                        </div>
                    </div>

                    <Button label={t('view_logs')} icon={'pi pi-file'}/>
                </div>
            </div>
        </div>

        <div className="permission-wrapper">
            <div className="header">
                <span className='text-xl flex flex-row gap-3 items-center'><i className='pi pi-key'></i>{t('permission_management')}</span>
            </div>

            <div className="permission-content mt-2">
                <span className='pl-4 text-xm'>Permissões podem ser controladas através deste painel.</span>
                <div className="permission-items-wrapper pl-3 pt-3 flex-wrap">
                    <DataTable value={[]} showGridlines size='small' rows={3} scrollable tableStyle={{ maxWidth: '50rem', marginBottom: 10, display: window.screen.width <= 500 && 'none' }} emptyMessage={t('tables_empty_message')}>
                        <Column field="id" header={t('tables_id')}></Column>
                        <Column field="name" header={t('tables_name')}></Column>
                        <Column field="users" header={t('tables_users')}></Column>
                    </DataTable>

                    <div className="manage-permissions pl-2 ">
                        <span>{t('need_to_manage_permissions_question')}</span>
                        <Link to={'/manage-permissions'} className='flex flex-row items-center gap-2 w-[300px]'><i className='pi pi-arrow-right'></i> {t('manage_users_permissions')}</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SecurityTab;