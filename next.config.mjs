///** @type {import('next').NextConfig} */
//const nextConfig = {
//  output: "export",
//  images: { unoptimized: true },
//};
//
//export default nextConfig;

import { withJuno } from "@junobuild/nextjs-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default withJuno({ nextConfig });
