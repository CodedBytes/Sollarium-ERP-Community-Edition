import { DataTable } from 'primereact/datatable';
import '../settings.css';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

const IntegrationTab = ({t}) => {
    return(
        <>
        <div className="integration-wrapper">
            <div className="header">
                <span className='text-xl flex flex-row gap-3 items-center'><i className='pi pi-key'></i>{t('api_keys_management')}</span>
            </div>

            <div className="integration-content mt-2">
                <span className='pl-4 text-xm'>Aqui você pode gerar ou revogar chaves de api para integração com nosso sistema, e controlar integrações vizinhas.</span>
                <div className="api-integration-wrapper pl-3 pt-3 flex-wrap">
                    <DataTable value={[]} showGridlines size='small' rows={4} tableStyle={{ maxWidth: '50rem', marginBottom: 10, display: window.screen.width <= 500 && 'none' }} emptyMessage={t('tables_empty_message')}>
                        <Column field="id" header={t('tables_id')}></Column>
                        <Column field="status" header={t('tables_status')}></Column>
                        <Column field="name" header={t('tables_name')}></Column>
                        <Column field="permissions" header={t('tables_permissions')}></Column>
                        <Column field="created" header={t('tables_created_when')}></Column>
                        <Column field="expires" header={t('tables_expires_when')}></Column>
                    </DataTable>

                    <div className="action-buttons flex gap-2">
                        <Button label={t('generate_api_key')} icon='pi pi-plus'/>
                        <Button label={t('revoke_api_key')} icon='pi pi-times' severity='danger'/>
                    </div>
                </div>
            </div>
        </div>

        <div className="general-settings-wrapper">
            <div className="header">
                <span className='text-xl flex flex-row gap-3 items-center'><i className='pi pi-cog'></i>{t('api_keys_management')}</span>
            </div>

            <div className="general-settings-content mt-2">
                <span className='pl-4 text-xm'>Aqui você pode gerenciar configurações gerais de integrações do nosso sistema ou com sistemas vizinhos.</span>
                <div className="general-settings-items-wrapper pl-3 pt-3">
                    <div className="checkbox-wrapper flex flex-row items-center gap-2 mb-2">
                        <Checkbox inputId='notifications' onChange={() => {}} checked={null} />
                        <label htmlFor="notifications">{t('enable_public_api_usage')}</label>
                    </div>

                    <Button label={t('view_api_documentation')} icon={'pi pi-file'} />
                </div>
            </div>
        </div>
        </>
    )
}

export default IntegrationTab;