FROM node:18-alpine

WORKDIR /app

# Copy package files and prisma schema first to leverage layer caching
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies but ignore lifecycle scripts (prepare) which expects source files
RUN npm install --ignore-scripts

# Generate Prisma client now so TypeScript can see generated types during build
RUN npx prisma generate

# Copy the rest of the source
COPY . .

# Build the project
RUN npm run build

EXPOSE 3000

# Start the compiled app
CMD ["npm", "run", "start"]