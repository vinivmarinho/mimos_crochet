import "./loginForm.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_RENDER_API}/users/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    }),
                    credentials: "include" // Permite envio e recebimento de cookies na requisição
                }
            );

            if (!response.ok) {
                toast.error("Email ou senha inválidos", {
                    className: "toast error-toast"
                });

                return;
            }

            const data = await response.json();

            console.log(data);

            toast.success("Login realizado com sucesso!", {
                className: "toast success-toast"
            });
            setTimeout(() => {
                navigate("/admin");
            }, 1000)
        } catch (error) {
            toast.error("Não foi possível realizar o login", {
                className: "toast error-toast"
            });

            console.error("Erro ao realizar login:", error);
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <img src="/logo.jpeg" alt="Logo da marca Mimos Crochê" className="form-logo"/>

            <h2>Entrar na sua conta</h2>

            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                placeholder="Digite seu email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="password">Senha</label>
            <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                required
                minLength={8}
                maxLength={72}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit">
                Entrar
            </button>
        </form>
    );
}