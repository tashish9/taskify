import Link from "next/link";
import { Team } from "../../backend/db/team";

type Props = {
  team: Team;
};

const TeamCard = ({ team }: Props) => {
  return (
    <Link
      className="h-64 w-72 rounded-sm border shadow-md"
      href={`/teams/${team._id}`}
    >
      <h1 className="w-full truncate bg-gray-700 px-3 py-5 text-2xl text-white ">
        {team.title}
      </h1>
      <div className="h-full p-2">
        <p className="min-h-28 line-clamp-5">{team.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-md font-medium text-bluishTeal">
            <span className="text-xl">{team.teamMembers.length}</span> members
          </div>
          <div className="text-md font-medium text-bluishTeal">
            <span className="text-xl">{team.tasks?.length || 0}</span> tasks
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
