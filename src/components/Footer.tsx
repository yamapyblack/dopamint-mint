import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <a
            href="https://twitter.com/dopamint"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors"
          >
            <Image
              src="/x-icon.png"
              alt="X (Twitter) Icon"
              width={24}
              height={24}
            />
          </a>
        </div>
        <div className="text-gray-400 text-sm text-center">
          © 2024 Dopamint.fun. All rights reserved.
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <Image
            src="/dopamint-logo.png"
            alt="Dopamint.fun Logo"
            width={240}
            height={100}
          />
        </div>
      </div>
    </footer>
  );
}
