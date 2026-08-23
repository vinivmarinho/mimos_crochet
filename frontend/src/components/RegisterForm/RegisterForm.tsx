import './registerForm.css'; // Importe o arquivo CSS aqui

export default function RegisterForm() {
    return(
        <>
            <form className="register-form">
                <img src="../public/logo.jpeg" alt="Logo da marca mimos crochet" className="form-logo" />

                <h2>Cadastro de usuário</h2>
                
                <label htmlFor="name">Nome</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Digite seu nome"
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    required
                />

                <label htmlFor="password">Senha</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    required
                />

                <label htmlFor="confirmPassword">Confirme sua senha</label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Insira sua senha novamente"
                    required
                />
                
                <button type="submit">Cadastrar</button>
            </form>
        </>
    )
}