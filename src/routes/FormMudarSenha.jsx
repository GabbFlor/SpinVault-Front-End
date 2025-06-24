import { useEffect, useState } from "react";
import Registro_login_style from "../styles/Registro_Login_style"
import { BsLock, BsUnlock } from "react-icons/bs"
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../API";
import Swal from "sweetalert2";
import { ring2 } from "ldrs";

const FormMudarSenha = () => {
    const [senha, setSenha] = useState("");
    const [senhaConfirm, setSenhaConfirm] = useState("");
    const [typePassW, setTypePassW] = useState("password")
    const [iconPassW, setIconPassW] = useState(<BsLock />)
    const [typeConfirmPassW, setTypeConfirmPassW] = useState("password")
    const [iconConfirmPassW, setIconConfirmPassW] = useState(<BsLock />)
    const [verificPassW, setVerificPassW] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [carregandoPagina, setCarregandoPagina] = useState(true);
    const [tokenValido, setTokenValido] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    ring2.register()
    const tokenMudarSenha = searchParams.get("token");

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

    const handleShowPassword = () => {
        if (typePassW == "password") {
            setTypePassW("text")
            setIconPassW(<BsUnlock />)
        } else {
            setTypePassW("password")
            setIconPassW(<BsLock />)
        };
    }
    const handleShowConfirmPassword = () => {
        if (typeConfirmPassW == "password") {
            setTypeConfirmPassW("text")
            setIconConfirmPassW(<BsUnlock />)
        } else {
            setTypeConfirmPassW("password")
            setIconConfirmPassW(<BsLock />)
        };
    }

    useEffect(() => {
        if (senha == "" && senhaConfirm == "") {
            setVerificPassW(null)
        } else if(senha == senhaConfirm && senha !== "" && senhaConfirm !== "") {
            setVerificPassW(true)
        } else (
            setVerificPassW(false)
        );
    }, [senha, senhaConfirm])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setCarregando(true);

        axios.put(`${apiUrl}/recuperarSenha/alterarSenha`, {
            token: tokenMudarSenha,
            senha: senha
        })
        .then(response => {
            if(response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sucesso!",
                    text: "A sua senha foi alterada com sucesso! Você será redirecionado(a) para a tela de login, onde poderá utilizar a sua nova senha.",
                    timer: 1500, 
                })
                .then(() => {
                    navigate('/auth/login');
                })
            }
        })
        .catch(error => {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: "Erro interno no servidor, tente novamente mais tarde ou contate algum administrador.",
                showConfirmButton: true
            })
        })
        .finally(() => {
            setCarregando(false);
        })
    }

    useEffect(() => {
        const validarToken = async () => {
            try {
                const response = await axios.post(`${apiUrl}/recuperarSenha/validarToken`, {
                    token: tokenMudarSenha
                })

                if (response.status === 200) {
                    setTokenValido(true);
                } else {
                    navigate("/not-found");
                }
            } catch(error) {
                navigate("/not-found");
            } finally {
                setCarregandoPagina(false);
            }
        };

        validarToken();
    }, [navigate])

    if(carregandoPagina) {
        return (
            <div className="carregamento">
                <l-ring-2
                    size="80"
                    stroke="5"
                    stroke-length="0.25"
                    bg-opacity="0.1"
                    speed="0.8" 
                    color="#C47D69" 
                ></l-ring-2>
            </div>
        )
    }

    if(!tokenValido) return null;

    return (
        <div className="Pag-mudar-senha Pag-registro">
            <Registro_login_style />

            <main>
                <form className="form-direita" onSubmit={handleSubmit}>
                    <h1 className="title-mobile title-mudar-senha">Recupere a sua senha</h1>

                    <div className="input-senha">
                        <label htmlFor="senha">Senha</label>
                        <input 
                            name="senha"
                            type={typePassW}
                            placeholder="Digite a sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <button type="button" className="btn-show-passw" onClick={handleShowPassword}>
                            {iconPassW}
                        </button>
                    </div>
                    <div className="input-senha">
                        <label htmlFor="senha-confirm">Confirme a sua senha</label>
                        <input 
                            type={typeConfirmPassW}
                            name="senha-confirm"
                            placeholder="Digite a sua senha"
                            value={senhaConfirm}
                            onChange={(e) => setSenhaConfirm(e.target.value)}
                            required
                        />
                        <button type="button" className="btn-show-passw" onClick={handleShowConfirmPassword}>
                            {iconConfirmPassW}
                        </button>
                    </div>

                    {verificPassW == true ? (
                        <label htmlFor="verificação" style={{color: "blue"}}>As senhas coincidem</label>
                    ) : verificPassW == false ? (
                        <label htmlFor="verificação" style={{color: "#750101"}}>As senhas não coincidem</label>
                    ) : ""}
                    <button 
                        type="submit" 
                        className="btn-submit-registro"
                        disabled={verificPassW == false || verificPassW == null}
                        >
                            Recuperar!
                    </button>
                </form>
            </main>
        </div>
    )
}

export default FormMudarSenha;