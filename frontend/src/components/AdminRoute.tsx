import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type AdminRouteProps = {
    children: React.ReactNode;
}
// Componente de proteção de rota
// Antes de renderizar minha página de "/admin", ele verifica se usuário está autenticado e autorizado
export default function AdminRoute({ children }: AdminRouteProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        async function checkAdmin() {
            try {
                const response =  await fetch(`${import.meta.env.VITE_RENDER_API}/users/me`, 
                    {
                        credentials: "include"
                    }
                );

                if (response.ok) {
                    setIsAuthorized(true);
                }
            } catch(error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        checkAdmin();
    },[])

    if (isLoading) {
        return <p>Verificando acesso...</p>;
    }

    if (!isAuthorized) {
        return <Navigate to="/login" replace />
    }

    return children;
}
