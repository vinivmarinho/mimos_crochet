# Fluxo de Login

1. No `LoginForm`, o usuário preenche o formulário com email e senha.

2. O `LoginForm` envia os dados para a API (`/users/login`).

3. O controller de login recebe o email e a senha, verifica se o usuário existe e compara a senha informada com o `password_hash` armazenado no banco.

4. Se as credenciais forem válidas, o backend gera um JWT e envia esse token em um cookie chamado `access_token`. O navegador armazena o cookie e poderá enviá-lo automaticamente em requisições futuras, quando as regras de cookies/CORS permitirem.

5. O backend também retorna os dados públicos necessários do usuário, como `id` e `email`, para que o frontend possa utilizá-los.

6. Se o login for concluído com sucesso, o `LoginForm` encaminha o usuário para a página `/admin`.

7. Antes de permitir o acesso à página `/admin`, o componente `AdminRoute` faz uma requisição para `/users/me`. Essa requisição permite que o backend verifique se o usuário está autenticado e possui permissão de administrador.

8. A rota `/users/me` passa pelo middleware `authenticateToken`, que verifica se o `access_token` foi enviado, valida o JWT e, se ele for válido, disponibiliza os dados decodificados do usuário em `req.user`.

9. Em seguida, o middleware `isAdmin` verifica o `role` presente em `req.user`. Se o usuário não for administrador, o acesso é negado.

10. Se o usuário possuir `role: "admin"`, a requisição chega ao controller `getCurrentUser`, que retorna os dados do usuário autenticado para o frontend.




# Fluxo de cadastro de peças

1. Em `PieceForm.tsx`, usuário preenche o formulário e envia os dados para a função `createPice` em `pieceService.ts`

2. `createPiece` verifica se existe uma imagem e, caso exista, envia o arquivo para a função de upload `uploadImage.ts`

3. `uploadImage.ts` cria um `formData`, adiciona o arquivo a ele e envia esse `formData` para a rota `POST /images/upload` da API 

4. A requisição chega como `multipart/form-data`. O middleware `upload`, criado com o `Multer` processa essa requisição, extrai o arquivo e, usando `memoryStorage()`, mantém seus dados temporariamente na memória do servidor

5. O controller `uploadImage` verifica se o arquivo existe em `req.file` e, caso exista, sobe o arquivo para a núvem utilizando o método `upload_stream()` do SDK do cloudinary. Se o upload for bem sucedido, o Cloudinary retorna os dados da imagem, incluindo sua URL, que é então retornada pela API

6. A função `uploadImage` (frontend) recebe a resposta da API, converte o corpo da resposta para JSON e retorna os dados

7. A função `createPiece` recebe os dados retornados por `uploadImage` e utiliza a URL para criar a peça no banco de dados