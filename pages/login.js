import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="p-5 bg-[#18D860] rounded-lg text-black"
            onClick={() => signIn(provider.id, { callbackUrl: "https://accounts.spotify.com/api/token" })}
          >
            Login to Lotify
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;


export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}