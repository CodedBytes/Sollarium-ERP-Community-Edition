import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import './login.css';
import { useRef, useState } from 'react';
import { useAuth } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NProgress from 'nprogress';

const Login = () => {
    const [email, setEmail] = useState(localStorage.getItem("email") || '');
    const [senha, setSenha] = useState('');
    const [rememberMe, setRememberMe] = useState(localStorage.getItem("email") ? true : false);
    const [activeRequests, setActiveRequests] = useState(0);
    const [acesso, setAcesso] = useState(null);
    const toast = useRef(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [distribuidores, setDistribuidores] = useState([]);
    const { t } = useTranslation('common');
    const createToast = (severity, summary, detail) => {toast.current.show({ severity: severity, summary: summary, detail: detail });};

    // --
    const RequestOAuth = async () => {
        setActiveRequests(prev => prev + 1);

        // Para a execução se não tiver e-mail ou senha
        if (!email || !senha) {
            createToast('error', t('error'), t('email_or_password_field_is_emty'));
            setActiveRequests(prev => Math.max(0, prev - 1));
            return;
        }

        try {
            const data = await login({email, senha, acesso, rememberMe});

            // Se o usuário não for definido no login, quer dizer que não foi logado.
            if(!data.user || data.user == null || data.user == undefined) {
                createToast('error', t('error'), t(data.msg));
                setActiveRequests(prev => Math.max(0, prev - 1));
                return;
            }
            navigate('/');
        } 
        catch (error) {
            createToast('error', t('error'), error);
            setActiveRequests(prev => Math.max(0, prev - 1));
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            NProgress.done();
        }, 300); // 300ms dá um efeito visual agradável de transição
    
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <title>Sollarium - Login</title>
            <Toast ref={toast} baseZIndex={99999}/>

            {
                (activeRequests > 0) && (
                    <div className="backdrop-loading flex flex-column justify-content-center align-items-center fixed top-0 left-0 w-full h-full z-9999 bg-black-alpha-60">
                        <i className="pi pi-spin pi-spinner" style={{ fontSize: '4rem' }}></i>
                    </div>
                )
            }

            <section className="main-wrapper flex flex-col w-full h-full justify-center">
                <div className="sublogin-wrapper flex flex-col items-center justify-center">
                    <h1 className='text-6xl p-0'>Sollarium</h1>
                    <span className='text-xm'>Boas vindas!</span>

                    <div className="login-wrapper flex flex-col gap-5 mt-8 w-[360px]">
                        <div className="inputs-full-wrapper flex flex-col gap-1">
                            <div className="input-wrapper">
                                <span className='ml-1'>E-mail</span>
                                <div className="p-inputgroup flex-1">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText
                                        placeholder="ex. jhon.doe@gmail.com" 
                                        value={email} 
                                        onChange={(e) => {setEmail(e.target.value);}} 
                                    />
                                </div>
                            </div>

                            <div className="input-wrapper">
                                <span className='ml-1'>Senha</span>
                                <div className="p-inputgroup flex-1">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-key"></i>
                                    </span>
                                    <Password placeholder='Sua senha' value={senha} onChange={(e) => {setSenha(e.target.value);}} feedback={false} onKeyDown={(e) => { if (e.key === 'Enter') RequestOAuth(); }} />
                                </div>
                            </div>

                            <div className="remember-area flex flex-row flex-nowrap gap-2 mt-4">
                                <Checkbox name='remember-me' inputId='remember-me' onChange={e => setRememberMe(e.checked)} checked={rememberMe}></Checkbox>
                                <label htmlFor="remember-me">Lembrar do meu e-mail</label>
                            </div>
                        </div>

                        <Button label='Entrar' onClick={() => {RequestOAuth();}} disabled={(!email || !senha) || (senha.length < 5)}/>

                        <span className='admin-label text-xs'>É um administrador? Acesse o <a href="#">painel do administrador</a></span>
                    </div>
                </div>
            </section>

            <footer className='absolute bottom-0 h-[65px] flex flex-col justify-center items-center w-full'>
                <span className='text-xm'>&copy;Sollarium - Todos os direitos reservados</span>
                <span className='text-xs'>Desenvolvido por CodedBytes</span>
            </footer>
        </>
    )
}

export default Login;