import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { apiUrl } from '../API';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaFileExcel } from "react-icons/fa";

const Form_add_excel = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [observacoes, setObservacoes] = useState(''); // Novo estado para o campo de observações
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
            if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || fileType === "application/vnd.ms-excel") {
                setSelectedFile(file);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Tipo de arquivo inválido",
                    text: "Por favor, selecione um arquivo Excel (.xlsx ou .xls).",
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
                text: "Você precisa selecionar um arquivo Excel para enviar!",
                showConfirmButton: true,
            });
            return;
        }

        setCarregando(true);

        const formData = new FormData();

        // 1. Adiciona o arquivo com a chave 'arquivo'
        formData.append('arquivo', selectedFile);

        // 2. Adiciona os dados extras como uma string JSON com a chave 'dados'
        const dadosExtras = { observacoes: observacoes };
        const dadosBlob = new Blob([JSON.stringify(dadosExtras)], {
            type: 'application/json'
        });

        formData.append('dados', dadosBlob);

        // Endpoint ajustado para '/migracaoExcel' como no seu exemplo do Postman
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
                setObservacoes(''); // Limpa o campo de observações
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
            {/* Componente de Upload de Arquivo */}
            <div className="upload-container div-type">
                <label htmlFor="file-input" className="upload-label">
                    <FaUpload />
                    <span>Selecionar Arquivo Excel</span>
                </label>
                <input
                    id="file-input"
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                {selectedFile && (
                    <div className="file-info">
                        <FaFileExcel color="#217346" />
                        <p>{selectedFile.name}</p>
                    </div>
                )}
            </div>

            {/* Novo Campo de Texto para Observações */}
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