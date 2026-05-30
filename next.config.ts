import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // strict mode временно выключен; вернём в Фазе 2 после фикса утечек
  reactStrictMode: false,
};

export default nextConfig;
