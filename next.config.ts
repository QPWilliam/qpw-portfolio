import type { NextConfig } from 'next';

const config: NextConfig = {
  async redirects() {
    return [{ source: '/', destination: '/es', permanent: false }];
  },
};
export default config;
