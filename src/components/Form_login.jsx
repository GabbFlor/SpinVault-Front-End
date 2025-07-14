import { useEffect, useState } from "react";
import { BsLock, BsUnlock } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiUrl } from "../API";
import axios from "axios";
import { useAuth } from "../AuthContext";

const Form_login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [typePassW, setTypePassW] = useState("password")
    const [iconPassW, setIconPassW] = useState(<BsLock />)
    const [carregando, setCarregando] = useState(false);
    const { login } = useAuth();

    useEffect(() => {
        if (carregando == true) {
            Swal.fire({
                icon: "info",
                title: "Carregando...",
                showCancelButton: false,
                showConfirmButton: false
            })
        }
    }, [carregando])

    const navigate = useNavigate();

    const handleShowPassword = () => {
        if (typePassW == "password") {
            setTypePassW("text")
            setIconPassW(<BsUnlock />)
        } else {
            setTypePassW("password")
            setIconPassW(<BsLock />)
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setCarregando(true);

        axios.post(`${apiUrl}/auth/login` , {
            email: email,
            password: password
        })
        .then(response => {
            if(response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sucesso!",
                    text: "Login realizado com sucesso!",
                    timer: 1000, 
                })
                .then(() => {
                    login(response.data.token);

                    navigate('/home');
                })
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: "Email ou senha incorretos, tente novamente.",
                    showConfirmButton: true
                })
            } else if (error.response && error.response.status === 429) {
                Swal.fire({
                    icon: "error",
                    title: "Opa, calma ae!",
                    text: "Você realizou tentativas demais! Aguarte um pouco e tente novamente.",
                    showConfirmButton: true
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: "Erro interno no servidor, tente novamente mais tarde ou contate algum administrador.",
                    showConfirmButton: true
                })
            }
        })
        .finally(() => {
            setCarregando(false);
        })
    }

    const recuperarSenha = async () => {
        const { value: email } = await Swal.fire({
            title: "Esqueci minha senha",
            input: 'email',
            inputLabel: "Informe o seu email de cadastro",
            inputPlaceholder: "exemplo@dominio.com",
            showCancelButton: true,
            confirmButtonText: "Enviar",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            // msg personalizada quando o email digitado n seguir o padrão
            inputValidator: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    return 'Por favor, insira um e-mail válido';
                }
                return null;
            },
            preConfirm: async (email) => {
                try {
                    const response = await axios.post(`${apiUrl}/recuperarSenha/gerarEmail`, {
                        email: email
                    });
                } catch(error) {
                    console.error(error);
                    Swal.showValidationMessage('Erro ao enviar e-mail de recuperação, tente mais tarde ou contate um administrador.');
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        });

        if (email) {
            Swal.fire('Pronto!', 'Se o e-mail existir, você receberá o link de recuperação.', 'success');
        }
    }

    return (
        <form className="form-direita form-alinhado" onSubmit={handleSubmit}>
            <h1 className="title-mobile">Entre na sua conta.</h1>

            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite..."
                    required
                />
            </div>

            <div className="input-senha">
                <label htmlFor="senha">Senha</label>
                <input 
                    type={typePassW}
                    name="senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite..."
                    required
                />
                <button type="button" className="btn-show-passw" onClick={handleShowPassword}>
                    {iconPassW}
                </button>
            </div>

            <button 
                type="submit" 
                className="btn-submit-registro"
                disabled={email == "" || password == ""}
                >
                    Entrar!
            </button>

            <label>Esqueceu sua senha? <span onClick={() => recuperarSenha()}>Recupere aqui!</span></label>
            <label>Não tem uma conta? <Link to={'/auth/registro'}>Crie aqui!</Link></label>
        </form>
    )
}

export default Form_login;