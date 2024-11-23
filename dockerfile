# Use a imagem base do Nginx
FROM node:latest

# Copie os arquivos estáticos para o diretório padrão do Nginx
COPY . .

RUN npm i
RUN npm run build
RUN npm install -g server

# Exponha a porta 80 para acesso
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["serve", "-s", "build"]