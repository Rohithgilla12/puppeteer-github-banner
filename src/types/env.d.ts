declare namespace NodeJS {
  interface ProcessEnv {
    DEV_TO_API_KEY: string;
    SUPABASE_ANON_KEY: string;
    SUPABASE_URL: string;
  }
}