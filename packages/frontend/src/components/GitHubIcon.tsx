import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import React from "react";

type SingleIconProps = {
  githubUrl: string;
  githubName: string;
};

const SingleIcon = ({ githubUrl, githubName }: SingleIconProps) => {
  return (
    <a
      href={githubUrl}
      rel="noreferrer"
      target="_blank"
      className="flex items-center flex-col gap-3"
    >
      <FontAwesomeIcon
        className="w-10 h-10 mx-3 text-zinc-500 hover:text-zinc-100"
        icon={faGithub}
      />
      <p className="h-fit">{githubName}</p>
    </a>
  );
}

const GitHubIcon = () => {
  return (
    <>
      <p className="font-bold text-l md:text-2xl">GitHub autorów i kod projektu</p>
      <div className="flex justify-evenly w-full max-w-2xl gap-5 text-center">
        <SingleIcon githubUrl="https://github.com/JakubOlejnik2007" githubName="Jakub Olejnik" />
        <SingleIcon githubUrl="https://github.com/JakubOlejnik2007/gwent-on-chain" githubName="Repozytorium projektu" />
        <SingleIcon githubUrl="https://github.com/MeramQ" githubName="MeramQ" />
      </div>
    </>
  );
}

export default GitHubIcon;
