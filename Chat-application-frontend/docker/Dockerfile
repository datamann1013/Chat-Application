# Stage 1: Build the React app
FROM archlinux:latest AS build

RUN pacman -Syu --noconfirm nodejs npm git

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM archlinux:latest

RUN pacman -Syu --noconfirm nginx && \
    pacman -Scc --noconfirm

# Copy build output to Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Replace default Nginx config (optional, for SPA routing)
COPY nginx.conf nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


