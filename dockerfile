FROM nginx:alpine

# Copiar os arquivos buildados para o diretório padrão do Nginx
COPY /build /usr/share/nginx/html

# Expor a porta padrão do Nginx
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]