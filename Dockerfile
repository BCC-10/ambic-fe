# Stage 1: Build react app
FROM node:22-alpine AS builder

WORKDIR /app

# install dependencies
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# copy source code
COPY . .

# build production files
RUN pnpm build

# Stage 2: Serve dengan nginx
FROM nginx:alpine

# hapus default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# copy nginx config custom
COPY nginx.conf /etc/nginx/conf.d

# copy hasil build react
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
