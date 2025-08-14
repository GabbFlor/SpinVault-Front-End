import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from "../components/Footer";
import Header from "../components/Header";
import Ver_contato_style from "../styles/ver_contato_style";
import { apiUrl } from '../API';

const ITEMS_PER_PAGE = 10;

const Ver_contato = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        // -> ALTERAÇÃO 1: O parâmetro da função foi ajustado para corresponder à sua API (inicioId=0).
        // A primeira busca começa com o id 0.
        fetchFeedbacks(0, true); 
    }, []);

    // -> ALTERAÇÃO 2: A função agora recebe o ID do último item e um flag para a carga inicial.
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
            // -> ALTERAÇÃO 3: A URL foi atualizada para usar o endpoint e o parâmetro da sua API.
            const url = `${apiUrl}/adm/contato?inicioId=${lastId}`;
            const response = await axios.get(url);

            // -> ALTERAÇÃO 4: Sua API retorna um array diretamente.
            const newFeedbacks = response.data;

            if (newFeedbacks && newFeedbacks.length > 0) {
                 // Adiciona os novos feedbacks à lista existente
                setFeedbacks(prevFeedbacks => [...prevFeedbacks, ...newFeedbacks]);
            }

            // -> ALTERAÇÃO 5: Lógica de paginação baseada no retorno.
            // Se a API retornar menos itens que o esperado, ou um array vazio, não há mais o que carregar.
            // Assumimos que o backend retorna um número fixo de itens. Se não for o caso, esta lógica pode precisar de ajuste.
            // Para este exemplo, vou assumir um limite de 10 itens por página, igual ao ITEMS_PER_PAGE.
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