import './registerForm.css'; 
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    async function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault();
        

        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem", {
                className: "toast error-toast"
            })
            return;
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_RENDER_API}/users`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                })
            });

            if (!response.ok) {
                console.error(`Não foi possível cadastrar o usuário. ${response.status}.`)
                toast.error("Não foi possível cadastrar o usuário", {
                    className: "toast error-toast"
                }); 
                return;
            };


            console.log(response);
            toast.success("Usuário cadastrado", {
                className:"toast success-toast"
            });
            setTimeout(() => {
                navigate("/login");
            }, 1000)
            
        } catch(error) {
            toast.error("Não foi possível cadastrar o usuário", {
                className: "toast error-toast"
            })
            console.log("Erro ao cadastrar usuário.", error)
        } 
    };
    
    return(
        <>
            <form className="register-form" onSubmit={handleSubmit}>
                <img src="/logo.jpeg" alt="Logo da marca mimos crochet" className="form-logo" />

                <h2>Cadastro de usuário</h2>
                
                <label htmlFor="name">Nome</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Digite seu nome"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

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

                <label htmlFor="confirmPassword">Confirme sua senha</label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Insira sua senha novamente"
                    required
                    minLength={8}
                    maxLength={72}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
                
                <button type="submit">Cadastrar</button>
            </form>
        </>
    )
}










