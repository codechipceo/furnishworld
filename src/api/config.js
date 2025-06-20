const activeEnv = import.meta.VITE_NODE_ENV || "prod";
const dev_base_url = import.meta.env.VITE_DEV;
const prod_base_url = import.meta.env.VITE_PROD;
const environment = {
  dev: {
    baseUrl: dev_base_url,
  },
  prod: {
    baseUrl: prod_base_url,
  },
};

export const active_base_url = environment[activeEnv].baseUrl;
