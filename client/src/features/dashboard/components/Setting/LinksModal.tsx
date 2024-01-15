import { LinkItem } from "./LinkItem";
import { links } from "../../../../mock";

export interface ILinksModalProps {}

export function LinksModal() {
  return (
    <div className="py-4 px-2">
      <div className="flex items-center flex-col cursor-pointer ">
        {links.slice(0, 3).map((link, key) => {
          return <LinkItem key={key} link={link} />;
        })}
      </div>
    </div>
  );
}
