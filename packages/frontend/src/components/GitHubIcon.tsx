import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import React from "react";

const GitHubIcon = () => {
  return (
    <div className="flex justify-center w-full max-w-2xl gap-5 text-center">
      <a
        href="https://github.com/JakubOlejnik2007"
        rel="noreferrer"
        target="_blank"
        className="flex flex-col gap-3"
      >
        <FontAwesomeIcon
          className="w-10 h-10 mx-3 text-zinc-500"
          icon={faGithub}
        />
        <p className="h-fit">Jakub Olejnik</p>
      </a>
      <a
        href="https://github.com/MeramQ"
        rel="noreferrer"
        target="_blank"
        className="flex flex-col gap-3"
      >
        <FontAwesomeIcon
          className="w-10 h-10 mx-3 text-zinc-500"
          icon={faGithub}
        />
        <p className="h-fit">MeramQ</p>
      </a>
    </div>
  );
}

export default GitHubIcon;
