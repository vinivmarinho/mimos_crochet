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

---


# Fluxo de cadastro de peças

1. Em [pieceForm](frontend/src/components/PieceForm/PieceForm.tsx), usuário preenche o formulário e envia os dados armazenados em um `FormData` para a função `createPiece` em [pieceService.ts](frontend/src/services/pieceService.ts)

2. `createPiece` verifica se existe uma imagem e, caso exista, envia o arquivo para a função de upload em [uploadImage.ts](frontend/src/services/uploadImage.ts)

3. `uploadImage.ts` cria um `formData`, adiciona o arquivo a ele e envia esse `formData` para a rota `POST /images/upload` ([imageController.ts](backend/src/controllers/image.controller.ts)) da API 

4. A requisição chega como `multipart/form-data`. O middleware `upload`, criado com o `Multer` processa essa requisição, extrai o arquivo e, usando `memoryStorage()`, mantém seus dados temporariamente na memória do servidor

5. O controller `uploadImage` verifica se o arquivo existe em `req.file` e, caso exista, sobe o arquivo para a núvem utilizando o método `upload_stream()` do SDK do cloudinary. Se o upload for bem sucedido, o Cloudinary retorna a URL da imagem, que é recebida pela API e posteriormente retornada ao frontend

6. A função `uploadImage` (frontend) recebe a resposta da API, converte o corpo da resposta para JSON e retorna a URL da imagem hospedada no `Cloudinary`

7. A função `createPiece` ([pieceService.ts](frontend/src/services/pieceService.ts)) recebe a URL da imagem retornada por `uploadImage` e, em seguida, envia os dados da peça para a rota `POST /pieces` ([pieceController](backend/src/controllers/piece.controller.ts)). Após o cadastro `onSuccess` executa `loadPieces`, que atualiza o estado das peças no componente `Admin`, fazendo com que ele seja re-renderizado.

8. O controller `createPiece` envia os dados recebidos para o banco de dados por meio do `pool` de conexões

# Fluxo de sugestão da searchBar

1. Quando o usuário digita no input da `searchBar`, o onChange atualiza o estado searchedInput, define showSuggestions como true e redefine clickedPiece para null.
2. Quando o componente é renderizado novamente (através do `onChange`), a condição de exibição das sugestões é avaliada. Se as sugestões estiverem habilitadas, o map percorre o array correspondente e renderiza cada peça em uma div.

3. Quando o usuário clica em uma sugestão, o `onClick` atualiza `clickedPiece` com o objeto da peça selecionada, define `searchedInput` com o nome da peça e altera `showSuggestions` para `false`, ocultando as sugestões.

# Fluxo de exclusão de peça
1. No componente [Admin.tsx](frontend/src/pages/Admin/Admin.tsx), o usuário aperta no botão de excluir de uma peça específica. A peça selecionada é armazenada no estado `pieceToDelete`

2. Quando o estado `pieceToDelete` possui um valor diferente de `null`, o modal de confirmação de exclusão é renderizado condicionalmente.

3. Ao apertar o botão de confirmação de exclusão no modal, o `onClick` executa a função `handleDeletePiece` e passa a peça que está no estado `pieceToDelete`.

4. `handleDelelePiece` chama a função `deletePiece` localizada em ([pieceService.ts](frontend/src/services/pieceService.ts)) passando somente o id da peça no estado `pieceToDelete`. Em seguida, aguarda a resposta da requisição.

5. A função `deletePiece` envia uma requisição HTTP do tipo `DELETE` para a rota `/pieces/:id`, utilizando o id da peça como parâmetro da URL, e aguarda a resposta do backend

6. A rota encaminha a requisição para o controller `deletePiece`, localizado em ([piece.controller.ts](backend/src/controllers/piece.controller.ts)). O controller extrai o ID da peça de `req.params` e executa uma consulta SQL por meio do pool para excluir do banco de dados o registro correspondente ao ID recebido. Após a execução bem sucedida, o controller retorna uma resposta com o status 200

7. A resposta do backend volta para a função `deletePiece`, em `pieceService.ts` e depois para `handleDeletePiece`. Após a exclusão bem sucedida, `handleDeletePiece` aguarda a execução de `loadPieces`, que busca novamente as peças cadastradas no banco e atualiza a listagem. Em seguida, o estado `pieceToDelete` é definido como `null`, fechando o modal, e um toast de sucesso é exibido.