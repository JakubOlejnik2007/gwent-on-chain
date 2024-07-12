import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import React from "react";

export default function GitHubIcon() {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl gap-5 text-center">
      <a
        href="https://github.com/kristoferlund/ic-siwe-react-demo-ts"
        rel="noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon
          className="w-10 h-10 mx-3 text-zinc-500"
          icon={faGithub}
        />
      </a>
    </div>
  );
}
