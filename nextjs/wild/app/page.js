import Link from "next/link";

export default async function Home() {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const result = await data.json();

  return (
    <div>
      <ul>
        //map function to iterate over the result
        {result.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <h1>Hello world</h1>
    </div>
  );
}
