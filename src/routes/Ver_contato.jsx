import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apiUrl } from '../API';
import Ver_contato_style from '../styles/Ver_contato_style';

const ITEMS_PER_PAGE = 10;

const Ver_contato = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        // A primeira busca começa com o id 0.
        fetchFeedbacks(0, true);
    }, []);

    const fetchFeedbacks = async (lastId = 0, isInitialLoad = false) => {
        if (isInitialLoad) {
            setInitialLoading(true);
            Swal.fire({
                title: 'Carregando...',
                text: 'Buscando as mensagens de contato.',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });
        } else {
            setLoadingMore(true);
        }

        try {
            const url = `${apiUrl}/adm/contato?inicioId=${lastId}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const newFeedbacks = response.data;

            if (newFeedbacks && newFeedbacks.length > 0) {
                // Adiciona os novos feedbacks à lista existente
                setFeedbacks(prevFeedbacks => [...prevFeedbacks, ...newFeedbacks]);
            }
            if (!newFeedbacks || newFeedbacks.length < ITEMS_PER_PAGE) {
                setHasMore(false);
            }

            if (isInitialLoad) Swal.close();

        } catch (err) {
            console.error("Erro ao buscar contatos:", err);
            Swal.fire({
                icon: 'error',
                title: 'Oops... Ocorreu um erro!',
                text: 'Não foi possível buscar as mensagens de contato.',
                confirmButtonText: 'Entendido'
            });
            // Se der erro, assumimos que não há mais o que carregar para evitar loops
            setHasMore(false);
        } finally {
            if (isInitialLoad) setInitialLoading(false);
            setLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        // A lógica para carregar mais agora pega o ID do último item da lista.
        if (feedbacks.length > 0) {
            const lastItem = feedbacks[feedbacks.length - 1];
            fetchFeedbacks(lastItem.id);
        }
    };

    return (
        <div className="Pag-ver-contato">
            <Ver_contato_style />
            <Header />

            <main>
                {feedbacks.map(contato => (
                    <section key={contato.id} className="container-contato">
                        <h2 className="user-name">{contato.email}</h2>
                        <div className="linha-contato"></div>
                        <h3 className="titulo-motivo">{contato.motivoContato}</h3>
                        <div className="caixa-mensagem">
                            <p>{contato.mensagem}</p>
                        </div>
                    </section>
                ))}

                {initialLoading === false && feedbacks.length === 0 && (
                    <section className="container-contato">
                        <p>Nenhuma mensagem de contato encontrada.</p>
                    </section>
                )}

                <div className="container-carregar-mais">
                    {hasMore && !initialLoading && (
                        <button onClick={handleLoadMore} disabled={loadingMore}>
                            {loadingMore ? 'Carregando...' : 'Carregar Mais'}
                        </button>
                    )}
                    {!hasMore && !initialLoading && feedbacks.length > 0 && (
                        <p>Você chegou ao fim.</p>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Ver_contato;