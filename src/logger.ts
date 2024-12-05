class Logger {
    log(message: string) {
      console.log(`[${new Date().toISOString()}] ${message}`);
    }
  }
  
  export { Logger };
  