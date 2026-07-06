import { useEffect } from "react";
import GlobalNavbar from "../../components/globalNavbar";
import { useTranslation } from 'react-i18next';
import NProgress from 'nprogress';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import './permissionManagement.css'
// import { useState } from "react";
// import { IconField } from "primereact/iconfield";
// import { InputIcon } from "primereact/inputicon";
// import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from 'react-router-dom';

const PermissionsManagement = () => {
    const { t } = useTranslation('common');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Sollarium - ${t('permissions_management')}`
        const timer = setTimeout(() => { NProgress.done(); }, 300);
        return () => clearTimeout(timer);
    }, [t])

    return(
        <>
            <GlobalNavbar />

            <main className="permissions-management-wrapper flex flex-col gap-2">
                <h1 className="text-3xl mb-5">{t('permission_management')}</h1>
                <Button icon={'pi pi-arrow-left'} label={t('go_back')} style={{maxWidth: 170, marginLeft: 5}} onClick={() => navigate(-1)}/>

                <section className="permisisons-table flex flex-col">
                    <div className="table-header flex flex-row flex nowrap justify-between">
                        {/* <IconField iconPosition="left">
                            <InputIcon className="pi pi-search"> </InputIcon>
                            <InputText placeholder={t('search')} />
                        </IconField> */}

                        <div className="right-side-header flex flex-row gap-2 items-center">
                            <Button icon={'pi pi-plus'} label={t('new_permission')} style={{minWidth: 210}}/>
                            <Button icon={'pi pi-info-circle'} label={t('view_action_history')} style={{minWidth: 250}} severity="help"/>

                            <Dropdown 
                                value={{}} 
                                onChange={() => {}} 
                                options={[
                                    { code: 0, name: t('status_inactive') },
                                    { code: 1, name: t('status_active') }
                                ]} 
                                optionLabel="name" 
                                placeholder={t('select_a_permission_status_filter')}
                                className="w-full md:w-14rem" 
                                emptyMessage={t('no_options_available')}
                            />
                        </div>
                    </div>

                    <DataTable value={[]} removableSort size="small" reorderableColumns resizableColumns columnResizeMode="expand" scrollHeight="50%" showGridlines tableStyle={{ minWidth: '50rem' }} emptyMessage={t('tables_empty_message')}>
                        <Column field="id" header={t('tables_actions')} ></Column>
                        <Column field="permission_name" header={t('tables_permission_name')} sortable filter ></Column>
                        <Column field="permission_users_attached" header={t('tables_users_attached')} sortable></Column>
                        <Column field="permisisons_attached" header={t('tables_permissions_attached')} sortable></Column>
                        <Column field="active" header={t('tables_permission_status')} sortable></Column>
                        <Column field="created_at" header={t('tables_created_at')} sortable filter></Column>
                    </DataTable>
                </section>
            </main>
        </>
    )
}

export default PermissionsManagement;