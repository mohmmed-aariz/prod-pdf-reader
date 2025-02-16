FROM node:20-alpine

WORKDIR /src/app

# Copy package and other necessary files
# COPY package.json package-lock.json turbo.json tsconfig.json ./

# COPY apps ./apps
# COPY packages ./packages

COPY . .

# Install dependencies
RUN npm install

# Set environment variables
ARG POSTGRES_PRISMA_URL
ENV POSTGRES_PRISMA_URL=$POSTGRES_PRISMA_URL

# Generate Prisma Client
RUN npm run db:generate

# Build the app
RUN npm run build

# Start the app
CMD ["npm", "run", "start"]
