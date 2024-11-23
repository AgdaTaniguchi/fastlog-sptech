# Etapa 1: Build
FROM node:latest AS build

# Definir diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de dependências para o container
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código do projeto para o container
COPY . .

# Construir o aplicativo para produção
RUN npm run build

# Etapa 2: Servir os arquivos estáticos
FROM nginx:alpine

# Copiar os arquivos buildados para o diretório padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta padrão do Nginx
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]