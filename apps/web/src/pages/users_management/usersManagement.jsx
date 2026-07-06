import { useEffect } from "react";
import GlobalNavbar from "../../components/globalNavbar";
import { useTranslation } from 'react-i18next';
import NProgress from 'nprogress';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import './usersManagement.css'
import { useState } from "react";
// import { IconField } from "primereact/iconfield";
// import { InputIcon } from "primereact/inputicon";
// import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from 'react-router-dom';

const UsersManagement = () => {
    const { t } = useTranslation('common');
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState(null);

    useEffect(() => {
        document.title = `Sollarium - ${t('users_management')}`
        const timer = setTimeout(() => { NProgress.done(); }, 300);
        return () => clearTimeout(timer);
    }, [t])

    return(
        <>
            <GlobalNavbar />

            <main className="users-management-wrapper flex flex-col gap-2">
                <h1 className="text-3xl mb-5">{t('users_management')}</h1>
                <Button icon={'pi pi-arrow-left'} label={t('go_back')} style={{maxWidth: 170, marginLeft: 5}} onClick={() => navigate(-1)}/>

                <section className="users-table flex flex-col">
                    <div className="table-header flex flex-row flex nowrap justify-between">
                        {/* <IconField iconPosition="left">
                            <InputIcon className="pi pi-search"> </InputIcon>
                            <InputText placeholder={t('search')} />
                        </IconField> */}

                        <div className="right-side-header flex flex-row gap-2 items-center justify-between w-full">
                            <Button icon={'pi pi-info-circle'} label={t('view_action_history')} style={{minWidth: 250}} severity="help"/>

                            <div className="right-items">
                                <span>{t('status_filter_label')}: </span>
                                <Dropdown 
                                    value={statusFilter} 
                                    onChange={(e) => {setStatusFilter(e.value);}} 
                                    options={[
                                        { code: 0, name: t('status_inactive') },
                                        { code: 1, name: t('status_active') }
                                    ]} 
                                    optionLabel="name" 
                                    placeholder={t('select_a_status_filter')}
                                    className="w-full md:w-14rem" 
                                    emptyMessage={t('no_options_available')}
                                />
                            </div>
                        </div>
                    </div>

                    <DataTable value={[]} removableSort size="small" scrollHeight="50%" showGridlines tableStyle={{ minWidth: '50rem' }} emptyMessage={t('tables_empty_message')}>
                        <Column field="id" header={t('tables_actions')} ></Column>
                        <Column field="full_name" header={t('tables_user')} sortable filter ></Column>
                        <Column field="work_email" header={t('tables_email')} sortable filter></Column>
                        <Column field="dep_position" header={t('tables_department_position')} sortable filter></Column>
                        <Column field="active" header={t('tables_user_status')} sortable></Column>
                        <Column field="last_login" header={t('tables_last_login')} sortable filter></Column>
                    </DataTable>
                </section>
            </main>
        </>
    )
}

export default UsersManagement;