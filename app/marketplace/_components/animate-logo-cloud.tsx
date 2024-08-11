import Image from "next/image";

const logos = [
  {
    name: "SOARbound",
    url: "/soarbound.png",
  },
  {
    name: "Isla Camp",
    url: "/islacamp.png",
  },
  {
    name: "Rotary",
    url: "/rotary.png",
  },
  {
    name: "DevCon",
    url: "/devcon.png",
  },
];

const AnimatedLogoCloud = () => {
  return (
    <div className="w-full">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group relative flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos.map((logo, key) => (
                  <Image
                    key={key}
                    src={logo.url}
                    className="h-8 w-fit px-2 brightness-0 dark:invert"
                    alt={`${logo.name}`}
                    width={8}
                    height={8}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogoCloud;
