# MONIX
 
## Autores:
### Squad - 01:

- Gabriel Vinicius
- Giovanna Cunha
- Iale Almeida
- Julia Lira
- Lorenzo Leão
- Luís Manoel
- Nicholas Bergqvist
- Rafael Figueirôa

### Squad - 04:

- Andrey Kaiky Reis Ferreira
- Carlos Guilherme
- Davi Marcelo
- Devid Silva
- Edson Silva
- Maria Clara

## Como rodar localmente
1. Abra o git bash no diretório desejado
2. Faça o clone do repositório: `git clone https://github.com/pedromotta462/Residencia_cinq-monix.git`
3. Agora navegue até o repositório: `cd Residencia_cinq-monix/`
4. Troque para nossa branch através do comando: `git checkout squad-01`
5. Instale as depedências usando o seguinte: `npm install`
6. Crie um arquivo .env na root do diretório e atribua valores às variáveis
7. Rode o projeto: `npm start`


## Como se cadastrar
1. Digite no postman (ou qualquer outro software que teste endpoints): `http://localhost:porta_que_escolheu/signup`
2. No body da requisição passe email e password:
```json
{
  "email": "johndoe@gmail.com",
  "password": "password_of_your_choice"
}
```
3. Vá até o email que mandou na requisição e clique em "Confirm your mail"


## Como logar e usar as demais rotas
1. Digite no postman (ou qualquer outro software que teste endpoints): `http://localhost:porta_que_escolheu/login`
2. No body da requisição passe email e password que usou para fazer o cadastro
```json
{
  "email": "johndoe@gmail.com",
  "password": "password_of_your_choice"
}
```
3. Será retornado o objeto session, copie o valor de `access_token`
4. Nas demais rotas que precisam de autorização, opte por `Bearer Token` e passe o valor obtido do `access token`