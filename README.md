## Tuckman - Frontend

The frontend for the tuckman analysis tool of karmakurier. This is an Angular project, so make sure you have the sufficient tooling (most importantly Node.JS) installed on your local machine.

### Development

- First, install dependencies so the project can be started locally.

```bash
npm install
```

- Next, run backend locally (for now, later we might add the url of the swagger here). This is needed so we can retrieve the Swagger file. The swagger file is then used to generate the api services in typescript for us. to generate swagger files, then run this:

```bash
npm run openapi-generate-all
```

- Finally, run development server. After it compiled and started you will be able to see the application at http://localhost:4200

```bash
ng serve
```
