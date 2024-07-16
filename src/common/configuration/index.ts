export interface IApp {
  address: string;
  port: number;
}

export interface IDatabase {
  postgres: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
}

export interface IRollbar {
  token: string;
  envorement: string;
}

export interface IHttp {
  timeout: number;
  maxRedirects: number;
}

export interface IConfiguration {
  app: IApp;
  database: IDatabase;
  http: IHttp;
  rollbar: IRollbar;
}

const config = (): IConfiguration => ({
  app: {
    address: process.env.APP_ADDR,
    port: Number.parseInt(process.env.APP_PORT) || 9000,
  },
  database: {
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: Number.parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    },
  },
  http: {
    timeout: Number.parseInt(process.env.HTTP_TIMEOUT) || 5000,
    maxRedirects: Number.parseInt(process.env.HTTP_MAX_REDIRECTS) || 5,
  },
  rollbar: {
    token: process.env.ROLLBAR_TOKEN,
    envorement: process.env.ROLLBAR_ENVIRONMENT,
  },
});
export default config;
