// Imports
import Image from "next/image";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import usersAvatarExampleImg from "../assets/users-avatar-example.png";
import iconCheckImg from "../assets/icon-check.svg";
import api from "../lib/axios";
import { FormEvent, useRef } from "react";
// Imports

// TypeScript
interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

// TypeScript

const Home = (props: HomeProps) => {
  const input = useRef<any>();

  async function createPool(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Transforma ele em conjunto de chave e valor
    const formData = new FormData(event.currentTarget);

    // Transformando em objeto e retirando sua propriedade com o destructuring
    const { title } = Object.fromEntries(formData.entries());

    // Realizando a criação do bolão
    try {
      const response = await api.post("/pools", {
        title,
      });

      const { code } = response.data;

      // Deixando o código do bolão salvo no clipboard do usuário
      await navigator.clipboard.writeText(code);

      // TODO: Criar uma modal para os alerts
      alert(
        "Bolão criado com sucesso, o código foi copiado para a área de transferência."
      );
      input.current.value = "";
    } catch (error) {
      console.log(error);
      alert("Falha ao criar o bolão, tente novamente!");
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW COPA" quality={100} />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" quality={100} />

          {props.userCount > 1 ? (
            <strong className="text-gray-100 text-xl">
              <span className="text-ignite-500">`+${props.userCount}` </span>
              pessoas já estão usando
            </strong>
          ) : (
            <strong className="text-gray-100 text-xl">
              <span className="text-ignite-500">{`${props.userCount}`} </span>
              pessoa já está usando
            </strong>
          )}
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm outline-gray-600 outline-offset-2 text-gray-100"
            type="text"
            name="title"
            ref={input}
            placeholder="Qual o nome do seu bolão"
            required
          />

          <button
            type="submit"
            className="bg-yellow-500 px-6 py-4 rounded uppercase font-bold text-sm hover:bg-yellow-700"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />

            {props.poolCount > 1 ? (
              <div className="flex flex-col">
                <span className="font-bold text-2xl">
                  {`+${props.poolCount}`}
                </span>
                <span>Bolões criados</span>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="font-bold text-2xl">
                  {`${props.poolCount}`}
                </span>
                <span>Bolão criado</span>
              </div>
            )}
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />

            {props.guessCount > 1 ? (
              <div className="flex flex-col">
                <span className="font-bold text-2xl">{`+${props.guessCount}`}</span>
                <span>Palpites enviados</span>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="font-bold text-2xl">{`${props.guessCount}`}</span>
                <span>Palpite enviado</span>
              </div>
            )}
          </div>
        </div>
      </main>
      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação móvel da NLW Copa"
        quality={100}
      />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};