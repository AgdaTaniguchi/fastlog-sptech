# Use a imagem base do Nginx
FROM node:latest

# Copie os arquivos estáticos para o diretório padrão do Nginx
COPY build/ /usr/share/nginx/html

# Exponha a porta 80 para acesso
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]