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