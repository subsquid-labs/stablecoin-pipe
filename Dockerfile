FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY tsconfig.json ./
COPY src ./src
COPY drizzle.config.ts ./
COPY drizzle ./drizzle

# Build the project
RUN pnpm build

# Production stage
FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files and install production dependencies only
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy built files from build stage
COPY --from=base /app/dist ./dist
COPY --from=base /app/drizzle ./drizzle

# Expose port (if needed for metrics server)
EXPOSE 9090

# Set environment variable (can be overridden)
ENV NODE_ENV=production

# Run the application
CMD ["node", "dist/index.js"]

