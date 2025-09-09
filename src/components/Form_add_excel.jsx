import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { apiUrl } from '../API';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
// O ícone foi alterado para um mais genérico.
import { FaUpload, FaFileCsv } from "react-icons/fa"; // Alterado de FaFileExcel para FaFileCsv

// O nome do componente foi alterado para refletir sua nova função.
const Form_add_excel = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [observacoes, setObservacoes] = useState('');
    const [carregando, setCarregando] = useState(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { token, logout } = useAuth();

    useEffect(() => {
        if (carregando) {
            Swal.fire({
                icon: "info",
                title: "Enviando dados...",
                text: "Aguarde enquanto processamos o seu arquivo e as informações.",
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
            });
        } else {
            Swal.close();
        }
    }, [carregando]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            if (fileType === "text/csv") {
                setSelectedFile(file);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Tipo de arquivo inválido",
                    text: "Por favor, selecione um arquivo CSV (.csv).",
                });
                e.target.value = null;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            Swal.fire({
                icon: "error",
                title: "Nenhum arquivo selecionado",
                text: "Você precisa selecionar um arquivo CSV para enviar!",
                showConfirmButton: true,
            });
            return;
        }

        setCarregando(true);

        const formData = new FormData();
        formData.append('arquivo', selectedFile);

        const dadosExtras = { observacoes: observacoes };
        const dadosBlob = new Blob([JSON.stringify(dadosExtras)], {
            type: 'application/json'
        });
        formData.append('dados', dadosBlob);

        axios.post(`${apiUrl}/migracaoExcel`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso!",
                        text: "O arquivo e os dados foram enviados para processamento!",
                        timer: 2000,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    setSelectedFile(null);
                    setObservacoes('');
                    document.getElementById('file-input').value = null;
                    queryClient.invalidateQueries(['countDisks', token]);
                }
            })
            .catch(error => {
                if (error.response) {
                    switch (error.response.status) {
                        case 403:
                            Swal.fire({
                                icon: "error",
                                title: "Não autorizado!",
                                text: "A sua conta não tem permissão para realizar esta ação.",
                            });
                            break;
                        case 401:
                            Swal.fire({
                                icon: "info",
                                title: "Sessão Expirada",
                                text: "Sua sessão expirou, faça login novamente.",
                            }).then(() => {
                                logout(token);
                                navigate(`/auth/login`);
                            });
                            break;
                        case 400:
                            Swal.fire({
                                icon: "error",
                                title: "Erro nos dados",
                                text: error.response.data.message || "O arquivo ou os dados enviados contêm erros.",
                            });
                            break;
                        default:
                            Swal.fire({
                                icon: "error",
                                title: "Erro no Servidor",
                                text: "Ocorreu um erro interno, tente novamente.",
                            });
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Erro de Conexão",
                        text: "Não foi possível conectar ao servidor.",
                    });
                }
            })
            .finally(() => {
                setCarregando(false);
            });
    };

    return (
        <form className='form-direita' onSubmit={handleSubmit}>
            <div className="upload-container div-type">
                <label htmlFor="file-input" className="upload-label">
                    <FaUpload />
                    <span>Selecionar Arquivo CSV</span>
                </label>
                <input
                    id="file-input"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                {selectedFile && (
                    <div className="file-info">
                        <FaFileCsv color="#217346" />
                        <p>{selectedFile.name}</p>
                    </div>
                )}
            </div>

            <div className="div-type">
                <label htmlFor="observacoes">Observações</label>
                <textarea
                    id="observacoes"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Adicione observações sobre o envio..."
                />
            </div>

            <button type="submit" className="btn-submit-disk" disabled={carregando}>
                {carregando ? "Enviando..." : "Enviar Arquivo e Dados"}
            </button>
        </form>
    );
};

export default Form_add_excel;