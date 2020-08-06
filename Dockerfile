FROM node:12-alpine

RUN mkdir www/
WORKDIR www/
# Add files to directory
ADD . .
# Install app dependencies
RUN yarn
RUN yarn run build

RUN echo $(ls)

ENV NODE_ENV=production

# Bind Port
EXPOSE 3000

# Commands
CMD ["npm", "run", "start"]