import { useEffect } from "react";
import GlobalNavbar from "../../components/globalNavbar";
import { useTranslation } from 'react-i18next';
import NProgress from 'nprogress';
import './home.css';
import { ProgressBar } from 'primereact/progressbar';
import { Dropdown } from "primereact/dropdown";
import { Link } from "react-router-dom";

const Home = () => {
    const { t } = useTranslation('common');
    useEffect(() => {
        document.title = `Sollarium - ${t('home')}`

        const timer = setTimeout(() => {
            NProgress.done();
        }, 300); // 300ms dá um efeito visual agradável de transição
    
        return () => clearTimeout(timer);
    }, [t])

    return(
        <>
            <GlobalNavbar />

            <main className="home-main-wrapper">
                <section className="content-wrapper flex flex-col pl-[10%] pr-[10%] gap-6 mt-6">
                    <div className="content-header flex flex-row items-center justify-between">
                        <h1 className="text-3xl">{t('main_panel')}</h1>

                        <div className="right-wrapper flex flex-row items-center gap-5">
                            {/* <div className="input-wrapper flex gap-2 items-center ">
                                <span className='ml-1'>{t('date_range')}</span>
                                <div className="p-inputgroup flex-1">
                                    <Dropdown 
                                        value={{}} 
                                        onChange={() => {}} 
                                        options={[
                                            {id: 1, name: "(Últimos 30 dias)", code: "last_30_days"},
                                            {id: 2, name: "(Últimos 60 dias)", code: "last_60_days"},
                                            {id: 3, name: "(Últimos 90 dias)", code: "last_90_days"},
                                            {id: 4, name: "(Últimos 365 dias)", code: "last_365_days"},
                                        ]} 
                                        optionLabel="name" 
                                        placeholder={t('select_a_date_range')}
                                        className="w-full md:w-14rem" 
                                        emptyMessage={t('no_options_available')}
                                    />
                                </div>
                            </div> */}

                            {/* <div className="input-wrapper flex gap-2 items-center ">
                                <span className='ml-1'>{t('date_range')}</span>
                                <div className="p-inputgroup flex-1">
                                    <Dropdown 
                                        value={{}} 
                                        onChange={() => {}} 
                                        options={[]} 
                                        optionLabel="name" 
                                        placeholder={t('select_a_date_range')}
                                        className="w-full md:w-14rem" 
                                        emptyMessage={t('no_options_available')}
                                    />
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="subcontainer-wrapper flex flex-wrap gap-4">
                        <div className="widgets-and-modules-container flex flex-col flex-nowrap gap-5 flex-1 w-full">
                            <div className="modules-modal flex flex-col gap-4 flex-1">
                                <div className="header flex items-center">
                                    <span className="text-xl">{t('widgets')}</span>
                                </div>

                                <div className="modules-available flex gap-2 w-full">
                                    <div className="content flex flex-row items-center justify-between flex-1 gap-7">
                                        <div className="description flex flex-col flex-1">
                                            <span>{t('available_modules')}</span>
                                            <span className="text-2xl mb-3"><b>4</b></span>

                                            <ProgressBar value={40} displayValueTemplate={() => ``} ></ProgressBar>
                                            
                                            <Link to={'/modules'} className='flex flex-row items-center gap-2 mt-3'>{t('see_the_catalog')}</Link>
                                        </div>

                                        <i className="pi pi-box" style={{ fontSize: '1.2rem' }}></i>
                                    </div>

                                    <div className="content flex flex-row items-center justify-between flex-1">
                                        <div className="description flex flex-col">
                                            <span>{t('installed_modules')}</span>
                                            <span className="text-2xl"><b>2</b></span>

                                            <ProgressBar value={20} displayValueTemplate={() => ``} ></ProgressBar>
                                            
                                            <Link to={'/modules'} className='flex flex-row items-center gap-2 mt-3'>{t('manage')}</Link>
                                        </div>

                                        <i className="pi pi-box" style={{ fontSize: '1.2rem' }}></i>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="modules-modal flex flex-col gap-4">
                                <div className="header flex items-center">
                                    <span className="text-xl">{t('widgets')}</span>
                                </div>

                                <div className="modules-available flex justify-between gap-6">
                                    <div className="content flex flex-row items-center justify-between w-[220px] p-2">
                                        <div className="description flex flex-col">
                                            <span>{t('available_modules')}</span>
                                            <span className="text-2xl"><b>2</b></span>
                                        </div>

                                        <i className="pi pi-box" style={{ fontSize: '1.2rem' }}></i>
                                    </div>

                                    <div className="content flex flex-row items-center justify-between w-[220px] p-2">
                                        <div className="description flex flex-col">
                                            <span>{t('installed_modules')}</span>
                                            <span className="text-2xl"><b>2</b></span>
                                        </div>

                                        <i className="pi pi-box" style={{ fontSize: '1.2rem' }}></i>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        <div className="general-activities flex-1">
                            
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home;