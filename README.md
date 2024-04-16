# Cadastro de carro

**PF**
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsável pelo cadastro deve ser um usuário administrativo. 

# Listagem de carros

**PF**
Deve ser possível listar todos os carros disponíveis. 
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
O usuário não precisa está logado no sistema. 

# Cadastro de Especificação no carro

**PF**
Deve ser possível cadastrar uma especificação para um carro

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrativo. 

# Cadastro da imagem do carro

**PF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload de arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro. 
O usuário responsável pelo cadastro deve ser um usuário administrativo. 

# Aluguel de carro

**PF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração minima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário. 
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro. 
O usuário deve está logado na aplicação.
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução de carro

**RF** 
Deve ser possível realizar a devolução de um carro.

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado
multa proporcional aos dias de atraso.
O usuário deve está logado na aplicação.
Caso haja multa, deverá ser somado ao total do aluguel. 

# Listagem de Alugueis para usuários

**RF**
Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**
O Usuário deve está logado na aplicação. 


# Recuperar senha

**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail.
- O usuário deve receber um e-mail com o passo a passo para a senha.
- O usuário deve conseguir inserir uma nova senha. 

**RN**
- O usuário precisa informar uma nova senha.
- o link enviado para a recuperação deve expirar em 3 horas.