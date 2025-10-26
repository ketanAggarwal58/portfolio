# Build
FROM --platform=linux/amd64 node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Run
FROM --platform=linux/amd64 node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
USER node
CMD ["npm", "run", "start"]
