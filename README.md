# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o e-mail.
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha.

**RNF**

- Utilizar MailTrap para testar envios em ambiente de dev.
- Utilizar Amazon SES para envios em produção.
- O envio de e-mails deve acontecer em segundo plano (background job).

**RN**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil


**RF**

- O usuário deve poder atualizar seu nome, e-mail e senha;

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado.
- Para atualizar sua senha, o usuário deve atualizar sua senha antiga.
- Para atualizar sua senha, o usuário precisa confirmar a nova senha.


# Painel do prestador



# Agendamento de serviço

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados.
- O usuário deve poder listar todos os dias de um mês com pelo menos um horário disponível de um prestador.
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador.
- O usuário deve poder realizar um novo agendamento com um prestador.

**RNF**

- A listagem de prestadores deve ser armazenada em cache.

**RN**

- Cada agendamento deve durar 1h exatamente.
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h).
- O usuário não pode agendar em um horário já ocupado.
- O usuário não pode agendar em um horário que já passou.
- O usuário não pode agendar serviço consigo mesmo.
