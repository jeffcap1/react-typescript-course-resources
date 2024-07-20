import { Session } from "../store/session-context";

type SessionItemsProps = {
  session: Session;
};

export default function SessionItems({ session }: SessionItemsProps) {
  return <div className="session-item">
    <img src={session.image} alt={session.title} />
    <h4>{session.title}</h4>
    </div>;
}
        {/* <div key={session.id}> */}
        {/*   <h4>{session.title}</h4> */}
        {/*   <time>{session.date}</time> */}
        {/* </div> */}
