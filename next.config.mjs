///** @type {import('next').NextConfig} */
//const nextConfig = {
//  output: "export",
//  images: { unoptimized: true },
//};
//
//export default nextConfig;

import { withJuno } from "@junobuild/nextjs-plugin";

export default withJuno({
  nextConfig: { output: "export", images: { unoptimized: true } },
});
