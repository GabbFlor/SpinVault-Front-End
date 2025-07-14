import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './routes/Home.jsx'
import Geral from './styles/Geral.jsx'
import Cadastrar_discos from './routes/Cadastrar_discos.jsx'
import Informacoes_gerais from './routes/Informacoes_gerais.jsx'
import Registro from './routes/Registro.jsx'
import Login from './routes/Login.jsx'
import Perfil from './routes/Perfil.jsx'

// .css que armazena o import das fontes do site
import '../src/styles/fonts.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Editar_perfil from './routes/Editar_perfil.jsx'
import Error_page from './routes/ErrorPage.jsx'
import Relacao_discos from './routes/Relacao-discos.jsx'
import Relacao_especifica from './routes/Relacao_especifica.jsx'
import Relacao_busca_inteligente from './routes/Relacao_busca_inteligente.jsx'
import Editar_disco from './routes/Editar_disco.jsx'
import Landing_page from './routes/Landing_page.jsx'
import Payment_confirm from './routes/Payment-confim.jsx'
import { AuthProvider } from './AuthContext.jsx'
import ProtectedRoutes from './ProtectedRoutes.jsx'
import Planos from './routes/Planos.jsx'
import FormMudarSenha from './routes/FormMudarSenha.jsx'
import Infos_plano from './routes/Infos_plano.jsx'
import Contato from './routes/Contato.jsx'


const routes = createBrowserRouter([
  {
    path: "/",

    element: <App />,

    errorElement: <Error_page />,

    children: [
      // rotas publicas (podem ser acessadas por qualquer um)
      {
        path: "/",
        element: <Landing_page />
      },
      {
        path: "/auth/registro",
        element: <Registro />
      },
      {
        path: "/auth/login",
        element: <Login />
      },
      {
        path: "/PaymentConfirm",
        element: <Payment_confirm />
      },
      {
        path: "/redefinir-senha",
        element: <FormMudarSenha />
      },

      // rotas apenas para users autenticados (APLICAR LÓGICA PARA MINHA API)
      {
        path: "/home",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        )
      },
      {
        path: "/contato",
        element: (
          <ProtectedRoutes>
            <Contato/>
          </ProtectedRoutes>
        )
      },
      {
        path: "/cadastrar-discos",
        element: (
          <ProtectedRoutes>
            <Cadastrar_discos />
          </ProtectedRoutes>
        )
      },
      {
        path: "/informacoes-gerais",
        element: (
          <ProtectedRoutes>
            <Informacoes_gerais />
          </ProtectedRoutes>
        )
      },
      {
        path: "/perfil",
        element: (
          <ProtectedRoutes>
            <Perfil />
          </ProtectedRoutes>
        )
      },
      {
        path: "/perfil/editar",
        element: (
          <ProtectedRoutes>
            <Editar_perfil />
          </ProtectedRoutes>
        )
      },
      {
        path: "/perfil/plano",
        element: (
          <ProtectedRoutes>
            <Infos_plano />
          </ProtectedRoutes>
        )
      },
      {
        path: "/relacao/:argumento",
        element: (
          <ProtectedRoutes>
            <Relacao_discos />
          </ProtectedRoutes>
        )
      },
      {
        path: "/relacao-especifica/:argumento",
        element: (
          <ProtectedRoutes>
            <Relacao_especifica />
          </ProtectedRoutes>
        )
      },
      {
        path: "/busca-inteligente",
        element: (
          <ProtectedRoutes>
            <Relacao_busca_inteligente />
          </ProtectedRoutes>
        )
      },
      {
        path: "/editar-disco/:id",
        element: (
          <ProtectedRoutes>
            <Editar_disco />
          </ProtectedRoutes>
        )
      },
      {
        path: "/planos",
        element: (
          <ProtectedRoutes>
            <Planos />
          </ProtectedRoutes>
        )
      },
    ]
  }
])

// cria o react query
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Geral />
        <RouterProvider router={routes} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
