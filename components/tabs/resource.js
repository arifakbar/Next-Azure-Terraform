export default function ResourceTabs({ resourcesArray }) {
  return (
    <div>
      {resourcesArray.map((r, i) => (
        <div key={i}>
          <ul>{r.type}</ul>
          {r.names.map((n, j) => (
            <li key={j}>{n}</li>
          ))}
        </div>
      ))}
    </div>
  );
}
