FROM node:12-alpine

RUN mkdir www/
WORKDIR www/
# Add files to directory
ADD . .
# Install app dependencies
RUN yarn
RUN yarn run build

RUN echo $(ls)

ARG GRAPHQL_ENDPOINT
ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT

ENV NODE_ENV=production
ENV GRAPHQL_ENDPOINT=$GRAPHQL_ENDPOINT
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=$NEXT_PUBLIC_GRAPHQL_ENDPOINT

# Bind Port
EXPOSE 3000

# Commands
CMD ["npm", "run", "start"]